import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  PLATFORM_ID,
  inject,
  signal,
} from '@angular/core';

const transitionDurationMs = 420;
const transitionCleanupBufferMs = 80;

export type TextTransitionPlanItem =
  | {
    kind: 'move';
    value: string;
    sourceIndex: number;
    targetIndex: number;
  }
  | {
    kind: 'exit';
    value: string;
    sourceIndex: number;
    targetIndex: undefined;
  }
  | {
    kind: 'enter';
    value: string;
    sourceIndex: undefined;
    targetIndex: number;
  };

interface CharacterPosition {
  x: number;
  y: number;
}

interface RenderedCharacter {
  key: string;
  value: string;
  x: number;
  y: number;
  opacity: number;
}

export function createCharacterTransitionPlan(
  sourceText: string,
  targetText: string,
): TextTransitionPlanItem[] {
  const sourceCharacters = Array.from(sourceText);
  const targetCharacters = Array.from(targetText);
  const targetIndicesByCharacter = new Map<string, number[]>();

  targetCharacters.forEach((value, targetIndex) => {
    const indices = targetIndicesByCharacter.get(value) ?? [];
    indices.push(targetIndex);
    targetIndicesByCharacter.set(value, indices);
  });

  const matchedTargetIndices = new Set<number>();
  const plan: TextTransitionPlanItem[] = [];

  sourceCharacters.forEach((value, sourceIndex) => {
    const targetIndices = targetIndicesByCharacter.get(value);
    const targetIndex = targetIndices?.shift();

    if (targetIndex === undefined) {
      plan.push({ kind: 'exit', value, sourceIndex, targetIndex: undefined });
      return;
    }

    matchedTargetIndices.add(targetIndex);
    plan.push({ kind: 'move', value, sourceIndex, targetIndex });
  });

  targetCharacters.forEach((value, targetIndex) => {
    if (!matchedTargetIndices.has(targetIndex)) {
      plan.push({ kind: 'enter', value, sourceIndex: undefined, targetIndex });
    }
  });

  return plan;
}

@Component({
  selector: 'app-text-with-transition',
  templateUrl: './text-with-transition.html',
  styleUrl: './text-with-transition.css',
})
export class TextWithTransition implements OnChanges, AfterViewInit, OnDestroy {
  @Input() string1 = '';
  @Input() string2 = '';
  @Input() showString2 = false;

  protected readonly visibleText = signal('');
  protected readonly renderedCharacters = signal<RenderedCharacter[]>([]);
  protected readonly isTransitioning = signal(false);
  protected readonly hostWidth = signal<number | null>(null);
  protected readonly sourceCharacters = signal<string[]>([]);
  protected readonly targetCharacters = signal<string[]>([]);

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  private currentText = '';
  private viewInitialized = false;
  private transitionId = 0;
  private measurementFrameId: number | undefined;
  private animationFrameId: number | undefined;
  private cleanupTimeoutId: number | undefined;
  private destroyed = false;

  ngOnChanges(): void {
    const nextText = this.showString2 ? this.string2 : this.string1;

    const prefersReducedMotion =
      !this.isBrowser || typeof window.matchMedia !== 'function'
        ? false
        : window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Don't attempt to animate if true
    if (!this.viewInitialized || !this.isBrowser || prefersReducedMotion) {
      this.currentText = nextText;
      this.endTransitionAndSetStableText(nextText);
      return;
    }

    if (nextText === this.currentText) {
      if (!this.isTransitioning()) {
        this.endTransitionAndSetStableText(nextText);
      }
      return;
    }

    this.startTransition(nextText);
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.cancelScheduledWork();
  }

  private startTransition(nextText: string): void {
    this.cancelScheduledWork();

    const sourceText = this.currentText;
    const targetText = nextText;
    const transitionId = ++this.transitionId;

    this.currentText = targetText;
    this.isTransitioning.set(false);
    this.renderedCharacters.set([]);
    this.hostWidth.set(null);
    this.visibleText.set(sourceText);
    this.sourceCharacters.set(Array.from(sourceText));
    this.targetCharacters.set(Array.from(targetText));

    const measurementFrameId = this.requestFrame(() => {
      if (this.shouldSkipFrame(transitionId)) {
        return;
      }

      const sourcePositions = this.measureCharacterPositions('source');
      const targetPositions = this.measureCharacterPositions('target');
      const sourceWidth = this.measureTextWidth('source');
      const targetWidth = this.measureTextWidth('target');
      const frames = this.createInitialAndFinalSnapshotsToTransitionBetween(
        sourceText,
        targetText,
        sourcePositions,
        targetPositions,
        transitionId,
      );

      this.measurementFrameId = undefined;
      this.hostWidth.set(sourceWidth);
      this.renderedCharacters.set(frames.initial);
      this.isTransitioning.set(true);
      this.detectChanges();

      const animationFrameId = this.requestFrame(() => {
        if (this.shouldSkipFrame(transitionId)) {
          return;
        }

        this.animationFrameId = undefined;
        this.visibleText.set(targetText);
        this.hostWidth.set(targetWidth);
        this.renderedCharacters.set(frames.final);
        this.detectChanges();

        this.cleanupTimeoutId = window.setTimeout(() => {
          if (this.shouldSkipFrame(transitionId)) {
            return;
          }

          this.cleanupTimeoutId = undefined;
          this.endTransitionAndSetStableText(targetText);
          this.detectChanges();
        }, transitionDurationMs + transitionCleanupBufferMs);
      });

      if (animationFrameId === undefined) {
        this.endTransitionAndSetStableText(targetText);
        this.detectChanges();
        return;
      }

      this.animationFrameId = animationFrameId;
    });

    if (measurementFrameId === undefined) {
      this.endTransitionAndSetStableText(targetText);
      return;
    }

    this.measurementFrameId = measurementFrameId;
  }

  private createInitialAndFinalSnapshotsToTransitionBetween(
    sourceText: string,
    targetText: string,
    sourcePositions: CharacterPosition[],
    targetPositions: CharacterPosition[],
    transitionId: number,
  ): { initial: RenderedCharacter[]; final: RenderedCharacter[] } {
    const plan = createCharacterTransitionPlan(sourceText, targetText);
    const initial: RenderedCharacter[] = [];
    const final: RenderedCharacter[] = [];

    plan.forEach((item) => {
      const sourcePosition =
        item.sourceIndex === undefined ? undefined : sourcePositions[item.sourceIndex];
      const targetPosition =
        item.targetIndex === undefined ? undefined : targetPositions[item.targetIndex];
      const startPosition = item.kind === 'enter' ? targetPosition : sourcePosition;
      const endPosition = item.kind === 'exit' ? sourcePosition : targetPosition;
      const key = [
        transitionId,
        item.kind,
        item.value,
        item.sourceIndex ?? 'new',
        item.targetIndex ?? 'old',
      ].join('-');

      initial.push({
        key,
        value: item.value,
        x: startPosition?.x ?? 0,
        y: startPosition?.y ?? 0,
        opacity: item.kind === 'enter' ? 0 : 1,
      });

      final.push({
        key,
        value: item.value,
        x: endPosition?.x ?? 0,
        y: endPosition?.y ?? 0,
        opacity: item.kind === 'exit' ? 0 : 1,
      });
    });

    return { initial, final };
  }

  private endTransitionAndSetStableText(text: string): void {
    this.transitionId++;
    this.cancelScheduledWork();
    this.visibleText.set(text);
    this.sourceCharacters.set(Array.from(text));
    this.targetCharacters.set(Array.from(text));
    this.renderedCharacters.set([]);
    this.isTransitioning.set(false);
    this.hostWidth.set(null);
  }

  private measureCharacterPositions(kind: 'source' | 'target'): CharacterPosition[] {
    const hostRect = this.elementRef.nativeElement.getBoundingClientRect();
    const characterElements = this.elementRef.nativeElement.querySelectorAll<HTMLElement>(
      `[data-text-transition-${kind}-index]`,
    );

    return Array.from(characterElements).map((element) => {
      const rect = element.getBoundingClientRect();

      return {
        x: rect.left - hostRect.left,
        y: rect.top - hostRect.top,
      };
    });
  }

  private measureTextWidth(kind: 'source' | 'target'): number {
    const element = this.elementRef.nativeElement.querySelector<HTMLElement>(
      `[data-text-transition-${kind}]`,
    );

    return element?.getBoundingClientRect().width ?? 0;
  }

  private requestFrame(callback: () => void): number | undefined {
    if (!this.isBrowser) {
      return undefined;
    }

    if (typeof window.requestAnimationFrame === 'function') {
      return window.requestAnimationFrame(callback);
    }

    return window.setTimeout(callback, 16);
  }

  private cancelScheduledWork(): void {
    if (!this.isBrowser) {
      return;
    }

    if (this.measurementFrameId !== undefined) {
      window.cancelAnimationFrame?.(this.measurementFrameId);
      window.clearTimeout(this.measurementFrameId);
      this.measurementFrameId = undefined;
    }

    if (this.animationFrameId !== undefined) {
      window.cancelAnimationFrame?.(this.animationFrameId);
      window.clearTimeout(this.animationFrameId);
      this.animationFrameId = undefined;
    }

    if (this.cleanupTimeoutId !== undefined) {
      window.clearTimeout(this.cleanupTimeoutId);
      this.cleanupTimeoutId = undefined;
    }
  }

  private shouldSkipFrame(transitionId: number): boolean {
    return this.destroyed || transitionId !== this.transitionId;
  }

  private detectChanges(): void {
    if (!this.destroyed) {
      this.changeDetectorRef.detectChanges();
    }
  }
}
