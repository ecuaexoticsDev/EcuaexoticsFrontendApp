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
        text: 'Control de Calidad',
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

export const DetailControl = (controlObject: any, productor: any) => {
  return {
    columns: [Column1(controlObject, productor), Column2(controlObject)],
    columnGap: 10,
  };
};

const Column1 = (controlObject: any, productor: any) => {
  return {
    stack: [
      {
        text: [{ text: 'Productor: ', bold: true }, { text: productor }],
      },
      {
        text: [
          { text: 'Fecha: ', bold: true },
          { text: controlObject.fecha.split('T')[0] },
        ],
      },
      {
        text: [
          { text: 'Nº Lote: ', bold: true },
          { text: controlObject.num_lote },
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
          { text: 'Nº Gavetas de Ingreso : ', bold: true },
          { text: controlObject.num_gavetas },
        ],
      },
      {
        text: [
          { text: 'Tipo de pitahaya: ', bold: true },
          { text: controlObject.tipo_pitahaya },
        ],
      },
      {
        text: [
          { text: 'Nº Gavetas de Rechazo : ', bold: true },
          { text: controlObject.num_gav_rechazo },
        ],
      },
      {
        text: [
          { text: 'Peso Total (KG) : ', bold: true },
          { text: controlObject.peso_total },
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

// const convertImgToBase64 = (url: string) =>
//   fetch(url)
//     .then((response) => response.blob())
//     .then(
//       (blob) =>
//         new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onloadend = () => resolve(reader.result);
//           reader.onerror = reject;
//           reader.readAsDataURL(blob);
//         })
//     );
export const causasRechazo = (controlObject: any) => {
  let lineaMotivos: string = ''
  let cont = 1
  controlObject.motivos.forEach((motivo: string) => {
    if (cont < controlObject.motivos.length){
      lineaMotivos += motivo +', '
    }else{
      lineaMotivos += motivo +'.'
    }
    cont++;
  });
  return {
    stack: [
      { text: 'Motivos de Rechazo: ', bold: true },
      {
        text: lineaMotivos,
        alignment: '‘justify',
        margin: [0, 8, 0, 0],
      },
    ],
    fontSize: 10,
    margin: [0, 25, 0, 0],
  };
};

export const infoObservacion = (controlObject: any) => {
  return {
    stack: [
      { text: 'Observaciones: ', bold: true },
      {
        text: controlObject.observacion,
        alignment: '‘justify',
        margin: [0, 8, 0, 0],
      },
    ],
    fontSize: 10,
    margin: [0, 25, 0, 0],
  };
};
