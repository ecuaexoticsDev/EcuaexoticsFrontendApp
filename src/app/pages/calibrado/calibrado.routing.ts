import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlCalidadComponent } from './control-calidad/control-calidad.component';
import { RegistrarCalibradoComponent } from './registrar-calibrado/registrar-calibrado.component';
import { VerRegistrosComponent } from './verRegistros/ver-registros/ver-registros.component';

const routes: Routes = [
  {
    path: 'ver-calibrado',
    component: VerRegistrosComponent,
    data: { title: 'Área de Calibre' },
  },
  {
    path: 'crear-calibrado',
    component: RegistrarCalibradoComponent,
    data: { title: 'Registro Calibre' },
  },
  {
    path: 'control-calidad',
    component: ControlCalidadComponent,
    data: { title: 'Control Calidad' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalibradoRoutingModule {}
