import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomepagePageRoutingModule } from './homepage-routing.module';
import { HomepagePage } from './homepage.page';
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomepagePageRoutingModule,
    SharedModule
  ],
  declarations: [HomepagePage]
})
export class HomepagePageModule {

}
