export const initialState = [
  {
    id_bodega: null,
    tipo_caja: 'Caja 2.5',
    name_tipo_caja: 'Carton Box 2.5 kg net weight',
    calibres: [
      {
        id_caja: 0,
        calibre: 'C-5',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-6',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-7',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-8',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-9',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-10',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-11',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-12',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-13',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-14',
        cantidad: 0,
      },
    ],
  },
  {
    id_bodega: null,
    tipo_caja: 'Caja 4.5',
    name_tipo_caja: 'Carton Box 4.5 kg net weight',
    calibres: [
      {
        id_caja: 0,
        calibre: 'C-5',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-6',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-7',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-8',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-9',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-10',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-11',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-12',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-13',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-14',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-15',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-16',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-17',
        cantidad: 0,
      },
      {
        id_caja: 0,
        calibre: 'C-18',
        cantidad: 0,
      },
    ],
  },
];

export const getInitialStateCalibrado = () => {
  try {
    const calibradoStorage = localStorage.getItem('calibradoStorage') || '';
    if (calibradoStorage !== '') {
      return JSON.parse(calibradoStorage);
    } else {
      return initialState;
    }
  } catch (error) {
    return initialState;
  }
};

export const setStateCalibradoLocalStorage = (state: any) => {
  localStorage.setItem('calibradoStorage', JSON.stringify(state));
};

export const removeCalibradoLocalStorage = () => {
  localStorage.removeItem('calibradoStorage');
};
