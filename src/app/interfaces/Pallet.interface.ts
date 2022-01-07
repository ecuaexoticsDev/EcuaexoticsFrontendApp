import { itemPallet } from "./itemPallet.interface";
export interface pallet {
    id_pallet: number;  // identificador del pallet dentro del palletizado
    id_palletizado? :  number;
    id_cliente?: number;
    tipo_pitahaya?:  string;
    items: itemPallet[];
}