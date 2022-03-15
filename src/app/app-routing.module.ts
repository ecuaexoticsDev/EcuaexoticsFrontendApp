import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { DocumentDownloadsComponent } from './pages/document-downloads/document-downloads.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  // { path: '', component: PagesComponent },
  { path: 'downloads/:idProductor/:idBodega', component: DocumentDownloadsComponent },
  { path: '**', component: NopagefoundComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
