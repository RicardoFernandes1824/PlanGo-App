import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreviousTravelPageRoutingModule } from './previous-travel-routing.module';

import { PreviousTravelPage } from './previous-travel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreviousTravelPageRoutingModule
  ],
  declarations: [PreviousTravelPage]
})
export class PreviousTravelPageModule {}
