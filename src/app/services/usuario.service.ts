import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Usuario } from '../classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  db = inject(SupabaseService);
  tablaUsuarios;

  constructor() {

    this.tablaUsuarios = this.db.supabase.from("usuariosAutentificados")
    console.log(this.db);
  }

  async listar() {
    const { data, error, count, status, statusText } = await this.tablaUsuarios.select("*");
    const usuarios = data as Usuario[]; //de esta forma data va a ser un array de usuarios
    console.log("listar", usuarios, error, count, status, statusText);
    return usuarios;
  }

  async crear(usuario: Usuario) {
    const { data, error, count, status, statusText } = await this.tablaUsuarios.insert(usuario);
    console.log("crear", data, error, count, status, statusText);
  }

  async modificar(usuario: Usuario) {
    // UPDATE ... where id = n
    const { data, error, count, status, statusText } = await this.tablaUsuarios.update(usuario).eq("id", usuario.id);
    console.log("modificar", data, error, count, status, statusText);
  }

  async eliminar(id?: number) {
    if (id === undefined) return;
    const { data, error, count, status, statusText } = await this.tablaUsuarios.delete().eq("id", id);
    console.log("eliminar", data, error, count, status, statusText);
  }
}