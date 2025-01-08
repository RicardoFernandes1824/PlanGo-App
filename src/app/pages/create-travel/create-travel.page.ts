import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router"
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-travel',
  templateUrl: './create-travel.page.html',
  styleUrls: ['./create-travel.page.scss'],
})
export class CreateTravelPage implements OnInit {
  travels:any[]=[];
  constructor(private activatedRoute: ActivatedRoute,private http: HttpClient) {}
  
  getTravels () {
    this.http.get<any[]>('https://mobile-api-one.vercel.app/api/travels' , {
      headers: new HttpHeaders({
        "Authorization": `Basic ${btoa("ricardo.fernandes@ipvc.pt:H3$kZn7Q")}`
      })
    }).subscribe((response) => {
      this.travels=response;
    });
  }
  ngOnInit() {
    this.getTravels();
  }

}
