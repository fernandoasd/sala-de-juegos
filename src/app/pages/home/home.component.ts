import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ListaJuegoComponent } from '../lista-juegos/lista-juego.component';

@Component({
  selector: 'app-home',
  imports: [ListaJuegoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
