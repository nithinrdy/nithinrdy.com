import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { EmailBarComponent } from '../../components/email-bar/email-bar.component';
import { LinksBarComponent } from '../../components/links-bar/links-bar.component';

@Component({
  selector: 'app-not-found-page',
  imports: [EmailBarComponent, LinksBarComponent, RouterLink],
  templateUrl: './not-found-page.component.html',
})
export class NotFoundPageComponent {}
