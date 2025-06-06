import { Component, inject, input, signal } from '@angular/core';
import { Juego } from '../../enum/juegos.enum';
import { RankingService } from '../../services/ranking.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ranking',
  imports: [CommonModule],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent {
  juego = input<Juego>(1);
  idUsuario = input<number | null>(1);
  puntuacion = input<number>(0);

  ranking = inject(RankingService);
  nuevoRanking = signal<any[]>([]);

  ngOnInit() {
    console.log("init: ", this.nuevoRanking()[0] == null);
    this.consultarRanking();
  }

  async guardarRanking() {
    return await this.ranking.insertarRanking(this.idUsuario()!, this.juego(), this.puntuacion()).then(() => {
      return this.ranking.obtenerRanking(this.juego()).then((ranking) => {
        this.nuevoRanking.set([ranking]);
        Swal.fire("Ranking", "Progreso guardado en el Ranking:", "success");
        return ranking;
      });
    });
  }

  consultarRanking() {
    this.ranking.obtenerRanking(this.juego()).then((ranking) => {
      this.nuevoRanking.set([ranking])
      console.log("ranking: ", this.nuevoRanking());
    })
  }

}
