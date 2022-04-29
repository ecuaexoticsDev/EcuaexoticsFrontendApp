import * as json from 'src/assets/json/imgBase64Logo.json';

const ImgLogo = () => {
  return {
    image: json.imageLogo,
    width: 100,
    height: 80,
  };
};

export const HeaderPaletizado = () => {
  return {
    stack: [
      ImgLogo(),
      { text: 'Palletizado', bold: true, fontSize: 16, margin: [0, 5, 0, 0] },
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

export const ItemPalletColums = (palletizado: any)=> {

    let stackList = [];
    //creo la columna habra 3 pallets por hojas
    let column : any  = []
    
    palletizado.pallets.forEach( (palet:any) => {
        
        const objPallet = {
            style: 'tableExample',
			color: '#444',
            table: {
                widths: ['*', 'auto','auto'],
				headerRows: 1,
                body: [
                    //[{text: `Pallet ${palletizado.pallets.indexOf(palet) + 1} `, style: 'tableHeader', colSpan: 1, alignment: 'center'},{}],
                    //[{text: `Cliente`,}, {text:`${palet.cliente.nombre}`, }],
                    //[{text: `Tipo`,}, {text:`${palet.tipo_pitahaya}`, }],
                    [{text: `Productor`}, {text:`Cajas`}, {text:`Calibre`}],
                   
                    
					
				]
            },
            width: '33%',
        }
        column.push(objPallet);
    });
    /*
     palet.forEach((item:any) => {
                        [{text: `${item.productor.nombre}`,}, {text:`${item.num_cajas}`}, {text:`${item.calibre}`}]
                    })
    */

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
    return { stack: stackList, margin: [0, 15, 0, 0] };
};