import { ChangeDetectorRef, Component, inject, signal, SimpleChange } from '@angular/core';
import { SimpsonsService } from '../../../services/simpsons.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Personaje } from './personaje.interface';


@Component({
  selector: 'app-preguntados',
  imports: [FormsModule, CommonModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {
  simpsonsService = inject(SimpsonsService);
  personaje = signal<Personaje[]>([]);
  bandera = signal<boolean>(false);
  aleatorio: any[]= [];
  puntaje = 0;



  constructor(private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.inicializarJuego();
  }

  inicializarJuego(){
    this.aleatorio = [];
    this.bandera.set(false);
       try{
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
      console.log("nop");
    }
    this.inicializarJuego();


  }
}
