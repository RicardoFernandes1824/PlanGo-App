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
    IonicModule, // Ensure this is included
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

  // Flag to toggle the visibility of the location form
  showLocationForm: boolean = false;

  constructor(private modalCtrl: ModalController, private toastController: ToastController) {}

  // Function to toggle the location form visibility
  toggleLocationForm() {
    this.showLocationForm = !this.showLocationForm;
  }

  // Function to add the location to the locations list
  addLocation() {
    // Check if all fields are filled out
    if (!this.locationDescription || !this.locationType || !this.locationState || !this.locationStart || !this.locationEnd) {
      this.presentToast('Please fill in all location details', 'danger');
      return;
    }

    // Convert start and end dates to Date objects for proper comparison
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

    // Add the location to the locations list
    this.locations.push(location);

    // Clear the input fields after adding the location
    this.locationDescription = '';
    this.locationType = '';
    this.locationState = '';
    this.locationStart = (new Date()).toISOString();
    this.locationEnd = (new Date()).toISOString();

    // Optionally, hide the location form after adding
    this.showLocationForm = false;

    this.presentToast('Location added successfully');
  }

  // Show toast message
  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom',
    });
    await toast.present();
  }

  // Function to cancel and close the modal
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  // Function to confirm and return the trip data
  async confirm() {
    // Validate trip dates
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

    // Dismiss modal with the trip data
    return this.modalCtrl.dismiss(tripData, 'confirm');
  }
}
