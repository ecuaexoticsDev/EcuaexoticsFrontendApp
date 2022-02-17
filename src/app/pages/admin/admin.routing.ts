import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductoresComponent } from './productores/productores.component';
import { ClientesComponent } from './clientes/clientes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { DashboardComponent } from './dashboard.component';
import { VerProductorComponent } from './productores/ver-productor/ver-productor.component';
import { VerClienteComponent } from './clientes/ver-cliente/ver-cliente.component';
import { InvoceComponent } from './clientes/invoce/invoce.component';
import { PackingListComponent } from './clientes/packing-list/packing-list.component';
import { LiquidacionComponent } from './productores/liquidacion/liquidacion.component';
import { TransporteComponent } from './transporte/transporte.component';
import { VerTransporteComponent } from './transporte/ver-transporte/ver-transporte.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { title: 'dashboard' },
  },
  {
    path: 'productores',
    component: ProductoresComponent,
    data: { title: 'Productores' },
  },
  {
    path: 'productores/ver-productor/:id',
    component: VerProductorComponent,
    data: { title: 'ver-productor' },
  },
  {
    path: 'productores/ver-productor/:id/liquidacion/:idLiq',
    component: LiquidacionComponent,
    data: { title: 'ver-liquidacion' },
  },
  {
    path: 'clientes',
    component: ClientesComponent,
    data: { title: 'Clientes' },
  },
  {
    path: 'clientes/ver-cliente/:id',
    component: VerClienteComponent,
    data: { title: 'ver-cliente' },
  },
  {
    path: 'clientes/ver-cliente/:id/invoice/:idInv',
    component: InvoceComponent,
    data: { title: 'Invoce' },
  },
  {
    path: 'clientes/ver-cliente/:id/packing-list/:idPack',
    component: PackingListComponent,
    data: { title: 'PackingList' },
  },
 
  {
    path: 'usuarios',
    component: UsuariosComponent,
    data: { title: 'Usuarios' },
  },
  {
    path: 'transporte',
    component: TransporteComponent,
    data: { title: 'Transporte' },
  },
  {
    path: 'transporte/ver-transporte/:id',
    component: VerTransporteComponent,
    data: { title: 'ver-transporte' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
