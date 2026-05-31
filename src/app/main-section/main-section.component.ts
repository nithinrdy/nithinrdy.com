import { isPlatformBrowser } from '@angular/common';
import { Component, DestroyRef, Input, PLATFORM_ID, inject, signal } from '@angular/core';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css'],
})
export class MainSectionComponent {
  readonly carouselItems = ['Nithin', 'a developer', 'a writer', 'Nithin'];
  private readonly platformId = inject(PLATFORM_ID);
  private readonly destroyRef = inject(DestroyRef);

  readonly activeWordIndex = signal(0);
  readonly isResetting = signal(false);
  private startDelayId: number | undefined;
  private intervalId: number | undefined;
  private resetTimeoutId: number | undefined;
  private resetFrameId: number | undefined;
  private hasStartedCarousel = false;

  @Input()
  set startCarousel(shouldStart: boolean) {
    if (shouldStart) {
      this.startCarouselTimer();
    }
  }

  private startCarouselTimer() {
    if (this.hasStartedCarousel || !isPlatformBrowser(this.platformId)) {
      return;
    }

    this.hasStartedCarousel = true;
    this.startDelayId = window.setTimeout(() => {
      this.advanceCarousel();
      this.intervalId = window.setInterval(() => this.advanceCarousel(), 2000);
    }, 2000);
  }

  private advanceCarousel() {
    const nextIndex = this.activeWordIndex() + 1;

    this.activeWordIndex.set(nextIndex);

    if (nextIndex === this.carouselItems.length - 1) {
      this.resetTimeoutId = window.setTimeout(() => {
        this.isResetting.set(true);
        this.activeWordIndex.set(0);

        this.resetFrameId = window.requestAnimationFrame(() => {
          this.isResetting.set(false);
        });
      }, 1000);
    }
  }

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.startDelayId !== undefined) {
        window.clearTimeout(this.startDelayId);
      }

      if (this.intervalId !== undefined) {
        window.clearInterval(this.intervalId);
      }

      if (this.resetTimeoutId !== undefined) {
        window.clearTimeout(this.resetTimeoutId);
      }

      if (this.resetFrameId !== undefined) {
        window.cancelAnimationFrame(this.resetFrameId);
      }
    });
  }
}
