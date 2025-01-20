import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() description!: string;
  @Input() type!: string;
  @Input() startAt!: Date;
  @Input() endAt!: Date;
  @Output() cardClicked = new EventEmitter<string>();

  isStarred = false; // Initial state for star icon (not starred)

  toggleStar(event: Event) {
    event.stopPropagation();
    this.isStarred = !this.isStarred; // Toggle the star status
  }

  onCardClick(): void {
    console.log('Card clicked:', this.description);
    this.cardClicked.emit(this.description);
    this.cardClicked.emit(this.type);
  }
}
