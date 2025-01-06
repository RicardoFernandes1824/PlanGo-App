import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',  // Parent path for tabs
    component: TabsPage,
    children: [
      {
        path: 'create-travel',  // Route for create-travel page
        loadChildren: () =>
          import('../pages/create-travel/create-travel.module').then((m) => m.CreateTravelPageModule),
      },
      {
        path: 'current-travel',  // Route for current-travel page
        loadChildren: () =>
          import('../pages/current-travel/current-travel.module').then((m) => m.CurrentTravelPageModule),
      },
      {
        path: 'next-travel',  // Route for next-travel page
        loadChildren: () =>
          import('../pages/next-travel/next-travel.module').then((m) => m.NextTravelPageModule),
      },
      {
        path: '',
        redirectTo: '/tabs/create-travel',  // Redirect to 'create-travel' tab by default
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/create-travel',  // Redirect directly to 'create-travel' tab
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsRoutingModule {}
