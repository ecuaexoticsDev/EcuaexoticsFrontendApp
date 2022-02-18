import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearBitacoraComponent } from './crear-bitacora/crear-bitacora.component';
import { VerBitacorasComponent } from './ver-bitacoras/ver-bitacoras.component';
import { VerRecepcionTransporteComponent } from './ver-recepcion-transporte/ver-recepcion-transporte.component';
import { CrearRecepcionTransporteComponent } from './crear-recepcion-transporte/crear-recepcion-transporte.component';

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
  {
    path: 'ver-transporte',
    component: VerRecepcionTransporteComponent,
    data: { title: 'Ver-RecepcionTransporte' },
  },
  {
    path: 'crear-recepcion-transporte',
    component: CrearRecepcionTransporteComponent,
    data: { title: 'Crear-RecepcionTransporte' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BodegaExternaRoutingModule {}
