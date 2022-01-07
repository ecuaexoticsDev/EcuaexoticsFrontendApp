export class Cliente {

    constructor( public id_cliente: number, public nombre : string,
                 public email: string, public telefono : number, public pais: string,
                 public activo: boolean, public direccion: string, public destino_orden: string,
                 public notify_address: string, public notify: string, ){

    }

}