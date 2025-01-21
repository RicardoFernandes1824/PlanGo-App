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
  @Input() travelId: string = ''; // ID of the travel
  @Input() isFav: boolean = false; // Whether the travel is marked as favorite
  @Output() favoriteChanged = new EventEmitter<{ travelId: string, isFav: boolean }>(); // Emit the favorite status change

  toggleStar(event: Event) {
    event.stopPropagation(); // Prevent click event from propagating to the parent (card click)
    this.isFav = !this.isFav; // Toggle the favorite status using 'isFav'
    console.log('Favorite status updated:', this.isFav); // Debug log to see the updated value
    this.favoriteChanged.emit({ travelId: this.travelId, isFav: this.isFav }); // Emit the event with travelId and new favorite status
  }
}
