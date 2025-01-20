import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ModalController} from "@ionic/angular";
import {ModalComponent} from "../../components/modal/modal.component";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})

export class HomepagePage implements OnInit {
  travels: any[] = [];
  tripName!: string;
  tripType!: string;
  tripState!: string;
  tripStart!: string;
  tripEnd!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.getTravels();
  }

  getTravels() {
    this.http.get<any[]>('https://mobile-api-one.vercel.app/api/travels', {
      headers: new HttpHeaders({
        "Authorization": `Basic ${btoa("ricardo.fernandes@ipvc.pt:H3$kZn7Q")}`
      }),
    }).subscribe((response) => {
      this.travels = response;
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
    if (role === 'confirm' && data) {
      this.tripName = data.name;
      this.tripType = data.type;
      this.tripState = data.state;
      this.tripStart = data.startDate;
      this.tripEnd = data.endDate;

      this.postTravels();
    }
  }

  postTravels() {
    const travelData = {
      name: this.tripName,
      type: this.tripType,
      state: this.tripState,
      startDate: this.tripStart,
      endDate: this.tripEnd,
    };

    this.http.post('https://mobile-api-one.vercel.app/api/travels', travelData, {
      headers: new HttpHeaders({
        "Authorization": `Basic ${btoa("ricardo.fernandes@ipvc.pt:H3$kZn7Q")}`,
        "Content-Type": "application/json",
      }),
    }).subscribe((response) => {
        console.log('Travel created successfully:', response);
        this.postTravels(); // Refresh travel list
      },
      (error) => {
        console.error('Error creating travel:', error);
      }
    );
  }
}
