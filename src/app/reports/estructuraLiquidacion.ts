import * as json from 'src/assets/json/imgBase64Logo.json';

const ImgLogo = () => {
  return {
    image: json.imageLogo,
    width: 100,
    height: 80,
  };
};

export const HeaderLiquidacion = (num_liquidacion: string) => {
  return {
    columns: [
      ImgLogo(),
      {
        stack: [
          { text: 'SBD CIA. LTDA.', fontSize: 12, bold: true },
          { text: 'Cdla. Kennedy Vieja s/n', fontSize: 10 },
          {
            text: 'Edificio: C.C. Comercial Las Vitrinas piso 1, oficina 65',
            fontSize: 10,
          },
          { text: 'Guayaquil, Ecuador', fontSize: 10 },
          { text: '04 2280360 - 04 2097468 - 09 97803339', fontSize: 10 },
          {
            text: 'sales@ecuaexotics.com',
            color: '#058FBD',
            link: 'sales@ecuaexotics.com',
            fontSize: 10,
          },
        ],
        width: 'auto',
      },
      {
        stack: [
          { text: 'LIQUIDACION', color: '#06C581', fontSize: 12, bold: true },
          {
            text: [
              {
                text: 'No. \t',
                color: '#06C581',
                // margin: [0, 0, 45, 0],
              },
              { text: num_liquidacion },
            ],
            fontSize: 10,
          },
        ],
        alignment: 'right',
        width: '20%',
      },
    ],
    columnGap: 30,
  };
};

export const LineHorizontal = () => {
  return {
    canvas: [
      {
        type: 'line',
        color: '#06C581',
        x1: 0,
        y1: 0,
        x2: 515,
        y2: 0,
        lineWidth: 1,
      },
    ],
    margin: [0, 20, 0, 20],
  };
};

export const InfoLiquidacion = (productor: string, liquidacion: any) => {
  let calibradoObject = liquidacion.calibrado;
  return {
    stack: [
      {
        text: [{ text: 'Proveedor: ', bold: true }, { text: productor }],
      },
      {
        text: [
          { text: 'Direccion: ', bold: true },
          { text: calibradoObject.direccion },
        ],
      },
      {
        text: [
          { text: 'Fecha: ', bold: true },
          { text: calibradoObject.fecha_pago },
        ],
      },
      {
        text: [
          { text: 'Destino: ', bold: true },
          { text: calibradoObject.destino },
        ],
      },
    ],
    fontSize: 10,
  };
};

export const TablaInformacion = (liquidacion: any) => {
  let subtotalSum = 0;
  let listItems: any = new Array();
  listItems.push([
    {
      text: 'Detalle',
      alignment: 'center',
      fillColor: '#EEEFEF',
      color: '#000000',
    },
    {
      text: 'Cajas',
      alignment: 'center',
      fillColor: '#EEEFEF',
      color: '#000000',
    },
    {
      text: 'KG',
      alignment: 'center',
      fillColor: '#EEEFEF',
      color: '#000000',
    },
    {
      text: 'P. Unitario',
      alignment: 'center',
      fillColor: '#EEEFEF',
      color: '#000000',
    },
    {
      text: 'Valor total',
      alignment: 'center',
      fillColor: '#EEEFEF',
      color: '#000000',
    },
  ]);
  const itemTipoPita = [
    {
      text: liquidacion.calibrado.tipo_pitahaya,
      alignment: 'center',
      border: [true, false, true, false],
    },
    { text: '', border: [false, false, false, false] },
    { text: '', border: [false, false, false, false] },
    { text: '', border: [false, false, false, false] },
    { text: '', border: [true, false, true, false] },
  ];
  listItems.push(itemTipoPita);
  for (const ti of liquidacion.tipos) {
    const tipoSplit = ti.tipo.split(' ');
    const itemTipoCaja = [
      {
        text: tipoSplit[0] + ' ' + tipoSplit[1] + ' ' + tipoSplit[2],
        border: [true, false, true, false],
        alignment: 'center',
      },
      { text: '', border: [false, false, false, false] },
      { text: '', border: [false, false, false, false] },
      { text: '', border: [false, false, false, false] },
      { text: '', border: [true, false, true, false] },
    ];
    listItems.push(itemTipoCaja);
    for (const it of ti.items) {
      let totalUnit = it.kg * it.precio;
      subtotalSum += totalUnit;
      const itemTipoCaja = [
        {
          text: it.calibre,
          alignment: 'center',
          border: [true, false, true, false],
        },
        {
          text: it.num_cajas,
          alignment: 'center',
          border: [false, false, false, false],
        },
        {
          text: it.kg,
          alignment: 'center',
          border: [false, false, false, false],
        },
        {
          text: '$  ' + it.precio,
          alignment: 'center',
          border: [false, false, false, false],
        },
        {
          text: '$  ' + Number(totalUnit).toFixed(2),
          alignment: 'center',
          border: [true, false, true, false],
        },
      ];
      listItems.push(itemTipoCaja);
    }
  }
  listItems.push([
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
      border: [false, false, false, true],
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

  const ivaCal = (subtotalSum * liquidacion.calibrado.iva) / 100;
  const totalCal = subtotalSum + ivaCal;
  const rowSutotal = [
    { text: '', colSpan: 3, border: [false, false, false, false] },
    {},
    {},
    {
      text: 'Subtotal',
      alignment: 'center',
      // fillColor: '#27466B',
      // color: '#FFFFFF',
    },
    {
      text: '$  ' + Number(subtotalSum).toFixed(2),
      alignment: 'center',
      // fillColor: '#27466B',
      // color: '#FFFFFF',
    },
  ];
  const rowIva = [
    { text: '', colSpan: 3, border: [false, false, false, false] },
    {},
    {},
    {
      text: 'IVA',
      alignment: 'center',
      // fillColor: '#27466B',
      // color: '#FFFFFF',
    },
    {
      text: '$  ' + Number(ivaCal).toFixed(2),
      alignment: 'center',
      // fillColor: '#27466B',
      // color: '#FFFFFF',
    },
  ];
  const rowTotal = [
    { text: '', colSpan: 3, border: [false, false, false, false] },
    {},
    {},
    {
      text: 'Total',
      alignment: 'center',
      // fillColor: '#27466B',
      // color: '#FFFFFF',
    },
    {
      text: '$  ' + Number(totalCal).toFixed(2),
      alignment: 'center',
      // fillColor: '#27466B',
      // color: '#FFFFFF',
    },
  ];
  listItems.push(rowSutotal, rowIva, rowTotal);

  const table = {
    stack: [
      {
        table: {
          widths: [150, '*', '*', '*', '*'],
          body: listItems,
        },
      },
    ],
    fontSize: 8,
    margin: [0, 30, 0, 0],
  };
  return table;
};
