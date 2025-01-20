import { NgModule } from '@angular/core';
import {CommonModule, NgForOf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TravelsPageRoutingModule } from './travels-routing.module';
import { TravelsPage } from './travels.page';
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TravelsPageRoutingModule,
    TravelsPage,
    NgForOf,
    SharedModule
  ],
  declarations: []
})
export class TravelsPageModule {}
