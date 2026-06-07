import {
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  signal,
  viewChild,
} from '@angular/core';

import type { Project } from './project.model';

const MOBILE_BREAKPOINT = 768;
type PlatformKey = Project['links'][number]['platform'];
const PLATFORM_ICONS: Record<PlatformKey, string> = {
  chromewebstore: 'browser-chrome',
  flathub: 'download',
  github: 'github',
  vscode: 'code-square',
  code: 'code-square',
};

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  host: { style: 'perspective: 1000px;' },
})
export class ProjectCardComponent {
  @Input() project!: Project;
  private readonly cardRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly articleElement = viewChild.required<ElementRef<HTMLElement>>('cardArticle');

  @HostListener('mousemove', ['$event'])
  handleMouseMove(event: MouseEvent) {
    if (
      window.innerWidth < MOBILE_BREAKPOINT ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const card = this.articleElement().nativeElement;

    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const {
      top: cardTopEdge,
      bottom: cardBottomEdge,
      left: cardLeftEdge,
      right: cardRightEdge,
    } = this.cardRef.nativeElement.getBoundingClientRect();

    const mouseFromLeft = mouseX - cardLeftEdge;
    const mouseFromRight = cardRightEdge - mouseX;
    const mouseFromTop = mouseY - cardTopEdge;
    const mouseFromBottom = cardBottomEdge - mouseY;

    card.style.transition = 'transform 0.1s, box-shadow 0.4s';
    card.style.transform = `rotateX(
      ${(mouseFromBottom - mouseFromTop) / 100}deg
    ) rotateY(
      ${(mouseFromLeft - mouseFromRight) / 100}deg
    )`;
  }

  @HostListener('mouseleave')
  resetCardRotation() {
    const card = this.articleElement().nativeElement;

    card.style.transition = 'transform 0.4s ease, box-shadow 0.4s';
    card.style.transform = 'rotateX(0) rotateY(0)';
  }

  protected logoLoadFailed = signal(false);

  protected get projectInitial() {
    return this.project.name[0];
  }

  protected getLinkIcon = (platform: PlatformKey) => PLATFORM_ICONS[platform];
  protected markLogoFailed = () => this.logoLoadFailed.set(true);
}
