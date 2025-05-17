import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../classes/usuario';
import { AuthError } from '@supabase/supabase-js';

@Component({
  selector: 'app-registro',
  imports: [FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  auth = inject(AuthService);
  usuario = inject(UsuarioService);
  data: any[] | null = null;
  error= signal<AuthError | null>(null);

  mail: string = "";
  contrasenia: string = "";
  hayError: boolean = false;

  async registrarse() {
    const respuesta = await this.auth.crearCuenta(this.mail, this.contrasenia);
    if (respuesta.error === null) {
      this.usuario.crear(new Usuario(this.mail, this.contrasenia));
    } else {
      this.error.set(respuesta.error);
      this.hayError = true;
    }
  }
}
