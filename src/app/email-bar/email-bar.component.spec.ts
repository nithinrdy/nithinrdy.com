import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailBarComponent } from './email-bar.component';

describe('EmailBarComponent', () => {
  let component: EmailBarComponent;
  let fixture: ComponentFixture<EmailBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmailBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
