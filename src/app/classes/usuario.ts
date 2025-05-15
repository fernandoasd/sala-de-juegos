export class Usuario {
    id?: number; // con ? puede ser undefined
    mail: string;
    contrasenia: string;

    constructor (mail: string, contrasenia: string){
        this.mail = mail;
        this.contrasenia = contrasenia;
    }
}
