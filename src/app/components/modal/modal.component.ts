import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';

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
  standalone: true,
})
export class ModalComponent {
  @Input() tripDescription: string = '';
  @Input() tripType: string = '';
  @Input() tripState: string = '';
  @Input() tripStart: string = (new Date()).toISOString();
  @Input() tripEnd: string = (new Date()).toISOString();

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    const tripData = {
      tripDescription: this.tripDescription,
      tripType: this.tripType,
      tripState: this.tripState,
      tripStart: this.tripStart,
      tripEnd: this.tripEnd,
    };
    return this.modalCtrl.dismiss(tripData, 'confirm');
  }
}
