import { Component, OnInit, signal } from '@angular/core';
import { Operacion } from './operador.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-mi-juego',
  imports: [FormsModule, CommonModule],
  templateUrl: './mi-juego.component.html',
  styleUrl: './mi-juego.component.css'
})
export class MiJuegoComponent implements OnInit {
  cuenta = "8 + 7 = ";
  x1 = signal<number>(0);
  x2 = signal<number>(0);
  contador = signal<number>(0);
  operador: Operacion = Operacion.suma;
  tipoOperador = "";
  resultado = 3;
  respuesta = "";
  mensaje = "";
  puntaje = 0;
  contadorSegundos: any;
  intervaloMovimiento: any;
  tasaRefresco: number = 300;
  gotaX = signal<number>(0);
  gotaY = signal<number>(0);
  gotaXStart = 5;
  gotaEndX = 80;
  gotaYStart = 75;
  gotaYEnd = 14;
  pausa = signal<boolean>(false);
  claseMensaje = "";


  constructor() {
  }

  ngOnInit() {
    this.inicializarJuego();
    console.log("INIT");
    // this.x1 = this.inicializarVariables();
    // this.x2 = this.inicializarVariables();
  }

  inicializarJuego() {
    this.contador.set(0);
    this.mensaje = "";
    this.claseMensaje = "bg-secondary";
    this.pasarSiguienteGota();

  }

  pasarSiguienteGota() {
    this.pausarJuego(true);
    this.respuesta = "";
    this.gotaX.set(this.gotaXStart);
    this.gotaY.set(this.gotaYStart);
    const [n1, n2, op] = this.inicializarVariables();
    this.x1.set(n1);
    this.x2.set(n2);
    this.operador = op;
    this.tipoOperador = this.transcribirTipoOperador(this.operador);
    this.resultado = this.realizarCuenta(this.x1(), this.x2(), this.operador);
    console.log(this.x1(), this.operador, this.x2(), " = ", this.resultado);
    this.pausarJuego(false);
  }



  ngOnDestroy(): void {
    clearInterval(this.contadorSegundos);
  }

  iniciarMovimiento(posX: number, posY: number) {
    this.intervaloMovimiento = setInterval(() => {
      this.gotaX.set(this.gotaX() + posX);
      this.gotaY.set(this.gotaY() + posY);
      if (this.gotaY() <= this.gotaYEnd) {
        this.perder();
      }
    }, this.tasaRefresco)
  }

  inicializarVariables() {
    let x1 = this.generarRandomInt(1, 15);
    let x2 = this.generarRandomInt(1, 15);
    let operador = this.generarRandomInt(1, 3);
    return [x1, x2, operador];
  }

  generarRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  transcribirTipoOperador(operador: Operacion) {
    let tipoOperador = "";
    switch (operador) {
      case 1:
        tipoOperador = "+";
        break;
      case 2:
        tipoOperador = "-";
        break;
      case 3:
        tipoOperador = "*";
        break;
      case 4:
        tipoOperador = "/";
        break;
    }
    return tipoOperador;
  }

  realizarCuenta(x1: number, x2: number, operador: Operacion) {
    let resultado;
    switch (operador) {
      case 1:
        resultado = x1 + x2;
        break;
      case 2:
        resultado = x1 - x2;
        break;
      case 3:
        resultado = x1 * x2;
        break;
      default:
        resultado = x1 / x2;
        break;
    }
    console.log("resultado: ", resultado);
    return resultado;
  }

  responder() {
    this.detenerContador();
    this.mensaje = this.x1()+" "+this.tipoOperador+" "+this.x2()+" = "+this.resultado;
    if (Number(this.respuesta) == this.resultado) {
      this.ganar();
    } else {
      this.perder();
    }
  }

  perder() {
    this.puntaje -= 1;
    this.mensaje = this.x1()+" "+this.tipoOperador+" "+this.x2()+" = "+this.resultado;
    this.claseMensaje = "bg-danger"
    this.pausarJuego();
  }

  ganar() {
    this.puntaje += 1;
    this.mensaje = this.x1()+" "+this.tipoOperador+" "+this.x2()+" = "+this.resultado;
    this.claseMensaje = "bg-success"
    this.pasarSiguienteGota();
  }

  iniciarContador() {
    this.contadorSegundos = setInterval(() => {
      this.contador.set(this.contador() + 1);
      // console.log("contador ", this.contador);
    }, 1000);
  }

  detenerContador() {
    clearInterval(this.contadorSegundos);
  }

  pausarJuego(pausar: boolean = true) {
    if (pausar) {
      clearInterval(this.contadorSegundos);
      clearInterval(this.intervaloMovimiento);
      this.pausa.set(false);
    } else {
      this.iniciarContador();
      this.iniciarMovimiento(0, -3);
      this.pausa.set(true);
    }
    console.log("pausa ", this.pausa());
  }




}
