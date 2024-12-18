import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CurrentTravelPageRoutingModule } from './current-travel-routing.module';

import { CurrentTravelPage } from './current-travel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CurrentTravelPageRoutingModule
  ],
  declarations: [CurrentTravelPage]
})
export class CurrentTravelPageModule {}
