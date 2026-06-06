import {
  ApplicationRef,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  isDevMode,
  signal,
} from '@angular/core';
import { EmailBarComponent } from './email-bar/email-bar.component';
import { LinksBarComponent } from './links-bar/links-bar.component';
import { LoaderComponent } from './loader/loader.component';
import { MainSectionComponent } from './main-section/main-section.component';
import { AboutSectionComponent } from './about-section/about-section.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WorkSectionComponent } from './work-section/work-section.component';

export const loaderTimeout = 6000;

@Component({
  selector: 'app-root',
  imports: [
    AboutSectionComponent,
    EmailBarComponent,
    LinksBarComponent,
    LoaderComponent,
    MainSectionComponent,
    NavbarComponent,
    WorkSectionComponent,
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = 'nithinrdy';
  showLoader = signal(true);
  isNavbarShown = signal(false);

  private readonly applicationRef = inject(ApplicationRef);
  private readonly destroyRef = inject(DestroyRef);
  private isNavbarTransitionRunning = false;

  constructor() {
    afterNextRender(() => {
      const updateNavbarVisibility = () => {
        if (this.showLoader()) return;
        this.setNavbarVisibility(window.scrollY > 0);
      };

      setTimeout(
        () => {
          this.showLoader.set(false);
          updateNavbarVisibility();
        },
        isDevMode() ? 0 : loaderTimeout,
      );

      updateNavbarVisibility();
      window.addEventListener('scroll', updateNavbarVisibility, { passive: true });

      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', updateNavbarVisibility);
      });
    });
  }

  private setNavbarVisibility(shouldShow: boolean) {
    if (this.isNavbarShown() === shouldShow || this.isNavbarTransitionRunning) {
      return;
    }

    const triggerDomElementsUpdate = () => {
      this.isNavbarShown.set(shouldShow);
      this.applicationRef.tick();
    };

    // trigger it inside a view transition if browser supports it
    if (
      document.startViewTransition &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      this.isNavbarTransitionRunning = true;
      const transition = document.startViewTransition(triggerDomElementsUpdate);
      transition.ready.catch((error: unknown) => {
        console.warn('Navbar view transition was skipped.', error);
      });
      void transition.finished.finally(() => {
        this.isNavbarTransitionRunning = false;
        this.setNavbarVisibility(window.scrollY > 0);
      });
      return;
    }

    triggerDomElementsUpdate();
  }
}
