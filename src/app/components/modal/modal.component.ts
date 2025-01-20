import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { IonButton, IonButtons, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [
    FormsModule,
    CommonModule,
    IonicModule,
  ],
  standalone: true,
})
export class ModalComponent {
  @Input() tripDescription: string = '';
  @Input() tripType: string = '';
  @Input() tripState: string = '';
  @Input() tripStart: string = (new Date()).toISOString();
  @Input() tripEnd: string = (new Date()).toISOString();
  @Input() locations: any[] = []; // Array to store locations

  locationDescription: string = '';
  locationType: string = '';
  locationState: string = '';
  locationStart: string = (new Date()).toISOString();
  locationEnd: string = (new Date()).toISOString();

  constructor(private modalCtrl: ModalController, private toastController: ToastController) {}

  addLocation() {
    if (this.locationStart >= this.locationEnd) {
      this.presentToast('The start date of the location cannot be after the end date', 'danger');
      return;
    }

    const location = {
      description: this.locationDescription,
      type: this.locationType,
      state: this.locationState,
      start: this.locationStart,
      end: this.locationEnd,
    };
    this.locations.push(location);

    // Clear the input fields after adding the location
    this.locationDescription = '';
    this.locationType = '';
    this.locationState = '';
    this.locationStart = (new Date()).toISOString();
    this.locationEnd = (new Date()).toISOString();

    this.presentToast('Location added successfully');
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom',
    });
    await toast.present();
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    if (new Date(this.tripStart) >= new Date(this.tripEnd)) {
      await this.presentToast('The trip start date cant be after the trip end date', 'danger');
      return;
    }

    const tripData = {
      tripDescription: this.tripDescription,
      tripType: this.tripType,
      tripState: this.tripState,
      tripStart: this.tripStart,
      tripEnd: this.tripEnd,
      locations: this.locations,
    };

    return this.modalCtrl.dismiss(tripData, 'confirm');
  }
}
