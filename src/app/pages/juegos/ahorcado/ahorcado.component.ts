import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Letra } from "./letra.interface";
import { EstadoJuego } from "./estadoJuego.enum";
import { CommonModule } from "@angular/common";
import { SupabaseService } from "../../../services/supabase.service";
import { UsuarioService } from "../../../services/usuario.service";
import { AuthService } from "../../../services/auth.service";
import { RankingService } from "../../../services/ranking.service";
import { Juego } from "../../../enum/juegos.enum";
import Swal from "sweetalert2";
import { RankingComponent } from "../../ranking/ranking.component";

// ahorcado

@Component({
  selector: "app-ahorcado",
  imports: [FormsModule, CommonModule, RankingComponent],
  templateUrl: "./ahorcado.component.html",
  styleUrl: "./ahorcado.component.css"
})



export class AhorcadoComponent {
  sp = inject(SupabaseService);
  usuarios = inject(UsuarioService);
  ranking = inject(RankingService);
  auth = inject(AuthService);
  
  juego = Juego.ahorcado;
  usuarioActual= signal<any[]>([]);
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
  images: string[];
  imagenUrl: string;
  puntuacion = signal<number>(0);
  nuevoRanking = signal<any[]>([]);
  idUsuarioACtual = signal<number>(0);


  constructor() {
    this.images = [
      "https://zvfexktcpppuodwshfeb.supabase.co/storage/v1/object/sign/images/games/ahorcado/hangman-0.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzY4Nzk5MWY2LWVjYTgtNDE5Ny1hZTViLTkzM2FkZmY5YjQ4NyJ9.eyJ1cmwiOiJpbWFnZXMvZ2FtZXMvYWhvcmNhZG8vaGFuZ21hbi0wLnBuZyIsImlhdCI6MTc0Nzk1NzYyOCwiZXhwIjoxNzc5NDkzNjI4fQ.DEmXblYGEzLbtMtuEjVrtpzoIqND6LvfBRo1XMRTZiE",
      "https://zvfexktcpppuodwshfeb.supabase.co/storage/v1/object/sign/images/games/ahorcado/hangman-1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzY4Nzk5MWY2LWVjYTgtNDE5Ny1hZTViLTkzM2FkZmY5YjQ4NyJ9.eyJ1cmwiOiJpbWFnZXMvZ2FtZXMvYWhvcmNhZG8vaGFuZ21hbi0xLnBuZyIsImlhdCI6MTc0Nzk1NzcyNywiZXhwIjoxNzc5NDkzNzI3fQ.EIzerKrLxOF8G2_wyVT38IF2sFEIpmPRcOYw-9NYVL8",
      "https://zvfexktcpppuodwshfeb.supabase.co/storage/v1/object/sign/images/games/ahorcado/hangman-2.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzY4Nzk5MWY2LWVjYTgtNDE5Ny1hZTViLTkzM2FkZmY5YjQ4NyJ9.eyJ1cmwiOiJpbWFnZXMvZ2FtZXMvYWhvcmNhZG8vaGFuZ21hbi0yLnBuZyIsImlhdCI6MTc0Nzk1Nzc1NSwiZXhwIjoxNzc5NDkzNzU1fQ.O8Q4V4ig7wnyuSmlrzchFNLdGDKU5srSMfuSczzokmE",
      "https://zvfexktcpppuodwshfeb.supabase.co/storage/v1/object/sign/images/games/ahorcado/hangman-3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzY4Nzk5MWY2LWVjYTgtNDE5Ny1hZTViLTkzM2FkZmY5YjQ4NyJ9.eyJ1cmwiOiJpbWFnZXMvZ2FtZXMvYWhvcmNhZG8vaGFuZ21hbi0zLnBuZyIsImlhdCI6MTc0Nzk1Nzc3MywiZXhwIjoxNzc5NDkzNzczfQ.ZwEi2IHyEB1feHCYNVkwEQIoinqrjuW97VWUcVlMjuQ",
      "https://zvfexktcpppuodwshfeb.supabase.co/storage/v1/object/sign/images/games/ahorcado/hangman-3.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzY4Nzk5MWY2LWVjYTgtNDE5Ny1hZTViLTkzM2FkZmY5YjQ4NyJ9.eyJ1cmwiOiJpbWFnZXMvZ2FtZXMvYWhvcmNhZG8vaGFuZ21hbi0zLnBuZyIsImlhdCI6MTc0Nzk1Nzc3MywiZXhwIjoxNzc5NDkzNzczfQ.ZwEi2IHyEB1feHCYNVkwEQIoinqrjuW97VWUcVlMjuQ",
      "https://zvfexktcpppuodwshfeb.supabase.co/storage/v1/object/sign/images/games/ahorcado/hangman-5.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzY4Nzk5MWY2LWVjYTgtNDE5Ny1hZTViLTkzM2FkZmY5YjQ4NyJ9.eyJ1cmwiOiJpbWFnZXMvZ2FtZXMvYWhvcmNhZG8vaGFuZ21hbi01LnBuZyIsImlhdCI6MTc0Nzk1Nzc5OSwiZXhwIjoxNzc5NDkzNzk5fQ.4n855s1wGwpe0K2NOufZifTKltzKtRyMkyz8sY1HlVI",
      "https://zvfexktcpppuodwshfeb.supabase.co/storage/v1/object/sign/images/games/ahorcado/hangman-6.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzY4Nzk5MWY2LWVjYTgtNDE5Ny1hZTViLTkzM2FkZmY5YjQ4NyJ9.eyJ1cmwiOiJpbWFnZXMvZ2FtZXMvYWhvcmNhZG8vaGFuZ21hbi02LnBuZyIsImlhdCI6MTc0Nzk1NzgxMCwiZXhwIjoxNzc5NDkzODEwfQ.sir-0D0Ak3E9n1xIHgQi_t9oKZy0bqJ461s5_LFLNFg",
      "https://zvfexktcpppuodwshfeb.supabase.co/storage/v1/object/sign/images/games/ahorcado/hangman-7.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InN0b3JhZ2UtdXJsLXNpZ25pbmcta2V5XzY4Nzk5MWY2LWVjYTgtNDE5Ny1hZTViLTkzM2FkZmY5YjQ4NyJ9.eyJ1cmwiOiJpbWFnZXMvZ2FtZXMvYWhvcmNhZG8vaGFuZ21hbi03LnBuZyIsImlhdCI6MTc0Nzk1NzgyMywiZXhwIjoxNzc5NDkzODIzfQ.pDbCsqUFWXzblzqWwSYgogEaGCEpxNWTvTTkEH6yCO4"
    ];
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
    this.intentos = 0;
    this.mensaje = "";
    this.claseInitBoton = "btn btn-lg btn-light m-1";
    this.claseBotonErrado = "btn btn-lg btn-danger m-1";
    this.claseBotonAcertado = "btn btn-lg btn-success m-1";
    this.imagenUrl = this.images[0];
    console.log(this.imagenUrl);
  }

  ngOnInit() {
    this.auth.traerUsuarioActual().then((usuario) => {
      this.usuarioActual.set([usuario]);
      this.idUsuarioACtual.set(this.usuarioActual()[0].id);
      console.log("11 usuario: ", this.usuarioActual);
      this.ranking.obtenerPuntosRanking(this.usuarioActual()[0].id, this.juego).then((datos) => {
        console.log("datos.data![0]: ", datos.data![0])
        console.log("usuario: ", this.usuarioActual()[0]);

        if (datos.data == null) {
          console.log("ranking esta vacío");
        } else {
          console.log("datos: ", datos.data[0]);
        }
        this.ranking.obtenerRanking(this.juego).then((ranking) => {
          this.nuevoRanking.set([ranking]);
          console.log("Ranking: ", this.nuevoRanking()[0].data);
          console.log("Ranking: null? ", this.nuevoRanking()[0].data.length == 0);
        })
        this.inicializarJuego();
        return datos.data![0];
      });
    });
  }

  inicializarJuego() {
    // this.puntuacion.set(0);
    this.intentos = 0;
    this.imagenUrl = this.images[0];
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
      boton.setAttribute("disabled", "true");
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
    let mensaje = "";
    let puntos = 0;
    let estadoJuego = EstadoJuego.Jugando;
    if (acertoLetra) {
      console.log("acertaste!");
      if (this.comprobarSiGano(arrayPalabra)) {
        mensaje = "Felicidades, ganaste!\nSumaste 1 punto!!!.";
        puntos = 1;
        estadoJuego = EstadoJuego.Ganado;
        this.finalizarJuego(mensaje, puntos, estadoJuego);
      }
    } else {
      this.intentos += 1;
      this.imagenUrl = this.images[this.intentos];
      if (this.intentos >= this.intentosMax) {
        mensaje = "Game Over!\nPerdiste 1 punto.";
        puntos = -1;
        estadoJuego = EstadoJuego.Perdido;
        this.finalizarJuego(mensaje, puntos, estadoJuego);
        this.guardarRanking().then(({ data }) => {
          console.log("Ranking: ", data);

        });

      } else {
        console.log("fallaste!, te quedan :", this.intentos);
      }
    }
    console.log(this.arrayPalabra);
    console.log("intentos ", this.intentos);
  }

  finalizarJuego(mensaje: string, puntos: number, estadoJuego: EstadoJuego) {
    this.mensaje = mensaje;
    this.puntuacion.set(this.puntuacion() + puntos);
    this.estadoJuego = estadoJuego;
    console.log("actualizar: ", this.usuarioActual()[0].id, Juego.ahorcado, this.puntuacion());
  }


  async guardarRanking() {
    return await this.ranking.insertarRanking(this.usuarioActual()[0].id, this.juego, this.puntuacion()).then(() => {
      return this.ranking.obtenerRanking(this.juego).then((ranking) => {
        this.nuevoRanking.set([ranking]);
        Swal.fire("Ranking", "Progreso guardado en el Ranking:", "success");
        return ranking;
      });
    }); 
  }

  ganarJuego() {
    this.mensaje = "Felicidades, ganaste!\nSumaste 1 punto!!!."
    this.puntuacion.set(this.puntuacion() + 1);
    this.estadoJuego = EstadoJuego.Ganado;
  }

  perderJuego() {
    this.mensaje = "Game Over!\nPerdiste 1 punto."
    this.puntuacion.set(this.puntuacion() - 1);
    this.estadoJuego = EstadoJuego.Perdido;
  }

  presionarTecla(index: string) {
    const { arrayPalabra, acertoLetra } = this.adivinarLetra(this.abecedario[Number(index)], this.arrayPalabra);
    this.cambiarColorBoton(index, acertoLetra);
    this.comprobarEstadoJuego(acertoLetra, arrayPalabra);
  }

}
