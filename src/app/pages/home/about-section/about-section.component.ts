import { Component, signal } from '@angular/core';
import { TextWithTransition } from '../shared/components/text-with-transition/text-with-transition';

@Component({
  selector: 'app-about-section',
  templateUrl: './about-section.component.html',
  imports: [TextWithTransition],
  styleUrls: ['./about-section.component.css'],
})
export class AboutSectionComponent {
  protected isHoveredOver = signal(false);
  protected timeoutId: number | undefined = undefined;

  protected setHoveredOver(value: boolean) {
    clearTimeout(this.timeoutId);

    if (value === true) this.isHoveredOver.set(value);
    if (value === false) {
      this.timeoutId = window.setTimeout(() => this.isHoveredOver.set(value), 500);
    }
  }
}
