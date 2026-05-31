import { Component, afterNextRender, signal } from '@angular/core';
import { EmailBarComponent } from './email-bar/email-bar.component';
import { LinksBarComponent } from './links-bar/links-bar.component';
import { LoaderComponent } from './loader/loader.component';
import { MainSectionComponent } from './main-section/main-section.component';

export const loaderTimeout = 6000;

@Component({
  selector: 'app-root',
  imports: [EmailBarComponent, LinksBarComponent, LoaderComponent, MainSectionComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = 'nithinrdy';
  showLoader = signal(true);

  constructor() {
    afterNextRender(() => {
      setTimeout(() => this.showLoader.set(false), loaderTimeout);
    });
  }
}
