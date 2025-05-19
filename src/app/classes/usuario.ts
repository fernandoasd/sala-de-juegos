export class Usuario {
    private _id: number; // con ? puede ser undefined
    private _contrasenia: string;
    private _mail: string;
    private _nombre: string;
    private _urlImagen: string;
    private _edad: number;

    constructor(mail: string, contrasenia: string, nombre: string, urlImagen: string, edad: number) {
        this._id = 0;
        this._mail = mail;
        this._contrasenia = contrasenia;
        this._nombre = nombre;
        this._urlImagen = urlImagen;
        this._edad = edad;
    }

    get id(): number {
        return this._id;
    }

    get nombre(): string {
        return this._nombre;
    }

    get contrasenia(): string {
        return this._contrasenia;
    }

    get mail(): string {
        return this._mail;
    }

    get urlImagen(): string {
        return this._urlImagen;
    }

    get edad(): number {
        return this._edad;
    }

    set id(id: number) {
        this._id = id;
    }




}
