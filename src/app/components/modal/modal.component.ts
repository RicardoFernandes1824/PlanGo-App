import { Component  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent, IonDatetime, IonDatetimeButton,
  IonHeader,
  IonInput,
  IonItem, IonLabel, IonModal, IonSelect, IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
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
  ],
  standalone: true
})
export class ModalComponent {

  tripName!: string;
  tripType!: string;
  tripState!: string;
  tripStart!: string;
  tripEnd!: string;

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.tripName, 'confirm');
  }
}
