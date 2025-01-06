import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router"

@Component({
  selector: 'app-create-travel',
  templateUrl: './create-travel.page.html',
  styleUrls: ['./create-travel.page.scss'],
})
export class CreateTravelPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
  }

}
