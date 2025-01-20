import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',  // Parent path for tabs
    component: TabsPage,
    children: [
      {
        path: 'homepage',
        loadChildren: () =>
          import('../pages/0- HomePage/homepage.module').then((m) => m.HomepagePageModule),
      },
      {
        path: 'travels',
        loadChildren: () =>
          import('../pages/1.0 - Travels/travels.module').then((m) => m.TravelsPageModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../pages/2 - Settings/settings.module').then((m) => m.SettingsPageModule),
      },
      {
        path: 'homepage',
        redirectTo: '/tabs/0- Homepage',  // Redirect to '1.1 - create-travel' tab by default
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/1.1 - create-travel',  // Redirect directly to '1.1 - create-travel' tab
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsRoutingModule {}
