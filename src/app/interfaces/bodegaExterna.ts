import { Productor } from "../models/productor";
import { Usuario } from "../models/usuarios";

export interface bodegaExterna {
    id_bodega: number;
    id_productor: Productor;
    id_usuario: Usuario;
    fecha: Date;
    num_gavetas: number;
    kg_reportados: number;
    kg_recibidos: number;
    estado: string;
    tipo_pitahaya: string;
    id_recepcion: number;
}