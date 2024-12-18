import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CurrentTravelPage } from './current-travel.page';

const routes: Routes = [
  {
    path: '',
    component: CurrentTravelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CurrentTravelPageRoutingModule {}
