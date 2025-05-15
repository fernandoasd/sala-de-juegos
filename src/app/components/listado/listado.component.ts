import { Component, inject, signal } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { Auto } from '../../classes/auto';

@Component({
  selector: 'app-listado',
  imports: [],
  templateUrl: './listado.component.html',
  styleUrl: './listado.component.css'
})
export class ListadoComponent {
  db = inject(DatabaseService);
  // autos: Auto[] = [];

  //signal: cuando se actualiza envia una señal al HTML
  autos = signal<Auto[]>([]);

  hayAutos: boolean = false;

  ngOnInit() {
    this.db.listar().then((autos: Auto[]) => {
      this.autos.set(autos);
      this.hayAutos = true;
      // setTimeout(() => {
      // }, 1000)
    }); 
  }

  eliminar(id?: number){
    this.db.eliminar(id);
    console.log("Eliminar: " + id);

  }
}
