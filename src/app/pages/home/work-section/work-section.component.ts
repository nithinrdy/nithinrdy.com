import { Component, DestroyRef, ElementRef, afterNextRender, inject, signal } from '@angular/core';

import { JobExperienceComponent } from './job-experience/job-experience.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import type { JobExperience } from './job-experience/job-experience.model';
import type { Project } from './project-card/project.model';
import { EXPERIENCES, PROJECTS } from '../constants';

@Component({
  selector: 'app-work-section',
  imports: [JobExperienceComponent, ProjectCardComponent],
  templateUrl: './work-section.component.html',
})
export class WorkSectionComponent {
  protected readonly jobExperiences: JobExperience[] = EXPERIENCES;
  protected readonly projects: Project[] = PROJECTS;
  protected readonly visibleExperienceIndexes = signal(new Set<string>());

  private readonly destroyRef = inject(DestroyRef);
  private readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    afterNextRender(() => {
      const experienceElements = Array.from(
        this.hostElement.nativeElement.querySelectorAll<HTMLElement>('[data-work-org]'),
      );

      if (experienceElements.length === 0) {
        return;
      }

      if (
        typeof IntersectionObserver === 'undefined' ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ) {
        this.visibleExperienceIndexes.set(
          new Set(experienceElements.map((element) => this.getExperienceOrg(element))),
        );
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          const nextVisibleIndexes = new Set(this.visibleExperienceIndexes());

          for (const entry of entries) {
            if (!entry.isIntersecting) continue;

            const index = this.getExperienceOrg(entry.target as HTMLElement);
            nextVisibleIndexes.add(index);
            observer.unobserve(entry.target);
          }

          this.visibleExperienceIndexes.set(nextVisibleIndexes);
        },
        { rootMargin: '0px 0px -20% 0px', threshold: 0.10 },
      );

      for (const element of experienceElements) {
        observer.observe(element);
      }

      this.destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected isExperienceVisible(orgName: string) {
    return this.visibleExperienceIndexes().has(orgName);
  }

  private getExperienceOrg(element: HTMLElement) {
    return String(element.dataset['workOrg']);
  }
}
