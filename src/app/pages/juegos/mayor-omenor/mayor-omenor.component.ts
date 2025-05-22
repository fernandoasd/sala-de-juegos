import { Component } from '@angular/core';
import { Carta } from "./carta.interface";


@Component({
  selector: 'app-mayor-omenor',
  imports: [],
  templateUrl: './mayor-omenor.component.html',
  styleUrl: './mayor-omenor.component.css'
})
export class MayorOMenorComponent {

  cartas: Carta[];
  numeros: number[];
  figuras: string[];
  cartaActual: Carta;
  cartaSiguiente: Carta;
  adivino: boolean;
  puntaje: number;

  constructor() {
    this.cartas = [];
    this.numeros = [1, 12, 11, 10, 9, 8, 7, 6, 5, 4];
    this.figuras = ["espada", "basto", "copa", "oro"]
    this.cartaActual = {
      numero: 0,
      figura: ""
    };
    this.cartaSiguiente = this.cartaActual;
    this.adivino = false;
    this.puntaje = 0;
  }

  ngOnInit() {
    this.cargarArray();
    this.iniciarJuego();

  }

  iniciarJuego() {
    this.cartaActual = this.lanzarCarta();
    this.cartaSiguiente = this.lanzarCarta();
    console.log("carta actual", this.cartaActual);
    console.log("carta siguiente", this.cartaSiguiente);
  }

  lanzarCartaSiguiente(){
    this.cartaActual = this.cartaSiguiente;
    this.cartaSiguiente = this.lanzarCarta();
    console.log("cartaSiguiente ", this.cartaSiguiente);
  }

  cargarArray() {
    this.figuras.forEach(f => {
      this.numeros.forEach(n => {
        this.cartas.push({
          numero: n,
          figura: f
        })
      });
    });
  }

  numeroAleatorio(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  lanzarCarta() {
    const indice1 = this.numeroAleatorio(0, this.cartas.length - 1);
    return this.cartas[indice1];
  }

  elegirMenor() {
    let exito = false;
    if (this.cartaSiguiente?.numero < this.cartaActual?.numero) {
      exito = true;
    }
    return exito;
  }

  elegirMayor() {
    let exito = false;
    if (this.cartaSiguiente?.numero > this.cartaActual?.numero) {
      exito = true;
    }
    return exito;
  }

  compararCartas(mayor: boolean = true) {
    let resultado;
    if (mayor) {
      resultado = this.elegirMayor();
    } else {
      resultado = this.elegirMenor();
    }
    console.log("resultado: ", resultado);
    if (resultado) {
      this.puntaje += 1;

    }
    this.lanzarCartaSiguiente();
    return resultado;
  }

}
