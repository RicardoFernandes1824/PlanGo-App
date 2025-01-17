import { Component, OnInit } from '@angular/core';
import {IonContent, IonHeader, IonModal, IonTitle, IonToolbar} from "@ionic/angular/standalone";

@Component({
  selector: 'app-current-travel',
  templateUrl: './travels.page.html',
  styleUrls: ['./travels.page.scss'],
  imports: [IonContent, IonHeader, IonModal, IonTitle, IonToolbar],
  standalone: true
})
export class TravelsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
