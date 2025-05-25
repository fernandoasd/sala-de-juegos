import { Component, OnInit, signal } from '@angular/core';
import { Operacion } from './operador.interface';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-mi-juego',
  imports: [FormsModule],
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
  intervalId: any;

  constructor() {
  }

  ngOnInit() {
    this.comenzar();
    console.log("INIT");
    // this.x1 = this.inicializarVariables();
    // this.x2 = this.inicializarVariables();
  }

  comenzar() {
    clearInterval(this.intervalId);
    this.respuesta = "";
    this.contador.set(0);
    const [n1, n2, op] = this.inicializarVariables();
    this.x1.set(n1);
    this.x2.set(n2);
    this.operador = op;
    this.tipoOperador = this.transcribirTipoOperador(this.operador);
    this.resultado = this.realizarCuenta(this.x1(), this.x2(), this.operador);
    console.log(this.x1(), this.operador ,this.x2()," = ", this.resultado);
    this.iniciarContador();
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  inicializarVariables() {
    let x1 = this.generarRandomInt(1, 15);
    let x2 = this.generarRandomInt(1, 15);
    let operador = this.generarRandomInt(1, 3);
    return [x1, x2, operador];
  }

  generarRandomInt(min: number, max: number){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  transcribirTipoOperador(operador: Operacion){
    let tipoOperador = "";
    switch (operador){
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
    if (Number(this.respuesta) == this.resultado) {
      this.puntaje += 1;
      this.mensaje = "Correcto!"
    } else {
      this.puntaje -= 1;
      this.mensaje = "nope, resultado= " + this.resultado
    }
    this.comenzar();
  }

  iniciarContador() {
    this.intervalId = setInterval(() => {
      this.contador.set(this.contador() + 1);
      // console.log("contador ", this.contador);
    }, 1000);
  }

  detenerContador() {
    clearInterval(this.intervalId);
  }




}
