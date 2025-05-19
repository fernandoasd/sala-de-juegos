import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {
  db = inject(SupabaseService);
  tabla_mensajes;
  constructor() { 
    this.tabla_mensajes = this.db.supabase.from("mensajes");
  }

  async traerTodos(){
    const  {data, error} = await this.tabla_mensajes
    .select("id, created_at ,mensaje, usuarios(id, nombre)");
    console.log("Mensajes:");
    console.log(data, error);
    return data as any[];
  }

  async insertar(mensaje: string, id_usuario: number){
    const {data, error} = await this.tabla_mensajes.insert({mensaje: mensaje, id_usuario: id_usuario})
  }
}
