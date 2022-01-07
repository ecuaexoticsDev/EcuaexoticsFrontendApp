import { Productor } from "../models/productor";
export interface itemPallet {
    id_item_pallet: number;  //identificador del item dentro del pallet
    id_Pallet: number;
    productor: Productor;
    id_productor : Productor;
    tipo_caja: string;
    calibre: string;
    num_cajas: number;
    id_caja?: number;
}

