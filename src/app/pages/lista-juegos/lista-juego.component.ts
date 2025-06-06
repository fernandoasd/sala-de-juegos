import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista-juego',
  imports: [RouterLink],
  templateUrl: './lista-juego.component.html',
  styleUrl: './lista-juego.component.css'
})
export class ListaJuegoComponent {
  ngOnInit(){
    console.log("Lista de juegos");
  }
}
