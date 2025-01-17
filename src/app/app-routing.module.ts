import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule), // Import TabsPageModule
  },
  {
    path: '',
    redirectTo: '/tabs/homepage',
    pathMatch: 'full',
  },
  {
    path: '1.1 - create-travel',
    loadChildren: () => import('./pages/1.1 - create-travel/create-travel.module').then(m => m.CreateTravelPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
