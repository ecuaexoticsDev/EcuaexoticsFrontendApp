export class Usuario {

    constructor( public id: number, public nombre : string, public apellido: string, 
                 public email: string, public rol: string,public is_active: boolean, public password?: string,
                  public username?: string   ){

    }
}