import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WritableSignal } from '@angular/core';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('isShown', true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the three transitioned nav links', () => {
    const links = fixture.nativeElement.querySelectorAll(
      '.site-navbar-link',
    ) as NodeListOf<HTMLElement>;

    expect(links).toHaveLength(3);
    expect(Array.from(links).map((link) => link.textContent?.trim())).toEqual([
      'Nithin',
      'Developer',
      'Writer',
    ]);
    expect(Array.from(links).map((link) => link.getAttribute('href'))).toEqual([
      '#about',
      '#developing',
      '#writing',
    ]);
  });

  it('should underline the active section link', () => {
    const activeSection = (component as unknown as { activeSection: WritableSignal<string> })
      .activeSection;

    activeSection.set('about');
    fixture.detectChanges();

    const activeLink = fixture.nativeElement.querySelector(
      '.site-navbar-link.is-active',
    ) as HTMLElement | null;

    expect(activeLink?.textContent?.trim()).toBe('Nithin');
    expect(activeLink?.getAttribute('aria-current')).toBe('location');
  });
});
