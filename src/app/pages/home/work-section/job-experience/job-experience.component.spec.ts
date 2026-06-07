import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobExperienceComponent } from './job-experience.component';
import { JobExperience } from './job-experience.model';

describe('JobExperienceComponent', () => {
  let component: JobExperienceComponent;
  let fixture: ComponentFixture<JobExperienceComponent>;

  const experience: JobExperience = {
    orgName: 'Example Org',
    orgLogo: '',
    role: 'Developer',
    startMonth: 1,
    startYear: 2024,
    endMonth: undefined,
    endYear: undefined,
    description: [[{ text: 'Built user-facing product interfaces.' }]],
    tools: ['Angular', 'TypeScript'],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobExperienceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JobExperienceComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('experience', experience);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
