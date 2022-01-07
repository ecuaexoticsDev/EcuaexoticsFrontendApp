import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

//modulos de ngzorro
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
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzModalModule } from 'ng-zorro-antd/modal';

//modulos propietarios
import { CalibradoRoutingModule } from './calibrado.routing';
import { VerRegistrosComponent } from './verRegistros/ver-registros/ver-registros.component';
import { RegistrarCalibradoComponent } from './registrar-calibrado/registrar-calibrado.component';

// Icon FontAwesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ControlCalidadComponent } from './control-calidad/control-calidad.component';

@NgModule({
  declarations: [VerRegistrosComponent, RegistrarCalibradoComponent, ControlCalidadComponent],
  imports: [
    CommonModule,
    CalibradoRoutingModule,
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
    NzTabsModule,
    NzModalModule,
    FontAwesomeModule,
  ],
})
export class CalibradoModule {}
