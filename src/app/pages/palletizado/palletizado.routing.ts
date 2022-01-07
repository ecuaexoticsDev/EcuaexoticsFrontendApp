import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlPalletsComponent } from './controlPallets/control-pallets.component';
import { VerItemsComponent } from './ver-items/ver-items.component';


const routes: Routes = [
  {
    path: 'control-palletizado',
    component: ControlPalletsComponent,
    data: { title: 'Control de Palletizado' },
  },
  {
    path: 'ver-palletizado/:id',
    component: VerItemsComponent,
    data: { title: 'Items del Pallet' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PalletizadoRoutingModule {}
