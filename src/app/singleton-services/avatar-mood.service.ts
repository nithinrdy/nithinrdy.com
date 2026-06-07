import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AvatarMoodService {
  private avatarMood = signal<'neutral' | 'happy'>('neutral');

  public readonly data = this.avatarMood.asReadonly();

  public updateData(newValue: 'neutral' | 'happy'): void {
    console.log(`Updating avatar mood to: ${newValue}`);
    this.avatarMood.set(newValue);
  }
}
