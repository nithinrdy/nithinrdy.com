import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWithTransition } from './text-with-transition';

describe('TextWithTransition', () => {
  let component: TextWithTransition;
  let fixture: ComponentFixture<TextWithTransition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextWithTransition],
    }).compileComponents();

    fixture = TestBed.createComponent(TextWithTransition);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('string1', 'First');
    fixture.componentRef.setInput('string2', 'Second');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
