import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NextTravelPage } from './next-travel.page';

const routes: Routes = [
  {
    path: '',
    component: NextTravelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NextTravelPageRoutingModule {}
