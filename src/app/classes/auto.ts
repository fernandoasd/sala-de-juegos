export class Auto {
    id?: number; // con ? puede ser undefined
    marca: string;
    modelo: string;
    precio: number;

    constructor (marca: string, modelo: string, precio: number){
        this.marca = marca;
        this.modelo = modelo;
        this.precio = precio;
    }
}
