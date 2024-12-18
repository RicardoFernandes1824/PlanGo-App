import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NextTravelPageRoutingModule } from './next-travel-routing.module';

import { NextTravelPage } from './next-travel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NextTravelPageRoutingModule
  ],
  declarations: [NextTravelPage]
})
export class NextTravelPageModule {}
