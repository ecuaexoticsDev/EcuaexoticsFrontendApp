import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiDocumentos } from 'src/app/config/api-documentos';
import { consolidado } from 'src/app/interfaces/Consolidado';
import { Productor } from '../../models/productor';
import * as FileSaver  from 'file-saver';
import * as XLSX from 'xlsx'

const EXCEL_TYPE = 
'appication/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ConsolidadoService {

  constructor(private http: HttpClient ) { }
  
  exportToExcel(json:any[], excelFileName:string):void{
      const worksheet : XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
      const workbook: XLSX.WorkBook = {
        Sheets: {'data': worksheet},
        SheetNames: ['data']
      };
      const excelBuffer: any = XLSX.write(workbook,{bookType:'xlsx', type: 'array'})
      this.saveAsExcel(excelBuffer, excelFileName)
      
  }

  private saveAsExcel(buffer:any, fileName:string):void{
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
      FileSaver.saveAs(data,fileName +'_'+new Date().toISOString().slice(0,10) + EXCEL_EXT )
  }
  

  /**
   * Aplica los filtros fecha , productor y lote para generar consolidado
   * @param id_productor 
   * @param fechas 
   * @param lote 
   */
  cargarConsolidado( fechas: Date[], lote:number ,id_productor:number, fruta:string  ){  

    let url : string
    let fechaInicio : string
    let fechaFin : string
    let loteid: string|number  = 'None'
    let id: string|number = 'None'
    let tipoFruta: string|number = 'None'

   if (lote!= null && lote != undefined  ) {
     loteid= lote
   }if (id_productor != null && id_productor != undefined ) {
    id = id_productor
   }
   if (fruta != null && fruta != undefined ) {
    tipoFruta = fruta
   }
   //agregar el tipo de fruta al final 
  if (fechas.length>0) {
      fechaInicio = fechas[0].toISOString().slice(0,10)
      fechaFin= fechas[1].toISOString().slice(0,10)
        url = ApiDocumentos.obtener_consolidado + `${fechaInicio}/${fechaFin}/${loteid}/${id}/${tipoFruta}/`
  }else if(fechas.length==0 && lote== null && id_productor == null  && fruta == null  ){
    url = ApiDocumentos.obtener_consolidado
  }
  else{
     //agregar el tipo de fruta al final 
      url = ApiDocumentos.obtener_consolidado + `None/None/${loteid}/${id}/${tipoFruta}/`
  }
    return this.http.get<consolidado[]>(url)
  }

}
