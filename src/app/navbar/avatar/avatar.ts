import { Component, ElementRef, HostListener, inject, signal } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.html',
  styleUrls: ['./avatar.css'],
})
export class AvatarComponent {
  private hostElement = inject<ElementRef<HTMLElement>>(ElementRef);
  private hideGreetingTimeoutId: number | undefined = undefined;

  protected showAvatarGreeting = signal(-1);
  protected readonly greetings = [
    'Hey!',
    'Cut it out!',
    'Hey, watch it!',
    'Stop that!',
    "That's not funny!",
  ];

  @HostListener('document:mousemove', ['$event'])
  handleMouseMove = (event: MouseEvent) => {
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
    eyes.forEach((eye: HTMLElement) => {
      eye.style.transform = `translate(${eyeMovementX}px, ${eyeMovementY}px)`;
    });
  };

  protected onAvatarMouseEnter() {
    let i = Math.floor(Math.random() * this.greetings.length);
    if (i === this.showAvatarGreeting()) {
      i = (i + 1) % this.greetings.length;
    }
    this.showAvatarGreeting.set(i);
    clearTimeout(this.hideGreetingTimeoutId);

    this.hideGreetingTimeoutId = window.setTimeout(() => {
      this.showAvatarGreeting.set(-1);
    }, 2000);
  }
}
