import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { UsuarioComponent } from '../usuario/usuario.component';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, UsuarioComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  auth = inject(AuthService);
  usuario = inject(UsuarioService);
  mail: string = "";
  contrasenia: string = "";

  rellenar(array: string[]){
    this.mail = array[0];
    this.contrasenia = array[1];
  }

  async loguearse(){
    await this.auth.iniciarSesion(this.mail, this.contrasenia).then(({data, error}) => {
      if (error === null){
        this.usuario.cargarUsuario(this.mail);
      }
      return {data, error};
    });

  }
}
