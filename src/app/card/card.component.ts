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

  onCardClick(): void {
    console.log('Card clicked:', this.description);
    this.cardClicked.emit(this.description);
    this.cardClicked.emit(this.type);
  }
}
