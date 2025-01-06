import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabsPage } from './tabs.page';
import { TabsRoutingModule } from './tabs-routing.module';
import {RouterModule} from "@angular/router"

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,  // Add RouterModule here
    TabsRoutingModule,
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}
