import { Productor } from "../models/productor";
import { Transporte } from "../models/transporte";
import { Usuario } from "../models/usuarios";

export interface recepcionTransporte {
    id_recepcion_transporte: number;
    id_usuario: number;
    id_transporte: Transporte;
    chofer: string;
    fecha: Date;
    num_gavetas: number;
    kg_totales: number;
    num_gavetas_enviadas: string;
    num_sello_ingreso: string;
    num_sello_salida: string;
}