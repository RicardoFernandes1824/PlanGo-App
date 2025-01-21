import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
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
  @Input() locations: any[] = [];

  locationDescription: string = '';
  locationType: string = '';
  locationState: string = '';
  locationStart: string = (new Date()).toISOString();
  locationEnd: string = (new Date()).toISOString();

  showLocationForm: boolean = false;

  constructor(private modalCtrl: ModalController, private toastController: ToastController) {}

  toggleLocationForm() {
    this.showLocationForm = !this.showLocationForm;
  }

  addLocation() {
    if (!this.locationDescription || !this.locationType || !this.locationState || !this.locationStart || !this.locationEnd) {
      this.presentToast('Please fill in all location details', 'danger');
      return;
    }

    const locationStartDate = new Date(this.locationStart);
    const locationEndDate = new Date(this.locationEnd);

    if (locationStartDate >= locationEndDate) {
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

    this.locationDescription = '';
    this.locationType = '';
    this.locationState = '';
    this.locationStart = (new Date()).toISOString();
    this.locationEnd = (new Date()).toISOString();

    this.showLocationForm = false;

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
    const tripStartDate = new Date(this.tripStart);
    const tripEndDate = new Date(this.tripEnd);

    if (tripStartDate >= tripEndDate) {
      await this.presentToast('The trip start date can\'t be after the trip end date', 'danger');
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
