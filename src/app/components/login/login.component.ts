import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { UsuarioComponent } from '../usuario/usuario.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, UsuarioComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  auth = inject(AuthService);
  mail: string = "";
  contrasenia: string = "";

  rellenar(array: string[]){
    this.mail = array[0];
    this.contrasenia = array[1];
  }

  loguearse(){
    this.auth.iniciarSesion(this.mail, this.contrasenia);
  }
}
