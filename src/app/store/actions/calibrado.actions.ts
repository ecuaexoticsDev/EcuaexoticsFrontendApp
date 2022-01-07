import { createAction, props } from '@ngrx/store';

export const sumarCalibre = createAction(
  '[Calibre] SumarCalibre',
  props<{ payload: any }>()
);

export const restarCalibre = createAction(
  '[Calibre] RestarCalibre',
  props<{ payload: any }>()
);

export const agregarCalibre = createAction(
  '[Calibre] AgregarCalibre',
  props<{ payload: any }>()
);

export const resetCalibre = createAction('[Calibre] ResetCalibre');

export const reloadStateCalibre = createAction(
  '[Calibre] ReloadStateCalibre',
  props<{ payload: any }>()
);
