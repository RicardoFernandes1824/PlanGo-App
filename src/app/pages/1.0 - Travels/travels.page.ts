import { Component, OnInit } from '@angular/core';
import {IonicModule, LoadingController} from "@ionic/angular";
import {NgForOf} from "@angular/common";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {IonHeader, IonModal, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {SharedModule} from "../../shared/shared.module";

@Component({
  selector: 'app-travels',
  templateUrl: './travels.page.html',
  styleUrls: ['./travels.page.scss'],
  imports: [IonHeader, IonModal, IonTitle, IonToolbar, IonicModule, SharedModule, NgForOf],
  standalone: true
})
export class TravelsPage implements OnInit {
  travels: any[] = [];
  description!: string;
  type!: string;
  tripState!: string;
  tripStart!: string;
  tripEnd!: string;
  filteredTravels: any[] = [];

  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
  ) {}

  async ngOnInit() {
    await this.getTravels()
  }

  filterTravels(filter: string) {
    if (filter === '') {
      this.filteredTravels = this.travels;
      return
    }
    this.filteredTravels = this.travels.filter((travel) => travel.type === filter);
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
        this.filteredTravels = response;
      },
      error: (error) => {
        console.error('Error fetching travels:', error);
      },
      complete: () => {
        this.hideLoading(loading); // Hide the loader when the request is complete
      }
    });
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



}
