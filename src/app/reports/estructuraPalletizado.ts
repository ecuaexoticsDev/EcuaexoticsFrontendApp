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
      { text: 'Resumen Palletizado', bold: true, fontSize: 16, margin: [0, 5, 0, 0] },
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
    columns: [Column1(controlObject)],
    columnGap: 10,
  };
};
const Column1 = (controlObject: any) => {
  return {
    stack: [
      {
        text: [
          { text: 'Fecha: ', bold: true },
          { text: controlObject.fecha.split('T')[0]+' '},
        ],
      },
    ],
    fontSize: 10,
    width: '50%',
    margin: [0, 15, 0, 0],
  };
};

export const ItemPalletColums = (palletizado: any)=> {

    let stackList = [];
    //creo la columna habra 3 pallets por hojas
    let column : any  = []

    palletizado.pallets.forEach( (palet:any) => {
        let palletsArr: any= []
        palet.items.forEach((item:any) => {
          if (item.tipo_caja === 'Carton Box 4 kg net weight') {
            palletsArr.push(
              [{text: `${item.productor.nombre} ${item.productor.apellido}`,}, {text:`${item.num_cajas}`,alignment: 'center'}, {text:`${item.tipo_caja.slice(10,16)}`,alignment: 'center'}]
            )
          }else if (item.tipo_caja === 'Carton Box 12.7 kg net weight' || item.tipo_caja === 'Carton Box 10.9 kg net weight') {
            palletsArr.push(
              [{text: `${item.productor.nombre} ${item.productor.apellido}`,}, {text:`${item.num_cajas}`,alignment: 'center'}, {text:`${item.tipo_caja.slice(10,18)}`,alignment: 'center'}]
            )
          }else{
            palletsArr.push(
              [{text: `${item.productor.nombre} ${item.productor.apellido}`,}, {text:`${item.num_cajas}`,alignment: 'center'}, {text:`${item.tipo_caja.slice(10,17)}`,alignment: 'center'}]
            )
          }
             
         })
      
        const objPallet = {
          
		      	color: '#444',  
            table: {
                widths: ['auto', 'auto', 'auto'],
				        headerRows: 1,
                body: [
                    [{text: `Pallet ${palletizado.pallets.indexOf(palet) +1}`, bold: true, alignment: 'center', colSpan: 3},{},{}], 
                    [{text: `Cliente`,}, {text:`${palet.cliente.nombre}`, colSpan:2}, {}],
                    [{text: `Tipo`,}, {text:`${palet.tipo_pitahaya}` , colSpan:2}, {}],
                    [{text: `Productores`,bold: true, alignment: 'center'}, {text:`Cajas`,bold: true, alignment: 'center'},  {text:`Tipo`,bold: true, alignment: 'center'},],
                  ...palletsArr
                            					
				        ],
                
                
            },
            
            width: '33%',
        }
        column.push(objPallet);
    });
    

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