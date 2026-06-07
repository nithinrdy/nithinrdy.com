import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-links-bar',
  templateUrl: './links-bar.component.html',
  styleUrls: ['./links-bar.component.css'],
})
export class LinksBarComponent {
  @Input() isShown = false;

  readonly links = [
    {
      id: 'bluesky',
      url: 'https://bsky.app/profile/nithinrdy.bsky.social',
    },
    {
      id: 'github',
      url: 'https://www.github.com/nithinrdy',
    },
    {
      id: 'linkedin',
      url: 'https://www.linkedin.com/in/vishnu-nithin-reddy/',
    },
    {
      id: 'substack',
      url: 'https://nithinrdy.substack.com/',
    },
  ];

  constructor() {}
}
