import {
  Component,
  ElementRef,
  HostListener,
  inject,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AvatarMoodService } from '../../../../singleton-services/avatar-mood.service';

const POINTER_TRACKING_BREAKPOINT = 1024;

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./avatar.css'],
})
export class AvatarComponent {
  private hostElement = inject<ElementRef<HTMLElement>>(ElementRef);
  private hideGreetingTimeoutId: number | undefined = undefined;

  protected avatarMoodData = inject(AvatarMoodService).data;

  protected showAvatarGreeting = signal(-1);
  protected randomGreetingRotation = signal(0);
  protected readonly greetings = [
    'Cut it out!',
    'Come on!',
    'Hey, watch it!',
    'Stop that!',
    "That's not funny!",
  ];

  @HostListener('document:mousemove', ['$event'])
  handleMouseMove = (event: MouseEvent) => {
    if (!this.eyesShouldFollowCursor()) {
      this.resetEyeTransforms();
      return;
    }

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const avatarRect = this.hostElement.nativeElement.getBoundingClientRect();
    const avatarX = avatarRect.left + avatarRect.width / 2;
    const avatarY = avatarRect.top + avatarRect.height / 2;

    const angle = Math.atan2(mouseY - avatarY, mouseX - avatarX);

    const eyeMovementX = Math.cos(angle) * 3;
    const eyeMovementY = Math.sin(angle) * 3;

    const eyes = this.hostElement.nativeElement.querySelectorAll(
      '.eyes',
    ) as NodeListOf<HTMLElement>;
    const smilingEyes = this.hostElement.nativeElement.querySelectorAll(
      '.smiling-eyes',
    ) as NodeListOf<HTMLElement>;
    [...eyes, ...smilingEyes].forEach((eye: HTMLElement) => {
      eye.style.transform = `translate(${eyeMovementX}px, ${eyeMovementY}px)`;
    });
  };

  @HostListener('window:resize')
  handleWindowResize = () => {
    if (!this.eyesShouldFollowCursor()) this.resetEyeTransforms();
  };

  private eyesShouldFollowCursor() {
    return typeof window !== 'undefined' && window.innerWidth >= POINTER_TRACKING_BREAKPOINT;
  }

  private resetEyeTransforms() {
    const eyes = this.hostElement.nativeElement.querySelectorAll(
      '.eyes',
    ) as NodeListOf<HTMLElement>;
    const smilingEyes = this.hostElement.nativeElement.querySelectorAll(
      '.smiling-eyes',
    ) as NodeListOf<HTMLElement>;
    [...eyes, ...smilingEyes].forEach((eye: HTMLElement) => (eye.style.transform = ''));
  }

  protected onAvatarMouseEnter() {
    let i = Math.floor(Math.random() * this.greetings.length);
    if (i === this.showAvatarGreeting()) {
      i = (i + 1) % this.greetings.length;
    }
    this.showAvatarGreeting.set(i);
    this.randomGreetingRotation.set(Math.random() * 50 - 25);

    clearTimeout(this.hideGreetingTimeoutId);
  }

  protected onAvatarMouseLeave() {
    this.hideGreetingTimeoutId = window.setTimeout(() => {
      this.showAvatarGreeting.set(-1);
    }, 600);
  }
}
