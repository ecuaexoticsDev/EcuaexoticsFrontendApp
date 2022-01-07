import { pallet } from "./Pallet.interface";

export interface palletizado{
    id_Palletizado: number;
    fecha?: Date; //cambiar la posibilidad de que se opcional 
    pallets: pallet[];
}