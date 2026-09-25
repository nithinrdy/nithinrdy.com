import { Component, inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { AvatarMoodService } from '../../singleton-services/avatar-mood.service';

@Component({
  selector: 'app-links-bar',
  templateUrl: './links-bar.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./links-bar.component.css'],
})
export class LinksBarComponent {
  @Input() isShown = false;
  protected avatarMood = inject(AvatarMoodService);
  private moodResetTimeoutId: number | undefined = undefined;

  protected setAvatarMood = (mood: Parameters<AvatarMoodService['updateData']>[0]) => {
    clearTimeout(this.moodResetTimeoutId);
    if (mood === 'happy') {
      this.avatarMood.updateData(mood);
    } else {
      this.moodResetTimeoutId = window.setTimeout(() => this.avatarMood.updateData('neutral'), 200);
    }
  };

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
