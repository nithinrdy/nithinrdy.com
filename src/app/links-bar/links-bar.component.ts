import { Component } from '@angular/core';

@Component({
  selector: 'app-links-bar',
  templateUrl: './links-bar.component.html',
  styleUrls: ['./links-bar.component.css'],
})
export class LinksBarComponent {
  readonly links = [
    {
      id: 'github',
      url: 'https://www.github.com/nithinrdy',
    },
    {
      id: 'linkedin',
      url: 'https://www.linkedin.com/in/vishnu-nithin-reddy/',
    },
    {
      id: 'bluesky',
      url: 'https://bsky.app/profile/nithinrdy.bsky.social',
    },
    {
      id: 'substack',
      url: 'https://nithinrdy.substack.com/',
    },
  ];

  constructor() {}
}
