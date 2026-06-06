import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  Input,
  PLATFORM_ID,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css'],
})
export class MainSectionComponent {
  readonly carouselItems = [
    { word: 'Nithin', section: 'about' },
    { word: 'a developer', section: 'developing' },
    { word: 'a writer', section: 'writing' },
    { word: 'Nithin', section: 'about' },
  ];
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly activeWordIndex = signal(0);
  readonly isResetting = signal(false);
  private startDelayId: number | undefined;
  private intervalId: number | undefined;
  private resetTimeoutId: number | undefined;
  private resetFrameId: number | undefined;
  private _navbarShown = false;

  @Input()
  set navbarShown(isMoved: boolean) {
    if (this._navbarShown === isMoved) return;

    this._navbarShown = isMoved;

    if (isMoved) {
      this.pauseCarouselTimer();
    } else {
      this.resumeCarouselTimer();
    }
  }

  get navbarShown() {
    return this._navbarShown;
  }

  private resumeCarouselTimer() {
    if (
      this.navbarShown ||
      !isPlatformBrowser(this.platformId) ||
      this.startDelayId !== undefined ||
      this.intervalId !== undefined
    ) {
      return;
    }

    if (this.activeWordIndex() === this.carouselItems.length - 1) {
      this.isResetting.set(true);
      this.activeWordIndex.set(0);
      this.resetFrameId = window.requestAnimationFrame(() => {
        this.isResetting.set(false);
        this.resetFrameId = undefined;
      });
    }

    this.startDelayId = window.setTimeout(() => {
      this.startDelayId = undefined;

      if (this.navbarShown) return;

      this.advanceCarousel();
      this.intervalId = window.setInterval(() => this.advanceCarousel(), 1500);
    }, 1500);
  }

  private pauseCarouselTimer() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (this.startDelayId !== undefined) {
      window.clearTimeout(this.startDelayId);
      this.startDelayId = undefined;
    }

    if (this.intervalId !== undefined) {
      window.clearInterval(this.intervalId);
      this.intervalId = undefined;
    }

    if (this.resetTimeoutId !== undefined) {
      window.clearTimeout(this.resetTimeoutId);
      this.resetTimeoutId = undefined;
    }
  }

  private advanceCarousel() {
    const nextIndex = this.activeWordIndex() + 1;

    this.activeWordIndex.set(nextIndex);

    if (nextIndex === this.carouselItems.length - 1) {
      this.resetTimeoutId = window.setTimeout(() => {
        this.resetTimeoutId = undefined;
        this.isResetting.set(true);
        this.activeWordIndex.set(0);

        this.resetFrameId = window.requestAnimationFrame(() => {
          this.isResetting.set(false);
          this.resetFrameId = undefined;
        });
      }, 600);
    }
  }

  constructor() {
    afterNextRender(() => {
      if (this.navbarShown) {
        this.pauseCarouselTimer();
      } else {
        this.resumeCarouselTimer();
      }
    });

    this.destroyRef.onDestroy(() => {
      this.pauseCarouselTimer();

      if (this.resetFrameId !== undefined && isPlatformBrowser(this.platformId)) {
        window.cancelAnimationFrame(this.resetFrameId);
        this.resetFrameId = undefined;
      }
    });
  }
}
