import { Component, OnInit } from '@angular/core';
import { palletizado } from 'src/app/interfaces/palletizado.interface';
import { PalletizadoService } from '../../services/palletizado/palletizado.service';
import Swal from 'sweetalert2';


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as reportStrcuture from 'src/app/reports/estructuraPalletizado';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public palletizado!: any;
  public cargando: boolean = true;

  constructor(private palletizadoService:PalletizadoService) {
    
  }

  ngOnInit(): void {
    this.cargarPalletizado();
  }

  cargarPalletizado(){
    this.palletizadoService.getPalletizado().subscribe(
      (resp:any)=>{
        this.palletizado = resp;
        console.log(resp);
        console.log(this.palletizado.pallets);
        this.cargando = false;
      }
    )
  }
  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


  //TODO: Aqui generar doc pdf de la tabla 
  async  generarDoc(){
    console.log('GenerarDoc');
   console.log(this.palletizado.pallets.length );

    if (this.palletizado.pallets.length  > 0) {
      Swal.fire({
        title: 'Generando Reporte de Palletizado...',
        didOpen: () => {
          Swal.showLoading();
        },
      });
      await this.delay(1000);
      let docDefinition: any = await {
        pageSize: 'A4',
        pageOrientation: 'landscape',
        content: [
          {
            stack: [
              reportStrcuture.HeaderPaletizado(),
              reportStrcuture.ItemPalletColums(this.palletizado)
            ],
            margin: [0, 0, 0, 0],
          },
        ],
      };
      Swal.close();
     pdfMake.createPdf(docDefinition).open();
    }else {
      Swal.close();
      Swal.fire(
        'Error',
        'No ha sido posible genenerar el reporte solicitado',
        'error'
      );
    }
  }

 
}
