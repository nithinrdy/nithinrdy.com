import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @Input() isShown = false;

  readonly navItems = [
    { label: 'Nithin', section: 'about' },
    { label: 'developer', section: 'work' },
    { label: 'writer', section: 'writing' },
  ];
}
