import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductoresComponent } from "./productores/productores.component";
import { AdminRoutingModule } from "./admin.routing";
import { ClientesComponent } from "./clientes/clientes.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { VerProductorComponent } from "./productores/ver-productor/ver-productor.component";
import { VerClienteComponent } from "./clientes/ver-cliente/ver-cliente.component";
import { InvoceComponent } from "./clientes/invoce/invoce.component";
import { PackingListComponent } from "./clientes/packing-list/packing-list.component";
import { LiquidacionComponent } from "./productores/liquidacion/liquidacion.component";
import { TransporteComponent } from "./transporte/transporte.component";
import { VerTransporteComponent } from "./transporte/ver-transporte/ver-transporte.component";
import { ConsolidadoComponent } from "./analitica/consolidado/consolidado.component";
import { GraficosComponent } from "./analitica/graficos/graficos.component";
import { TipoPitahayaPipe } from "src/app/pipes/tipo-pitahaya.pipe";
import { BodegaComponent } from "./analitica/bodega/bodega.component";

//Modulos de ng-zorro
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzTableModule } from "ng-zorro-antd/table";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzPopconfirmModule } from "ng-zorro-antd/popconfirm";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzCardModule } from "ng-zorro-antd/card";

//pipes

@NgModule({
  declarations: [
    TipoPitahayaPipe,
    ProductoresComponent,
    ClientesComponent,
    UsuariosComponent,
    VerProductorComponent,
    VerClienteComponent,
    InvoceComponent,
    PackingListComponent,
    LiquidacionComponent,
    TransporteComponent,
    VerTransporteComponent,
    ConsolidadoComponent,
    GraficosComponent,
    BodegaComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
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
    NzFormModule,
    FormsModule,
    NzModalModule,
    NzDropDownModule,
    ReactiveFormsModule,
    NzTabsModule,
    NzDatePickerModule,
    NzCardModule,
  ],
})
export class AdminModule {}
