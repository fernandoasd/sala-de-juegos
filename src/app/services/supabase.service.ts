import { inject, Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})

// Se crea el cliente sola UNA vez desde aca, luego se inyecto
export class SupabaseService {
  from(arg0: string) {
    throw new Error('Method not implemented.');
  }
  supabase: SupabaseClient<any, "public", any>;





  constructor() {
    this.supabase = createClient(
      "https://zvfexktcpppuodwshfeb.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2ZmV4a3RjcHBwdW9kd3NoZmViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNjIwNjQsImV4cCI6MjA2MjYzODA2NH0.AFXKXMW1tPeH91DXAV9CNl5S-SEGMxt7DKDL0khBKZA"
    );
  }

  onMensajesInsert(callback: (mensaje: any) => void) {
    return this.supabase
      .channel('public:mensajes') // nombre único para el canal
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'mensajes',
        },
        (payload) => {
          console.log('Recibido payload:', payload);
          if (payload.new) {
            callback(payload.new); // Solo llega si hay datos
          }
        }
      )
      .subscribe((status) => {
        if (status !== 'SUBSCRIBED') {
          console.warn('No se pudo suscribir correctamente:', status);
        }
      });
  }

  async obtenerMensajes() {
    return this.supabase.from("mensajes")
      .select("id, created_at ,mensaje, usuarios(id, nombre)");
    // .order("created_at", {ascending: true});
  }

  async obtenerUsuarioMail(mail: string) {
    console.log("consulto usuario x mail...");
    return this.supabase.from("usuarios")
      .select("*").eq("mail", mail);
    // .order("created_at", {ascending: true});
  }







}
