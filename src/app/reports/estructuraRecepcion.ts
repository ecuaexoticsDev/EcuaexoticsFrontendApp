import * as json from 'src/assets/json/imgBase64Logo.json';
import { Transporte } from '../models/transporte';

const ImgLogo = () => {
    return {
      image: json.imageLogo,
      width: 100,
      height: 80,
    };
  };
  
  export const HeaderControl = () => {
    return {
      stack: [
        ImgLogo(),
        {
          text: 'Bitacora de Transporte',
          bold: true,
          fontSize: 16,
          margin: [0, 5, 0, 0],
        },
        {
          text: 'Francisco Boloña 604 y la décima. Edificio Cedipe ',
          fontSize: 8,
        },
        { text: 'Phone: +593 4503-8248', fontSize: 8 },
        {
          text: 'www.ecuaexotics.com',
          fontSize: 8,
          color: '#058FBD',
          link: 'sales@ecuaexotics.com',
        },
        {
          text: 'sales@ecuaexotics.com',
          fontSize: 8,
          color: '#058FBD',
          link: 'sales@ecuaexotics.com',
        },
      ],
      alignment: 'center',
    };
  };

  export const DetailControl = (controlObject: any) => {
    return {
      columns: [Column1(controlObject), Column2(controlObject)],
      columnGap: 10,
    };
  };



  const Column1 = (controlObject: any) => {
    return {
      stack: [
       
        {
          text: [
            { text: 'Fecha: ', bold: true },
            { text: controlObject.fecha.split('T')[0] +' '+ controlObject.fecha.split('T')[1].split('.')[0] + '\n\n' },
          ],
        },
        {
          text: [{ text: 'Chofer: ', bold: true }, { text: controlObject.chofer+ '\n\n' }],
        },
        {
          text: [
            { text: 'Placa: ', bold: true },
            { text: controlObject.id_transporte.placa + '\n\n'},
          ],
        },
        {
          text: [
            { text: 'Nº de Gavetas: ', bold: true },
            { text: controlObject.num_gavetas +'\n\n' },
          ],
        },
        {
          text: [
            { text: 'Nº Gavetas Vacias Enviadas: ', bold: true },
            { text: controlObject.num_gavetas_enviadas+ '\n\n' },
          ],
        },
        {
          text: [
            { text: 'Kg Totales: ', bold: true },
            { text: controlObject.kg_totales + '\n\n'},
          ],
        },
      ],
      fontSize: 10,
      width: '50%',
      margin: [0, 15, 0, 0],
    };
  };

  const Column2 = (controlObject: any) => {
    return {
      stack: [
        {
          text: [
            { text: 'Nº Guía de Remisión: ', bold: true },
            { text: controlObject.num_guia_remision + '\n\n'},
          ],
        },
        {
          text: [
            { text: 'Nº Sello de Ingreso: ', bold: true },
            { text: controlObject.num_sello_ingreso + '\n\n'},
          ],
        },
        {
          text: [
            { text: 'Nº Sello de Salida: ', bold: true },
            { text: controlObject.num_sello_salida + '\n\n'},
          ],
        },
      ],
      fontSize: 10,
      width: '50%',
      margin: [0, 15, 0, 0],
    };
  };

  export const productores = (controlObject: any) => {
    let lineaProductores: string = ''
    let cont = 1
    controlObject.productores.forEach((productor: string) => {
      if (cont < controlObject.productores.length){
        lineaProductores += productor +', '
      }else{
        lineaProductores += productor +'.'
      }
      cont++;
    });
    return {
      stack: [
        { text: 'Productores: ', bold: true },
        {
          text: lineaProductores,
          alignment: '‘justify',
          margin: [0, 8, 0, 0],
        },
      ],
      fontSize: 10,
      margin: [0, 25, 0, 0],
    };
  };

  export const LoadImages = (controlObject: any) => {
    let stackList = [];
    if (controlObject.images.length > 0) {
      let column: any = [];
      for (const img of controlObject.images) {
        const dataOb = {
          stack: [
            {
              image: img.imagen,
              width: 150,
            },
          ],
          width: '33%',
        };
        column.push(dataOb);
      }
  
      let newArray: any = [];
      for (let i = 0; i < column.length; i += 3) {
        let pedazo = column.slice(i, i + 3);
        newArray.push(pedazo);
      }
      for (const nArray of newArray) {
        stackList.push({
          columns: nArray,
          columnGap: 10,
          margin: [0, 20, 0, 0],
        });
      }
    }
    return { stack: stackList, margin: [0, 15, 0, 0] };
  };