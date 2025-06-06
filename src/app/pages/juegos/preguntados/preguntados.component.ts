import { ChangeDetectorRef, Component, inject, signal, SimpleChange } from '@angular/core';
import { SimpsonsService } from '../../../services/simpsons.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Personaje } from './personaje.interface';
import { RankingComponent } from '../../ranking/ranking.component';
import { SupabaseService } from '../../../services/supabase.service';
import { AuthService } from '../../../services/auth.service';
import { RankingService } from '../../../services/ranking.service';
import { UsuarioService } from '../../../services/usuario.service';
import { Juego } from '../../../enum/juegos.enum';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-preguntados',
  imports: [FormsModule, CommonModule, RankingComponent],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
  sp = inject(SupabaseService);
  usuarios = inject(UsuarioService);
  ranking = inject(RankingService);
  auth = inject(AuthService);
  nuevoRanking = signal<any[]>([]);

  juego = Juego.preguntados;
  usuarioActual = signal<any[]>([]);
  simpsonsService = inject(SimpsonsService);
  personaje = signal<Personaje[]>([]);
  bandera = signal<boolean>(false);
  aleatorio: any[] = [];
  puntaje = 0;



  constructor(private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.inicializarJuego();
  }

  inicializarJuego() {
    this.auth.traerUsuarioActual().then((usuario) => {
      this.usuarioActual.set([usuario]);
    });
    this.aleatorio = [];
    this.bandera.set(false);
    try {
      this.simpsonsService.traerPersonajeRandom().subscribe((respuesta) => {
        this.personaje.set(respuesta as Personaje[]);
        this.personaje().forEach(element => {
          console.log("this.personaje(): ", element.character);
        });
        this.personaje().forEach(element => {
          this.aleatorio.push(element.character);
        });
        this.aleatorio = this.aleatorio.sort(() => Math.random() - 0.6);
        console.log("this.aleatorio(): ", this.aleatorio);
        this.bandera.set(true);
      })
    } catch {
      console.log("error: ");
    }
  }

  consultarPersonaje(nombre: string) {
    if (nombre === this.personaje()[0].character) {
      this.puntaje += 1;
      console.log("correcto");
    } else {
      this.puntaje -= 1;
      this.guardarRanking()
      console.log("nop");
    }
    this.inicializarJuego();
  }

    async guardarRanking() {
      return await this.ranking.insertarRanking(this.usuarioActual()[0].id, this.juego, this.puntaje).then(() => {
        return this.ranking.obtenerRanking(this.juego).then((ranking) => {
          this.nuevoRanking.set([ranking]);
          Swal.fire("Ranking", "Progreso guardado en el Ranking:", "success");
          return ranking;
        });
      }); 
    }
}
