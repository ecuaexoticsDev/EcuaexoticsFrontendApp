import { environment } from 'src/environments/environment';

const APICONTROL = 'control/';
const LINKROOT = environment.base_url;

export const ApiControl = {
  crear_control_calidad: LINKROOT + APICONTROL + 'crear_control_calidad/',
  get_info_control_calidad: LINKROOT + APICONTROL + 'get_info_control_calidad/',
};
