import * as json from 'src/assets/json/imgBase64Logo.json';

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
          text: 'Bitacora del Proceso',
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

  export const DetailControl = (controlObject: any, productor: any, vacias: any, rechazo:any) => {
    return {
      columns: [Column1(controlObject, productor, vacias, rechazo), Column2(controlObject)],
      columnGap: 10,
    };
  };



  const Column1 = (controlObject: any, productor: any, vacias: any, rechazo:any) => {
    return {
      stack: [
        {text: 'Datos del Proceso \n\n', 
        style: 'header',
        bold: true,
        fontSize: 12,
        alignment: 'center'},
        {
          text: [
            { text: 'Fecha: ', bold: true },
            { text: controlObject.fecha.split('T')[0] +' '+ controlObject.fecha.split('T')[1].split('.')[0] + '\n\n' },
          ],
        },
        {
          text: [{ text: 'Productor: ', bold: true }, { text: productor + '\n\n' }],
        },
        {
          text: [
            { text: 'Tipo de Pitahaya: ', bold: true },
            { text: controlObject.tipo_pitahaya + '\n\n'},
          ],
        },
        {
          text: [
            { text: 'Nº Gavetas Recibidas: ', bold: true },
            { text: controlObject.num_gavetas +'\n\n' },
          ],
        },
        {
          text: [
            { text: 'Nº Gavetas de Rechazo: ', bold: true },
            { text: rechazo+ '\n\n' },
          ],
        },
        {
          text: [
            { text: 'Nº Gavetas Vacias Enviadas: ', bold: true },
            { text: vacias + '\n\n'},
          ],
        },
        {
          text: [
            { text: 'Kg Reportados: ', bold: true },
            { text: controlObject.kg_reportados + '\n\n'},
          ],
        },
        {
          text: [
            { text: 'Kg Recibidos: ', bold: true },
            { text: controlObject.kg_recibidos  + '\n\n'},
          ],
        },
        {
          text: [
            { text: 'Personal de Descarga: ', bold: true },
            { text: controlObject.personal_descarga  + '\n\n'},
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

        {text: 'Transporte \n\n',
         style: 'header',
        bold: true,
        fontSize: 12,
        alignment: 'center'},
        {
          text: [
            { text: 'Nombre de Chofer: ', bold: true },
            { text: controlObject.id_recepcion.chofer + '\n\n' },
          ],
        },
        {
          text: [
          { text: 'Placa: ', bold: true }, 
          { text: controlObject.id_recepcion.placa + '\n\n' }],
        },
        {
          text: [
            { text: 'Nº Guía de Remisión: ', bold: true },
            { text: controlObject.id_recepcion.num_guia_remision + '\n\n'},
          ],
        },
        {
          text: [
            { text: 'Nº Sello de Ingreso: ', bold: true },
            { text: controlObject.id_recepcion.num_sello_ingreso + '\n\n'},
          ],
        },
        {
          text: [
            { text: 'Nº Sello de Salida: ', bold: true },
            { text: controlObject.id_recepcion.num_sello_salida + '\n\n'},
          ],
        },
      ],
      fontSize: 10,
      width: '50%',
      margin: [0, 15, 0, 0],
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