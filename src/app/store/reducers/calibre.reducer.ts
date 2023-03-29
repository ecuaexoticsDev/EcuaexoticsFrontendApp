import { Action, createReducer, on } from "@ngrx/store";
import * as actions from "../actions";
import {
  getInitialStateCalibrado,
  setStateCalibradoLocalStorage,
  initialState,
  removeCalibradoLocalStorage,
} from "../states/calibrado.state";

export interface CalibradoState {
  calibrado: any[];
}

export const initialCalibradoState: CalibradoState = {
  calibrado: getInitialStateCalibrado(),
};

//MODIFICAR PARA AGREGAR NUEVAS CAJAS
const _createCalibradoReducer = createReducer(
  initialCalibradoState,
  on(actions.sumarCalibre, (state, { payload }) => {
    const { tipo_caja, calibre } = payload;
    let resultCalibrado = state.calibrado.map((itemCalibrado) => {
      if (itemCalibrado.tipo_caja === tipo_caja) {
        let ic = itemCalibrado.calibres.map((calibreItem: any) => {
          if (calibreItem.calibre === calibre) {
            let cantidad = calibreItem.cantidad + 1;
            if (cantidad > 0) {
              return {
                ...calibreItem,
                cantidad: cantidad,
              };
            } else {
              return {
                ...calibreItem,
                cantidad: 0,
              };
            }
          } else {
            return {
              ...calibreItem,
            };
          }
        });
        return { ...itemCalibrado, calibres: ic };
      } else {
        return { ...itemCalibrado };
      }
    });
    setStateCalibradoLocalStorage(resultCalibrado);
    return { calibrado: resultCalibrado };
  }),
  on(actions.restarCalibre, (state, { payload }) => {
    const { tipo_caja, calibre } = payload;
    let resultCalibrado = state.calibrado.map((itemCalibrado) => {
      if (itemCalibrado.tipo_caja === tipo_caja) {
        let ic = itemCalibrado.calibres.map((calibreItem: any) => {
          if (calibreItem.calibre === calibre) {
            let cantidad = calibreItem.cantidad - 1;
            if (cantidad > 0) {
              return {
                ...calibreItem,
                cantidad: cantidad,
              };
            } else {
              return {
                ...calibreItem,
                cantidad: 0,
              };
            }
          } else {
            return {
              ...calibreItem,
            };
          }
        });
        return { ...itemCalibrado, calibres: ic };
      } else {
        return { ...itemCalibrado };
      }
    });
    setStateCalibradoLocalStorage(resultCalibrado);
    return { calibrado: resultCalibrado };
  }),
  on(actions.agregarCalibre, (state, { payload }) => {
    const { calibre, cantidad, tipo_caja } = payload;
    let resultCalibrado = state.calibrado.map((itemCalibrado) => {
      if (itemCalibrado.tipo_caja === tipo_caja) {
        const itemCalibre = {
          id_caja: 0,
          calibre: "C-" + String(calibre),
          cantidad: cantidad,
        };

        return {
          ...itemCalibrado,
          calibres: [...itemCalibrado.calibres, itemCalibre],
        };
      } else {
        return { ...itemCalibrado };
      }
    });
    setStateCalibradoLocalStorage(resultCalibrado);
    return { calibrado: resultCalibrado };
  }),
  on(actions.resetCalibre, (state) => {
    removeCalibradoLocalStorage();
    return { calibrado: initialState };
  }),
  on(actions.reloadStateCalibre, (state, { payload }) => {
    const tipos_cajas = payload;
    let newState = state;
    tipos_cajas.forEach((tipo: any) => {
      let stateTest1 = newState;
      tipo.calibres.forEach((caja: any) => {
        let stateTest2;
        stateTest2 = stateTest1.calibrado.map((itemCalibrado) => {
          if (itemCalibrado.name_tipo_caja === tipo.tipo_caja) {
            let ic = itemCalibrado.calibres.map((calibreItem: any) => {
              if (calibreItem.calibre == caja.calibre) {
                return {
                  ...caja,
                };
              } else {
                return {
                  ...calibreItem,
                };
              }
            });
            return { ...itemCalibrado, calibres: ic };
          } else {
            return { ...itemCalibrado };
          }
        });
        const testState = { calibrado: stateTest2 };
        const cal = parseInt(caja.calibre.split("-")[1]);
        let newCajaItem: any = null;
        if (tipo.tipo_caja == "Carton Box 2.5 kg net weight") {
          if (cal > 14) {
            newCajaItem = {
              ...caja,
            };
          }
        } else if (tipo.tipo_caja == "Carton Box 4 kg net weight") {
          if (cal > 18) {
            newCajaItem = {
              ...caja,
            };
          }
        } else if (tipo.tipo_caja == "Carton Box 4.5 kg net weight") {
          if (cal > 18) {
            newCajaItem = {
              ...caja,
            };
          }
        }

        if (newCajaItem) {
          let nstate = testState.calibrado.map((itemCalibrado: any) => {
            if (itemCalibrado.name_tipo_caja === tipo.tipo_caja) {
              return {
                ...itemCalibrado,
                calibres: [...itemCalibrado.calibres, newCajaItem],
              };
            } else {
              return { ...itemCalibrado };
            }
          });
          stateTest1 = { calibrado: nstate };
        } else {
          stateTest1 = { calibrado: stateTest2 };
        }
      });
      newState = stateTest1;
    });
    // console.log(newState);
    setStateCalibradoLocalStorage(newState.calibrado);
    return newState;
  })
);

export function calibradoReducer(state: any, action: Action) {
  return _createCalibradoReducer(state, action);
}
