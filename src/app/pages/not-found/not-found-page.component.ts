import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { EmailBarComponent } from '../../components/email-bar/email-bar.component';
import { LinksBarComponent } from '../../components/links-bar/links-bar.component';

@Component({
  selector: 'app-not-found-page',
  imports: [
    // better to import them in both places instead of creating a shell
    // that way initial animations trigger when navigating between pages.
    EmailBarComponent,
    LinksBarComponent,
    RouterLink,
  ],
  templateUrl: './not-found-page.component.html',
})
export class NotFoundPageComponent {}
