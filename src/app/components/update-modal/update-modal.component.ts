import {Component, Input, OnInit} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
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
  ],
  standalone: true
})
export class UpdateModalComponent implements OnInit {
  @Input() tripId!: string;
  @Input() description!: string;
  @Input() type!: string;
  @Input() state!: string;
  @Input() startAt!: string;
  @Input() endAt!: string;

  constructor(private modalTrip: ModalController, private toastController: ToastController) {
  }

  ngOnInit() {
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

  async saveChanges() {
    const updatedTrip = {
      id: this.tripId,
      description: this.description,
      type: this.type,
      state: this.state,
      startAt: this.startAt,
      endAt: this.endAt,
    };

    if (new Date(this.startAt) >= new Date(this.endAt)) {
      await this.presentToast('The start date can\'t be after the end date', 'danger')
      return;
    }
    await this.modalTrip.dismiss(updatedTrip, 'update');
  }

  closeModal() {
    this.modalTrip.dismiss(null, 'cancel');
  }

  async commentTravel() {
    await this.modalTrip.dismiss({ tripId: this.tripId }, 'delete');

  }

  async deleteTravel() {
      await this.modalTrip.dismiss({ tripId: this.tripId }, 'delete');

}
}
