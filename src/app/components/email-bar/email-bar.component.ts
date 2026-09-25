import { Component, inject, Input, ChangeDetectionStrategy } from '@angular/core';
import { AvatarMoodService } from '../../singleton-services/avatar-mood.service';

@Component({
  selector: 'app-email-bar',
  templateUrl: './email-bar.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./email-bar.component.css'],
})
export class EmailBarComponent {
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
}
