import * as json from 'src/assets/json/imgBase64Logo.json';

const ImgLogo = () => {
  return {
    image: json.imageLogo,
    width: 100,
    height: 80,
  };
};

export const HeaderLiquidacion = () => {
  return {
    stack: [
      ImgLogo(),
      { text: 'Packing List', bold: true, fontSize: 16, margin: [0, 5, 0, 0] },
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

export const DetailPacking = (infoCliente: any, packing: any) => {
  return {
    columns: [ColumnConsignee(infoCliente, packing), ColumnFact(packing)],
    columnGap: 10,
  };
};

const ColumnConsignee = (infoCliente: any, packing: any) => {
  return {
    stack: [
      {
        text: [
          { text: 'Consignee: ', bold: true },
          { text: infoCliente.nombre },
        ],
      },
      {
        text: [
          { text: 'Address: ', bold: true },
          { text: infoCliente.direccion + ' \n\n' },
        ],
      },
      {
        text: infoCliente.email,
        color: '#058FBD',
        link: infoCliente.email,
      },
      {
        text: [{ text: 'Phone: ', bold: true }, { text: infoCliente.telefono }],
      },
      {
        text: [{ text: 'Notify: ', bold: true }, { text: infoCliente.notify }],
      },
      {
        text: [
          { text: 'Notify Address: ', bold: true },
          { text: infoCliente.notify_address },
        ],
      },
      // {
      //   text: 'air@customizedbrokers.net',
      //   color: '#058FBD',
      //   link: 'air@customizedbrokers.net',
      // },
      // {
      //   text: 'nilda.soler@crowley.com',
      //   color: '#058FBD',
      //   link: 'nilda.soler@crowley.com',
      // },
      { text: '1 (305) 471 8989' },
      {
        text: [
          { text: 'Destination: ', bold: true },
          { text: infoCliente.destino_orden },
        ],
      },
      {
        text: [{ text: 'Sent From: ', bold: true }, { text: 'SBD Cia Ltda' }],
      },
      {
        text: [
          { text: 'Packed: ', bold: true },
          { text: 'Ecuaexotics Km. 61 Via a la Costa' },
        ],
      },
      {
        text: [
          { text: 'Packing List No: ', bold: true },
          { text: packing.packing.packing_num },
        ],
      },
      {
        text: [
          { text: 'Shipping Date: ', bold: true },
          { text: packing.packing.fecha },
        ],
      },
    ],
    fontSize: 10,
    width: '70%',
    margin: [0, 15, 0, 0],
  };
};

const ColumnFact = (packing: any) => {
  return {
    stack: [
      { text: 'Fact ' + packing.packing.factura_num, bold: true, fontSize: 13 },
      {
        text: 'Carrier: ' + packing.packing.linea_area + '\n\n',
        bold: true,
        fontSize: 13,
      },
      {
        text: [
          { text: 'AWB/BL: ', bold: true },
          { text: packing.packing.awb + ' \n\n\n' },
        ],
        fontSize: 11,
      },
      { text: 'FDA Number', bold: true, fontSize: 11 },
      { text: '12758155112', fontSize: 11 },
    ],
    width: '30%',
    margin: [0, 25, 0, 0],
  };
};

export const TablaInformacion = (packing: any) => {
  let listItems: any = new Array();
  listItems.push([
    {
      text: 'PRODUCT DESCRIPTION',
      alignment: 'center',
      fillColor: '#EEEFEF',
      color: '#000000',
    },
    {
      text: 'TOTAL BOXES',
      alignment: 'center',
      fillColor: '#EEEFEF',
      color: '#000000',
    },
    {
      text: 'NET WEIGHT',
      alignment: 'center',
      fillColor: '#EEEFEF',
      color: '#000000',
    },
    {
      text: 'UND',
      alignment: 'center',
      fillColor: '#EEEFEF',
      color: '#000000',
    },
  ]);
  for (const ti of packing.items_tipo_pitahaya) {
    if (ti.items_tipo_caja.length > 0) {
      const itemTipoPita = [
        {
          text: ti.tipo_pitahaya,
          fontSize: 9,
          bold: true,
          alignment: 'center',
          border: [true, false, true, false],
        },
        {
          text: ti.cantidad_tipo,
          bold: true,
          alignment: 'center',
          border: [true, false, true, false],
        },
        {
          text: ti.pesoNetoByPitahaya,
          bold: true,
          alignment: 'center',
          border: [true, false, true, false],
        },
        {
          text: 'KG',
          bold: true,
          alignment: 'center',
          border: [true, false, true, false],
        },
      ];
      listItems.push(itemTipoPita);
      for (const itemCaja of ti.items_tipo_caja) {
        listItems.push([
          {
            text: itemCaja.tipo_caja,
            alignment: 'center',
            bold: true,
            border: [true, false, true, false],
          },
          { text: '', border: [true, false, true, false] },
          { text: '', border: [true, false, true, false] },
          { text: '', border: [true, false, true, false] },
        ]);
        for (const item of itemCaja.calibres) {
          listItems.push([
            {
              text: 'Size ' + item.calibre,
              alignment: 'center',
              border: [true, false, true, false],
            },
            {
              text: item.num_cajas,
              alignment: 'center',
              border: [true, false, true, false],
            },
            { text: '', border: [true, false, true, false] },
            { text: '', border: [true, false, true, false] },
          ]);
        }
      }
    }
    listItems.push([
      {
        text: '',
        border: [true, false, true, false],
      },
      {
        text: '',
        border: [true, false, true, false],
      },
      {
        text: '',
        border: [true, false, true, false],
      },
      {
        text: '',
        border: [true, false, true, false],
      },
    ]);
  }
  listItems.push([
    {
      text: '',
      border: [true, false, true, true],
    },
    {
      text: '',
      border: [true, false, true, false],
    },
    {
      text: '',
      border: [false, false, false, true],
    },
    {
      text: '',
      border: [true, false, true, true],
    },
  ]);
  listItems.push([
    {
      text: 'TOTAL',
      alignment: 'center',
      bold: true,
      border: [false, false, false, false],
    },
    {
      text: packing.packing.cantidad,
      alignment: 'center',
      bold: true,
    },
    {
      text: packing.packing.total_peso,
      alignment: 'center',
      bold: true,
    },
    {
      text: 'KG',
      alignment: 'center',
      bold: true,
    },
  ]);
  const table = {
    stack: [
      {
        table: {
          widths: [200, '*', '*', '*'],
          body: listItems,
        },
      },
    ],
    fontSize: 8,
    margin: [0, 30, 0, 0],
  };
  return table;
};

export const infoExtra = (packing: any) => {
  return {
    stack: [
      {
        text: [
          { text: 'Special Information:  ', bold: true },
          { text: packing.packing.informacion_extra },
        ],
        alignment: 'justify',
      },
    ],
    fontSize: 10,
    margin: [0, 25, 0, 0],
  };
};
