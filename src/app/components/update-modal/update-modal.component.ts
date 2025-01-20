import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss'],
})
export class UpdateModalComponent implements OnInit {
  @Input() tripId!: string; // ID of the trip being updated
  @Input() description!: string;
  @Input() type!: string;
  @Input() state!: string;
  @Input() startAt!: string;
  @Input() endAt!: string;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    // Initialization logic if needed
  }

  saveChanges() {
    // Package updated data into an object
    const updatedTrip = {
      id: this.tripId,
      description: this.description,
      type: this.type,
      state: this.state,
      startAt: this.startAt,
      endAt: this.endAt,
    };

    // Pass data back to the parent and close the modal
    this.modalCtrl.dismiss(updatedTrip, 'confirm');
  }

  closeModal() {
    // Close modal without saving changes
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
