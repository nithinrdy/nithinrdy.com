import { Component, DestroyRef, Input, afterNextRender, inject, signal } from '@angular/core';
import { AvatarComponent } from './avatar/avatar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [AvatarComponent],
})
export class NavbarComponent {
  @Input() isShown = false;

  private readonly destroyRef = inject(DestroyRef);
  protected readonly activeSection = signal('');

  readonly navItems = [
    { label: 'Nithin', section: 'about' },
    { label: 'Developer', section: 'developing' },
    { label: 'Writer', section: 'writing' },
  ];

  constructor() {
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        return;
      }

      const visibleSectionAreas = new Map<string, number>();

      const setMostVisibleSection = () => {
        const [mostVisibleSection, visibleArea] = [...visibleSectionAreas.entries()].sort(
          ([, firstArea], [, secondArea]) => secondArea - firstArea,
        )[0] ?? ['', 0];

        this.activeSection.set(visibleArea > 0 ? mostVisibleSection : '');
      };

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const visibleArea = entry.intersectionRect.width * entry.intersectionRect.height;
            visibleSectionAreas.set(entry.target.id, visibleArea);
          }

          setMostVisibleSection();
        },
        {
          threshold: Array.from({ length: 21 }, (_, index) => index / 20),
        },
      );

      for (const item of this.navItems) {
        const section = document.getElementById(item.section);

        if (section) {
          visibleSectionAreas.set(item.section, 0);
          observer.observe(section);
        }
      }

      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
