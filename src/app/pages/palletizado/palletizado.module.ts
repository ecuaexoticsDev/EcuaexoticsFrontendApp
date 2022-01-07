import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPalletsComponent } from './controlPallets/control-pallets.component';
import { VerItemsComponent } from './ver-items/ver-items.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms'; //para editar las tablas 

//modulos de ngZorro
import { NzButtonModule } from 'ng-zorro-antd/button';
import { PalletizadoRoutingModule } from './palletizado.routing';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSelectModule } from 'ng-zorro-antd/select';

//ng zorro modules
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ControlPalletsComponent,
    VerItemsComponent,

  ],
  imports: [
    CommonModule,
    NzButtonModule,
    PalletizadoRoutingModule,
    ComponentsModule,
    NzIconModule,
    NzDividerModule,
    NzPopconfirmModule,
    NzInputModule,
    NzTableModule,
    FormsModule,
    NzSelectModule,
    NzFormModule,
    NzModalModule,
    ReactiveFormsModule
  ]
})
export class PalletizadoModule { }
