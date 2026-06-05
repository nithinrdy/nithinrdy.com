import { Component, Input, signal } from '@angular/core';

import { JobExperience } from './job-experience.model';
import { MONTH_NAMES } from '../../constants';

@Component({
  selector: 'app-job-experience',
  templateUrl: './job-experience.component.html',
})
export class JobExperienceComponent {
  @Input() experience!: JobExperience;
  @Input() isVisible = false;

  protected logoLoadFailed = signal(false);

  protected get timeframe() {
    const startDate = `${MONTH_NAMES[this.experience.startMonth - 1]} ${this.experience.startYear}`;
    const endDate =
      this.experience.endMonth === undefined || this.experience.endYear === undefined
        ? 'Present'
        : `${MONTH_NAMES[this.experience.endMonth - 1]} ${this.experience.endYear}`;

    return `${startDate} - ${endDate}`;
  }

  protected get orgInitial() {
    return this.experience.orgName[0];
  }

  protected markLogoFailed() {
    this.logoLoadFailed.set(true);
  }
}
