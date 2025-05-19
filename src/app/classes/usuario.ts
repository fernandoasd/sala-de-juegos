export class Usuario {
     // con ? puede ser undefined
    contrasenia: string;
    mail: string;
    nombre: string;
    urlImagen: string;
    edad: number;

    constructor(mail: string, contrasenia: string, nombre: string, urlImagen: string, edad: number) {
        this.mail = mail;
        this.contrasenia = contrasenia;
        this.nombre = nombre;
        this.urlImagen = urlImagen;
        this.edad = edad;
    }




}
