import { Component, inject, OnInit, signal } from '@angular/core';
import { MensajeService } from '../../services/mensaje.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-chat',
  imports: [FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit{
  db = inject(MensajeService);
  sp = inject(SupabaseService);
  auth = inject(AuthService);
  mensajes = signal<any>([]);
  nuevo_mensaje: string = "";

  constructor() {
    this.db.traerTodos().then((data) => {
      this.mensajes.set([data]);
    })
  }

  ngOnInit() {
    // schema-db-changes -> schema public
    // table-db-changes -> tabla mensajes
    const canal = this.sp.supabase.channel("schema-db-changes").
    on("postgres_changes",
      {
        // event: * (todos), INSERT, UPDATE, DELETE
        event: "*",
        schema: "public",
      },
      async (cambios: any) => {
        console.log(cambios);
        const {data} = await this.sp.supabase.from("usuarios").select("nombre").eq("id", cambios.new["id_usuario"]);
        cambios.new.usuarios = { nombre: data![0].nombre};

        this.mensajes.update((valor_anterior) => {
          valor_anterior.push(cambios.new);
          return valor_anterior;
        })
      }
    );
    canal.subscribe();
  }

  enviar() {
    if (this.auth.usuarioActual != null) {
      this.db.insertar(this.nuevo_mensaje, 2);
      this.nuevo_mensaje = "";
    }
    else {
      console.log("Usuario no registrado");
    }
  }
}