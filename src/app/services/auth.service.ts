import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Router } from '@angular/router';
import { User } from "@supabase/supabase-js";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  sb = inject(SupabaseService);
  router = inject(Router);
  usuarioActual: User | null = null;

  constructor() {
    //saber si el usuario esta logueado o bo
    this.sb.supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      if (session === null) { //si cierra sesion o no la hay
        this.usuarioActual = null;
        this.router.navigateByUrl("/login");
      } else { //si inicia sesion
        this.usuarioActual = session.user;
        this.router.navigateByUrl("/home");
      }
    });
  }

  //crear cuenta
  async crearCuenta(correo: string, contraseña: string) {
    const { data, error } = await this.sb.supabase.auth.signUp({
      email: correo,
      password: contraseña
    })
    console.log("aunth, crear cuenta:",data, error);
    return {data, error};
  }
  //iniciar sesión
  async iniciarSesion(correo: string, contraseña: string) {
    const {data, error } = await this.sb.supabase.auth.signInWithPassword({
      email: correo,
      password: contraseña
    })
    console.log("aunth, iniciar sesion:",data, error);
    return { data, error };
  }

  //cerrar cesión
  async cerrarSesion() {
    const { error } = await this.sb.supabase.auth.signOut()
    console.log("aunth, cerrars esion:",error);
    return {error};
  }
}
