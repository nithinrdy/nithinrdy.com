import {
  ApplicationRef,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  isDevMode,
  signal,
} from '@angular/core';

import { AboutSectionComponent } from './about-section/about-section.component';
import { EmailBarComponent } from '../../components/email-bar/email-bar.component';
import { FooterSectionComponent } from './footer-section/footer-section.component';
import { LinksBarComponent } from '../../components/links-bar/links-bar.component';
import { LoaderComponent } from './loader/loader.component';
import { MainSectionComponent } from './main-section/main-section.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WorkSectionComponent } from './work-section/work-section.component';
import { WritingSectionComponent } from './writing-section/writing-section.component';

export const loaderTimeout = 6000;

@Component({
  selector: 'app-home-page',
  imports: [
    AboutSectionComponent,
    EmailBarComponent,
    FooterSectionComponent,
    LinksBarComponent,
    LoaderComponent,
    MainSectionComponent,
    NavbarComponent,
    WorkSectionComponent,
    WritingSectionComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {
  protected readonly showLoader = signal(true);
  protected readonly isNavbarShown = signal(false);

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
