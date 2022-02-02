import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BodegaExternaRoutingModule } from './bodega-externa-routing.module';

//modulos de ngZorro
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { CrearBitacoraComponent } from './crear-bitacora/crear-bitacora.component';
import { VerBitacorasComponent } from './ver-bitacoras/ver-bitacoras.component';
// Icon FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [CrearBitacoraComponent, VerBitacorasComponent],
  imports: [
    CommonModule,
    BodegaExternaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NzButtonModule,
    NzTableModule,
    ScrollingModule,
    DragDropModule,
    NzDividerModule,
    NzPopconfirmModule,
    NzInputModule,
    NzIconModule,
    NzSelectModule,
    NzLayoutModule,
    FontAwesomeModule
  ],
})
export class BodegaExternaModule {}
