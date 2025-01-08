import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateTravelPageRoutingModule } from './create-travel-routing.module';
import { CreateTravelPage } from './create-travel.page';
import { CardComponent } from 'src/app/card/card.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTravelPageRoutingModule,
  ],
  declarations: [CreateTravelPage, CardComponent]
})
export class CreateTravelPageModule {
  
}
