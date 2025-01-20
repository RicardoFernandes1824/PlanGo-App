import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {LoadingController, ModalController, ToastController} from "@ionic/angular";
import {ModalComponent} from "../../components/modal/modal.component";
import {UpdateModalComponent} from "../../components/update-modal/update-modal.component";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  travels: any[] = [];
  description!: string;
  type!: string;
  tripState!: string;
  tripStart!: string;
  tripEnd!: string;

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController,
    private modalTrip: ModalController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
  ) {
  }

  async ngOnInit() {
    await this.getTravels();
  }

  async showLoading(message: string) {
    const loading = await this.loadingCtrl.create({
      message,
      spinner: 'crescent',
      duration: 1000
    });
    await loading.present();
    return loading;
  }

  hideLoading(loading: any) {
    loading.dismiss();
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'top',
    });
    await toast.present();
  }

  async getTravels() {
    const loading = await this.showLoading('Loading travels...');

    this.http.get<any[]>('https://mobile-api-one.vercel.app/api/travels', {
      headers: new HttpHeaders({
        "Authorization": `Basic ${btoa("ricardo.fernandes@ipvc.pt:H3$kZn7Q")}`
      }),
    }).subscribe({
      next: (response) => {
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        const validAndSortedTravels = response
          .filter((travel) => {
            const startAt = new Date(travel.startAt);
            const endAt = new Date(travel.endAt);

            return startAt <= startOfToday && endAt >= startOfToday;
          })
          .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime()); // Sort by start date

        this.travels = validAndSortedTravels;
      },
      error: (error) => {
        console.error('Error fetching travels:', error);
      },
      complete: () => {
        this.hideLoading(loading);
      }
    });
  }

  async updateTravel(travel: any) {

    const startDate = new Date(this.tripStart);
    const endDate = new Date(this.tripEnd);

    if (endDate < startDate) {
      await this.presentToast('Error: End Date cannot be earlier than Start Date.', 'danger');
      return;
    }

    await this.showLoading('Loading travels...');

    this.http.put<any[]>(`https://mobile-api-one.vercel.app/api/travels/${travel.id}`, travel, {
      headers: new HttpHeaders({
        "Authorization": `Basic ${btoa("ricardo.fernandes@ipvc.pt:H3$kZn7Q")}`
      }),
    }).subscribe({
      next: (response) => {
        this.getTravels()
        this.presentToast('Travel updated successfully!');
      },
      error: (error) => {
        console.error('Error updating travel:', error);
        this.presentToast('Error updating travel', 'danger');
      },
      complete: () => {
        console.log('Post request completed.');
      }
    });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      cssClass: 'modal-fullScreen',
      componentProps: {}
    });

    await modal.present();

    const {data, role} = await modal.onWillDismiss();
    if (role === 'confirm' && data) {
      this.description = data.tripDescription;
      this.type = data.tripType;
      this.tripState = data.tripState;
      this.tripStart = data.tripStart;
      this.tripEnd = data.tripEnd;
      await this.postTravels();
    }
  }

  async openTripModalComponent(tripId: string) {
    const selectedTrip = this.travels.find((trip) => trip.id === tripId);

    if (!selectedTrip) {
      console.error('Trip not found');
      return;
    }
    const modalTrip = await this.modalTrip.create({
      component: UpdateModalComponent,
      cssClass: 'modal-fullScreen',
      componentProps: {
        tripId: selectedTrip.id,
        description: selectedTrip.description,
        type: selectedTrip.type,
        state: selectedTrip.state,
        startAt: selectedTrip.startAt,
        endAt: selectedTrip.endAt,
      },
    });

    await modalTrip.present();


    const {data, role} = await modalTrip.onWillDismiss();

    role === 'update' && await this.updateTravel(data)
  }

  async postTravels() {

    await this.showLoading('Saving travel...');

    const travelData = {
      description: this.description,
      type: this.type,
      state: this.tripState,
      startAt: new Date(this.tripStart),
      endAt: new Date(this.tripEnd)
    };

    this.http.post('https://mobile-api-one.vercel.app/api/travels', travelData, {
      headers: new HttpHeaders({
        "Authorization": `Basic ${btoa("ricardo.fernandes@ipvc.pt:H3$kZn7Q")}`,
        "Content-Type": "application/json",
      }),
    }).subscribe({
      next: (response) => {
        this.presentToast('Travel created successfully!');
      },
      error: (error) => {
        console.error('Error creating travel:', error);
        this.presentToast('Error creating travel', 'danger');
      },
      complete: () => {
        console.log('Post request completed.');
      }
    });
  }
}
