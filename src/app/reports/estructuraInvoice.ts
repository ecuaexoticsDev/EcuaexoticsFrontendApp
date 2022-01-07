import * as json from 'src/assets/json/imgBase64Logo.json';

const ImgLogo = () => {
  return {
    image: json.imageLogo,
    width: 100,
    height: 80,
  };
};

export const HeaderInvoice = () => {
  return {
    stack: [
      ImgLogo(),
      {
        text: 'Commercial Invoice',
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

export const DetailInvoice = (infoCliente: any, invoice: any) => {
  return {
    columns: [ColumnConsignee(infoCliente), Column2(invoice), Column3(invoice)],
    columnGap: 10,
  };
};

const ColumnConsignee = (infoCliente: any) => {
  return {
    stack: [
      {
        text: 'Consignee: ',
        bold: true,
      },
      {
        text: infoCliente.nombre,
      },
      {
        text: infoCliente.direccion,
      },
      {
        text: infoCliente.destino_orden,
      },
    ],
    fontSize: 10,
    width: '45%',
    margin: [0, 15, 0, 0],
  };
};

const Column2 = (invoice: any) => {
  return {
    stack: [
      {
        text: [{ text: 'Date: ', bold: true }, { text: invoice.factura.fecha }],
      },
      {
        text: [
          { text: 'Export Reference: ', bold: true },
          { text: invoice.factura.referencia_exportacion },
        ],
      },
      {
        text: [
          { text: 'Country of origin: ', bold: true },
          { text: 'Ecuador' },
        ],
      },
    ],
    fontSize: 10,
    width: '35%',
    margin: [0, 15, 0, 0],
  };
};

const Column3 = (invoice: any) => {
  return {
    stack: [
      {
        text: [
          { text: 'Fact ', bold: true },
          { text: invoice.factura.factura_num },
        ],
      },
    ],
    fontSize: 10,
    width: '20%',
    margin: [0, 15, 0, 0],
  };
};

export const TablaInformacion = (invoice: any) => {
  let listItems: any = new Array();
  listItems.push([
    {
      text: 'TYPE',
      alignment: 'center',
      fillColor: '#EEEFEF',
      color: '#000000',
    },
    {
      text: 'PRODUCT DESCRIPTION',
      alignment: 'center',
      fillColor: '#EEEFEF',
      color: '#000000',
    },
    {
      text: 'QUANTITY',
      alignment: 'center',
      fillColor: '#EEEFEF',
      color: '#000000',
    },
    {
      text: 'UNIT VALUE',
      alignment: 'center',
      fillColor: '#EEEFEF',
      color: '#000000',
    },
    {
      text: 'SUBTOTAL',
      alignment: 'center',
      fillColor: '#EEEFEF',
      color: '#000000',
    },
  ]);
  for (const ti of invoice.items_tipo_pitahaya) {
    if (ti.items_tipo_caja.length > 0) {
      for (const item of ti.items_tipo_caja) {
        if (item.id_item_factura > 0) {
          let subCalc = item.cantidad * item.precio_caja;
          listItems.push([
            {
              text: item.tipo,
              alignment: 'center',
              border: [true, false, true, false],
            },
            {
              text: item.descripcion_producto,
              alignment: 'center',
              border: [true, false, true, false],
            },
            {
              text: item.cantidad,
              alignment: 'center',
              border: [true, false, true, false],
            },
            {
              text: '$  ' + item.precio_caja,
              alignment: 'center',
              border: [true, false, true, false],
            },
            {
              text: '$  ' + Number(subCalc).toFixed(2),
              alignment: 'center',
              border: [true, false, true, false],
            },
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
      border: [true, false, true, true],
    },
    {
      text: '',
      border: [false, false, false, true],
    },
    {
      text: '',
      border: [true, false, false, true],
    },
    {
      text: '',
      border: [true, false, true, true],
    },
  ]);
  let subtotalRow = [
    { text: '', colSpan: 3, border: [false, false, false, false] },
    {},
    {},
    {
      text: 'Subtotal',
      alignment: 'center',
      bold: true,
      border: [true, true, true, false],
    },
    {
      text: '$  ' + invoice.factura.subtotal,
      alignment: 'center',
    },
  ];
  let impCal: any = 0;
  if (invoice.factura.impuesto == 0.0) {
    impCal = '-';
  }
  let impuestoRow = [
    { text: '', colSpan: 3, border: [false, false, false, false] },
    {},
    {},
    {
      text: 'Tax',
      alignment: 'center',
      bold: true,
      border: [true, false, true, false],
    },
    {
      text: '$  ' + impCal,
      alignment: 'center',
    },
  ];

  let totalRow = [
    { text: '', colSpan: 3, border: [false, false, false, false] },
    {},
    {},
    {
      text: 'Total',
      alignment: 'center',
      bold: true,
      border: [true, false, true, true],
    },
    {
      text: '$  ' + invoice.factura.total,
      alignment: 'center',
    },
  ];
  listItems.push(subtotalRow, impuestoRow, totalRow);
  const table = {
    stack: [
      {
        table: {
          widths: [150, 150, '*', '*', '*'],
          body: listItems,
        },
      },
    ],
    fontSize: 8,
    margin: [0, 30, 0, 0],
  };
  return table;
};

export const infoBank = () => {
  return {
    stack: [
      { text: 'Bank Details', bold: true, margin: [30, 0, 0, 0] },
      {
        text: [
          { text: 'Beneficiary name: ', bold: true },
          { text: 'SBD CIA LTDA' },
        ],
      },
      {
        text: [
          { text: 'Bank: ', bold: true },
          { text: 'Banco Pichincha (Ecuador)' },
        ],
      },
      {
        text: [
          { text: 'Account number: ', bold: true },
          { text: '2100087523' },
        ],
      },
      {
        text: [{ text: 'Swift code: ', bold: true }, { text: 'PICHECEQ' }],
      },
      {
        text: [
          { text: 'Address: ', bold: true },
          { text: 'Avda. Amazonas y Pereira (Quito - Ecuador)' },
        ],
      },
    ],
    fontSize: 10,
    margin: [0, 25, 0, 0],
  };
};
