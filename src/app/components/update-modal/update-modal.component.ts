import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {FormsModule} from "@angular/forms";
import {
  IonButton,
  IonButtons,
  IonContent, IonDatetime, IonDatetimeButton,
  IonHeader,
  IonInput,
  IonItem, IonLabel, IonModal, IonSelect, IonSelectOption, IonText,
  IonTitle,
  IonToolbar
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.component.html',
  styleUrls: ['./update-modal.component.scss'],
  imports: [
    FormsModule,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonTitle,
    IonToolbar,
    IonSelectOption,
    IonSelect,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    IonLabel,
    IonText,
  ],
  standalone: true
})
export class UpdateModalComponent implements OnInit {
  @Input() tripId!: string; // ID of the trip being updated
  @Input() description!: string;
  @Input() type!: string;
  @Input() state!: string;
  @Input() startAt!: string;
  @Input() endAt!: string;

  constructor(private modalTrip: ModalController) {}

  ngOnInit() {
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
    this.modalTrip.dismiss(updatedTrip, 'update');
  }

  closeModal() {
    // Close modal without saving changes
    this.modalTrip.dismiss(null, 'cancel');
  }
}
