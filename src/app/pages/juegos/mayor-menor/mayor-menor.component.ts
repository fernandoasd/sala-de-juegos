import { ChangeDetectorRef, Component, inject, signal, Signal } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { CommonModule } from '@angular/common';
import { Baraja, Carta, Comparacion, EstadoJuego } from './mayor-menor.interface';





@Component({
  selector: 'app-mayor-menor',
  imports: [CommonModule],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})


export class MayorMenorComponent {
  httpService = inject(HttpService);
  cantidadBarajas: number = 1;
  repartirInicio: number = 2;
  repartirJugando: number = 1;

  deck_id: string = "-";
  https: string = "/2api";
  // https: string = "https://deckofcardsapi.com/api/deck/";
  cartasRestantes: number = 0;
  cartaActual = signal<Carta[]>([]);
  cartaSiguiente = signal<Carta[]>([]);
  cartaAnteriorUno = signal<Carta[]>([]);
  cartaAnteriorDos = signal<Carta[]>([]);
  baraja: Baraja[] = [];
  exito: boolean = false;
  eleccion: Comparacion.Mayor | Comparacion.Menor = Comparacion.Mayor;
  comparacion: Comparacion = Comparacion.Iguales;
  estadoJuego: EstadoJuego = EstadoJuego.Esperando;
  puntaje: number = 0;
  dorsoCarta = "https://deckofcardsapi.com/static/img/back.png"
  dorsoCartaSedundaria = "";
  respuestaAnterior = "";
  claseJugadaAnterior = "";

  constructor(private cdr: ChangeDetectorRef) {

  }

  async ngOnInit() {
    console.clear();
    const baraja = await this.barajar(this.cantidadBarajas).subscribe((nuevaBaraja: Baraja) => {
      if (nuevaBaraja.success) {
        this.baraja[0] = nuevaBaraja;
        this.repartirCartas(2);
        console.log("comparacion inicial:", this.comparacion);
      }
    });
  }

  iniciarBaraja(cantidadBarajas: number) {
    const baraja = this.barajar(this.cantidadBarajas).subscribe((nuevaBaraja: Baraja) => {
      if (nuevaBaraja.success) {
        this.baraja[0] = nuevaBaraja;
        if (this.baraja[0].remaining >= this.repartirInicio) {
          this.repartirCartas(this.repartirInicio);
          this.comparacion = this.compararCartas();
          console.log("comparacion inicial:", this.comparacion);
        } else {
          console.log("No quedan mas cartas en la baraja!");
        }

      }
    });
  }

  volverAJugar() {
    this.repartirCartas(this.repartirJugando);
    // this.comparacion = this.compararCartas();
    console.log("comparacion ", this.comparacion);
  }

  barajar(cartas: number) {
    return this.httpService.httpClient.get<any>(this.https + "/new/shuffle/?cantidadBarajas=" + cartas);
  }

  dibujarCartas(cartas: number) {
    return this.httpService.httpClient.get<any>(this.https + this.baraja[0].deck_id + "/draw/?count=" + cartas);
  }

  repartirCartas(repartirInicio: number = 2) {
    const subscriptionImage = this.dibujarCartas(repartirInicio).subscribe((baraja: Baraja) => {
      this.parsearValorNumerico(baraja);
      if (repartirInicio == 1) {
        this.cartaActual.set(this.cartaSiguiente());
        this.cartaSiguiente.set([baraja.cards[0]]);
      } else {
        this.cartaActual.set([baraja.cards[0]]);
        this.cartaSiguiente.set([baraja.cards[1]]);
      }
      console.log("1: ", this.cartaActual()[0].value, " 2: ", this.cartaSiguiente()[0].value);
      this.comparacion = this.compararCartas();
      this.estadoJuego = EstadoJuego.Jugando;
      console.log("this.estadoJuego ", this.estadoJuego);
      console.log(baraja);
    });
  }

  parsearValorNumerico(baraja: Baraja) {
    baraja.cards.forEach(c => {
      switch (c.value) {
        case "JACK":
          c.value = 11;
          break;
        case "QUEEN":
          c.value = 12;
          break;
        case "KING":
          c.value = 13;
          break;
        case "ACE":
          c.value = 14;
          break;
        default:
          c.value = Number(c.value);

      }
    });
  }



  elegirMayor() {
    this.eleccion = Comparacion.Mayor;
    this.adivinar(this.eleccion);

  }

  elegirMenor() {
    this.eleccion = Comparacion.Menor;
    this.adivinar(this.eleccion);

  }

  compararCartas() {

    let resultadoComparacion = Comparacion.Iguales;
    if (this.cartaActual()[0].value > this.cartaSiguiente()[0].value) {
      resultadoComparacion = Comparacion.Mayor;
    } else {
      if (this.cartaActual()[0].value < this.cartaSiguiente()[0].value) {
        resultadoComparacion = Comparacion.Menor;
      }
    }
    console.log("comparacion sistema ", resultadoComparacion);
    return resultadoComparacion;


  }

  adivinar(eleccion: Comparacion.Mayor | Comparacion.Menor) {
    if (eleccion === this.comparacion) {
      this.estadoJuego = EstadoJuego.Gano;
      this.puntaje += 1;
      this.claseJugadaAnterior = "text-success";
      console.log("Correcto");
    } else {
      if (this.comparacion === Comparacion.Iguales) {
        this.estadoJuego = EstadoJuego.Empato;
        this.claseJugadaAnterior = "text-secondary";
        console.log("Empate");
      } else {
        this.estadoJuego = EstadoJuego.Perdio;
        console.log("Perdió");
        this.claseJugadaAnterior = "text-danger";
        this.puntaje -= 1;
      }
    }
    this.cartaAnteriorUno.set(this.cartaActual());
    this.respuestaAnterior = this.comparacion;
    this.cartaAnteriorDos.set(this.cartaSiguiente());

    this.estadoJuego = EstadoJuego.Esperando;
    this.volverAJugar();
  }

}
