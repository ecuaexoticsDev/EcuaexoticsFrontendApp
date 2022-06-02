//modulos de angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//modulos de ngZorro
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';



//modulos propietarios
import { SharedModule } from '../shared/shared.module';
import { BodegaExternaModule } from './bodega-externa/bodega-externa.module';

//componentes propietarios
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './admin/dashboard.component';
import { ComponentsModule } from '../components/components.module';
import { PalletizadoModule } from './palletizado/palletizado.module';
import { AdminModule } from './admin/admin.module';




@NgModule({
  declarations: [PagesComponent, DashboardComponent],
  imports: [
    CommonModule,
    SharedModule,
    BodegaExternaModule,
    PagesRoutingModule,
    PalletizadoModule,
    AdminModule,
    NzLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NzPaginationModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    NzFormModule,
    NzModalModule,
    NzPopoverModule
  ],
  exports: [DashboardComponent],
})
export class PagesModule {}
