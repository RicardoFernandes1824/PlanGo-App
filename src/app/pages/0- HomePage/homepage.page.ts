import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-1.1 - create-travel',
  templateUrl: './homepage.page.html',
  styleUrls: ['./homepage.page.scss'],
})
export class HomepagePage implements OnInit {
  travels:any[]=[];
  constructor(private activatedRoute: ActivatedRoute,private http: HttpClient,private modalCtrl: ModalController) {}

  getTravels () {
    this.http.get<any[]>('https://mobile-api-one.vercel.app/api/travels' , {
      headers: new HttpHeaders({
        "Authorization": `Basic ${btoa("ricardo.fernandes@ipvc.pt:H3$kZn7Q")}`
      })
    }).subscribe((response) => {
      this.travels=response;
    });
  }

    async openModal() {
      const modal = await this.modalCtrl.create({
        component: ModalComponent,
        cssClass: 'modal-fullScreen',
        componentProps: {

        }
      });

      await modal.present();

      const { data, role } = await modal.onWillDismiss();
      if (data && data.message) {

      }
    }

  ngOnInit() {
    this.getTravels();
  }

}
