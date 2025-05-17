import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { Usuario } from '../../classes/usuario';
import { DatabaseService } from '../../services/database.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario',
  imports: [],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  db = inject(UsuarioService);
  // autos: Auto[] = [];

  //signal: cuando se actualiza envia una señal al HTML
  usuarios = signal<Usuario[]>([]);
  hayUsuarios: boolean = false;

  ngOnInit() {
    this.db.listar().then((usuarios: Usuario[]) => {
      this.usuarios.set(usuarios);
      if (usuarios !== null)
      {
        this.hayUsuarios = true;
      }
      // setTimeout(() => {
      // }, 1000)
    });
  }

  @Output() rellenarEvent = new EventEmitter<string[]>();

  eliminar(id?: number) {
    this.db.eliminar(id);
    console.log("Eliminar: " + id);
  }

  rellenar(m: string, c: string)
  {
    this.rellenarEvent.emit([m, c]);
  }
}





