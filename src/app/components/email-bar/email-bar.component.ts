import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-email-bar',
  templateUrl: './email-bar.component.html',
  styleUrls: ['./email-bar.component.css'],
})
export class EmailBarComponent {
  @Input() isShown = false;
}
