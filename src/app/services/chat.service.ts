import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  cliente = inject(SupabaseService);
  constructor() { 
  }

  // async insertMensage( mensaje: string, id_usuario: string){
  //   return await this.cliente.supabase.from("mensajes").insert({mensaje, id_usuario});
  // }

  // async getMensage(){
  //   return await this.cliente.supabase.from("mensajes").select("*").order("created_at", {ascending: true});
  // }

}
