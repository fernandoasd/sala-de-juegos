import { inject, Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  db = inject(SupabaseService);

  constructor() { }

  async obtenerPuntosRanking(idUsuario: number, idJuego: number) {
    return await this.db.supabase.from("ranking").select("*").eq("id_juego", idJuego).eq("id_usuario", idUsuario).order("puntos", { ascending: true });
  }


  async obtenerRanking(idJuego: number) {
    return await this.db.supabase.from("ranking").select("*").eq("id_juego", idJuego).order("puntos", { ascending: false });
  }


  async insertarRanking(idUsuario: number, idJuego: number, puntosActual: number) {
    return await this.db.supabase.from("ranking").insert({ id_usuario: idUsuario, puntos: puntosActual, id_juego: idJuego });
  }

  async actualizarRanking(idUsuario: number, idJuego: number, puntosActual: number) {
    const { data, error, count, status, statusText } = await this.db.supabase.from("ranking").update({ puntos: puntosActual }).eq("id_usuario", idUsuario).eq("id_juego", idJuego);
    console.log("modificar", data, error, count, status, statusText);
    return { data, error, count, status, statusText };
  }

}
