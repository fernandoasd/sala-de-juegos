import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaJuegoComponent } from "../lista-juegos/lista-juego.component";

@Component({
  selector: 'app-juegos',
  imports: [RouterOutlet, ListaJuegoComponent],
  templateUrl: './juegos.component.html',
  styleUrl: './juegos.component.css'
})
export class JuegosComponent {

}
