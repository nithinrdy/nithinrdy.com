import { ComponentFixture, TestBed } from '@angular/core/testing';

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
      'a developer',
      'a writer',
    ]);
  });
});
