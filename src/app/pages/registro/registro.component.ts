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
  tablaUsuario = inject(UsuarioService);
  data: any[] | null = null;
  error = signal<string>("");

  mail: string = "";
  contrasenia: string = "";
  nombre: string = "";
  edad: number = 0;
  urlImage: string = "";
  hayError: boolean = false;

  async registrarse() {
    const respuesta = await this.auth.crearCuenta(this.mail, this.contrasenia);
    if (respuesta.error === null) {
      this.tablaUsuario.crear(new Usuario(this.mail.toLowerCase(), this.contrasenia,
        this.nombre, this.urlImage, this.edad));
    } else {

      // this.error.set(respuesta.error);
      this.hayError = true;

      switch (respuesta.error?.status) {
        case 400:
          this.error.set("Se requiere una contraseña válida.");
          break;
        case 401:
          this.error.set("Solicitud inválida");
          break;
        case 403:
          this.error.set("Prohibido: No tenés permiso");
          break;
        case 422:
          this.error.set("La contraseña debe tener al menos 6 dígitos");
          break;
        default:
          this.error.set("🔄 Error desconocido. Error Status: "+ respuesta.error?.status);
      }
    }
  }
}
