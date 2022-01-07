import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearBitacoraComponent } from './crear-bitacora/crear-bitacora.component';
import { VerBitacorasComponent } from './ver-bitacoras/ver-bitacoras.component';

const routes: Routes = [
  {
    path: 'crear-bitacora',
    component: CrearBitacoraComponent,
    data: { title: 'BodegaExterna' },
  },
  {
    path: 'ver-bitacoras',
    component: VerBitacorasComponent,
    data: { title: 'BitacoraBodegaExterna' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodegaExternaRoutingModule {}
