import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {LoadingController, ModalController, ToastController} from "@ionic/angular";
import {ModalComponent} from "../../components/modal/modal.component";

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
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    ) {}

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
      position: 'top', // Position of the toast ('top', 'bottom', 'middle')
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
        this.travels = response;
      },
      error: (error) => {
        console.error('Error fetching travels:', error);
      },
      complete: () => {
        this.hideLoading(loading); // Hide the loader when the request is complete
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

    const { data, role } = await modal.onWillDismiss();
    console.log(data)
    if (role === 'confirm' && data) {
      this.description = data.tripDescription;
      this.type = data.tripType;
      this.tripState = data.tripState;
      this.tripStart = data.tripStart;
      this.tripEnd = data.tripEnd;
      await this.postTravels();
    }
  }

  async postTravels() {
    const loading = await this.showLoading('Saving travel...');

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
        this.presentToast('Error creating travel', 'danger');  // Show a red error toast
      },
      complete: () => {
        console.log('Post request completed.');
      }
    });
  }
}
