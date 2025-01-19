import { Component, OnInit } from '@angular/core';
import {IonContent, IonHeader, IonModal, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-travels',
  templateUrl: './travels.page.html',
  styleUrls: ['./travels.page.scss'],
  imports: [IonHeader, IonModal, IonTitle, IonToolbar, IonicModule],
  standalone: true
})
export class TravelsPage{

  constructor() { }

  ngOnInit() {
  }

}
