import { inject, Injectable } from '@angular/core';
import { Auto } from '../classes/auto';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  db = inject(SupabaseService);
  tablaAutos;

  constructor() {

    this.tablaAutos = this.db.supabase.from("autos")
    console.log(this.db);
  }

  async listar() {
    //SELECT marca, precio FROM AUTOS where precio < 1000
    //lt = less than <
    //gt = greater than >
    //gte | lte = equal | >= | <=
    //eq = equal | ===
    //limit
    //offset
    const { data, error, count, status, statusText } = await this.tablaAutos.select("*").lt("precio", 1000);
    const autos = data as Auto[]; //de esta forma data va a ser un array de Autos
    console.log("listar", autos, error, count, status, statusText);
    return autos;
  }

  async crear(auto: Auto) {
    const { data, error, count, status, statusText } = await this.tablaAutos.insert(auto);
    console.log("crear", data, error, count, status, statusText);
  }

  async modificar(auto: Auto) {
    // UPDATE ... where id = n
    const { data, error, count, status, statusText } = await this.tablaAutos.update(auto).eq("id", auto.id);
    console.log("modificar", data, error, count, status, statusText);
  }

  async eliminar(id?: number) {
    if (id === undefined) return;
    const { data, error, count, status, statusText } = await this.tablaAutos.delete().eq("id", id);
    console.log("eliminar", data, error, count, status, statusText);
  }
}

/*Los servicios son de instancia única */
