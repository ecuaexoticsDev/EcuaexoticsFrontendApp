import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard.component';
import { PagesComponent } from './pages.component';
import { AuthGuard } from '../guards/auth.guard';
import { BodegaGuard } from '../guards/bodega.guard';
// import { BodegaExternaComponent } from './bodega-externa/bodega-externa.component';
// import { BitacoraComponent } from './bodega-externa/bitacora/bitacora.component';
import { AdminGuard } from '../guards/admin.guard';
import { CalibradoGuard } from '../guards/calibrado.guard';
import { PalletizadoGuard } from '../guards/palletizado.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard,AdminGuard],
    canLoad: [AuthGuard,],
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '', 
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    component: PagesComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard,AdminGuard],
        //component: DashboardComponent,
        loadChildren: () =>
          import('./admin/admin.module').then(
            (m) => m.AdminModule
          ),
        
      },
      {
        path: 'bodega',
        canActivate: [BodegaGuard],
        loadChildren: () =>
          import('./bodega-externa/bodega-externa.module').then(
            (m) => m.BodegaExternaModule
          ),
      },
      {
        path: 'calibrado',
        canActivate: [CalibradoGuard],
        loadChildren: () =>
          import('./calibrado/calibrado.module').then((m) => m.CalibradoModule),
      },
      {
        path: 'palletizado',
        canActivate: [PalletizadoGuard],
        loadChildren: () =>
          import('./palletizado/palletizado.module').then(
            (m) => m.PalletizadoModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
