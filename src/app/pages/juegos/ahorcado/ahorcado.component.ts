import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Letra } from "./letra.interface";
import { EstadoJuego } from "./estadoJuego.enum";
import { CommonModule, NgIf } from "@angular/common";



@Component({
  selector: "app-ahorcado",
  imports: [FormsModule, CommonModule],
  templateUrl: "./ahorcado.component.html",
  styleUrl: "./ahorcado.component.css"
})



export class AhorcadoComponent {
  abecedario: any[];
  bancoPalabras: string[];
  arrayPalabra: Letra[];
  estadoJuego: EstadoJuego.Jugando | EstadoJuego.Ganado | EstadoJuego.Perdido = EstadoJuego.Jugando;
  intentos: number;
  intentosMax: number;
  mensaje: string;
  claseInitBoton: string;
  claseBotonErrado: string;
  claseBotonAcertado: string;



  constructor() {

    this.abecedario = [
      'a', 'b', 'c', 'd', 'e', 'f', 'g',
      'h', 'i', 'j', 'k', 'l', 'm', 'n',
      'o', 'p', 'q', 'r', 's', 't', 'u',
      'v', 'w', 'x', 'y', 'z'
    ];

    this.bancoPalabras = ["programacion", "lenguaje", "aprobame"];


    this.estadoJuego = EstadoJuego.Jugando;
    this.arrayPalabra = [];
    this.intentosMax = 7;
    this.intentos = 1;
    this.mensaje = "";
    this.claseInitBoton = "btn btn-light m-1";
    this.claseBotonErrado = "btn btn-danger m-1";
    this.claseBotonAcertado = "btn btn-success m-1";
  }

  ngOnInit(): void {
    this.inicializarJuego();
  }

  inicializarJuego() {
    this.intentos = this.intentosMax;
    const arrayPalabraSeleccionada = this.elegirPalabra(this.bancoPalabras);
    this.arrayPalabra = this.separarPalabraEnArray(arrayPalabraSeleccionada);
    this.estadoJuego = EstadoJuego.Jugando;
    console.log("Nueva palabra: ", arrayPalabraSeleccionada);
  }

  cambiarColorBoton(index: string, acertoLetra: boolean) {
    console.log("index: ", index);
    const boton = document.getElementById("btn-" + index);
    if (boton) {
      if (acertoLetra) {
        console.log("boton acertado");
        boton.className = this.claseBotonAcertado;
      } else {

        console.log("boton errado");
        boton.className = this.claseBotonErrado;
      }
    }

  }

  numeroAleatorio(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  elegirPalabra(bancoPalabras: any[]) {
    const indicePalabra = this.numeroAleatorio(0, bancoPalabras.length - 1);
    return bancoPalabras[indicePalabra].toLowerCase();
  }

  separarPalabraEnArray(arrayPalabra: string): Letra[] {
    const arrayPalabraArray = arrayPalabra.split("");
    const lista: Letra[] = [];
    arrayPalabraArray.forEach(x => {
      lista.push({
        letra: x,
        adivinada: false
      });
    });
    return lista;
  }

  adivinarLetra(letraElegida: string, arrayPalabra: Letra[]) {
    let acertoLetra = false;
    arrayPalabra.forEach(item => {
      if (item.letra === letraElegida) {
        item.adivinada = true;
        acertoLetra = true;
      }
    });
    console.log("letra ", letraElegida);
    return { arrayPalabra, acertoLetra };
  }

  comprobarSiGano(arrayPalabra: Letra[]): boolean {
    return arrayPalabra.every(element => {
      if (element.adivinada === true) {
        console.log("todas son true");
        return true;
      } else {
        console.log("NO todas son true");
        return false;
      }
    });
  }

  comprobarEstadoJuego(acertoLetra: boolean, arrayPalabra: Letra[]) {
    if (acertoLetra) {
      console.log("acertaste!");
      if (this.comprobarSiGano(arrayPalabra))
        this.ganarJuego();

    } else {
      this.intentos -= 1;
      if (this.intentos > 0)
        console.log("fallaste!, te quedan :", this.intentos);
      else
        this.perderJuego();
    }
    console.log(this.arrayPalabra);
    console.log("intentos ", this.intentos);
  }

  ganarJuego() {
    this.mensaje = "Felicidades, ganaste!\nSumaste 10 puntos."
    this.estadoJuego = EstadoJuego.Ganado;
  }

  perderJuego() {
    this.mensaje = "Game Over!\nPerdiste 10 puntos."
    this.estadoJuego = EstadoJuego.Perdido;
  }
  presionarTecla(index: string) {
    const { arrayPalabra, acertoLetra } = this.adivinarLetra(this.abecedario[Number(index)], this.arrayPalabra);
    this.cambiarColorBoton(index, acertoLetra);

    this.comprobarEstadoJuego(acertoLetra, arrayPalabra);

  }

}
