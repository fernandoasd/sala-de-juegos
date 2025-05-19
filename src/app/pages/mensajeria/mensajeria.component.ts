import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { MensajeService } from '../../services/mensaje.service';

@Component({
  selector: 'app-mensajeria',
  imports: [FormsModule, CommonModule],
  templateUrl: './mensajeria.component.html',
  styleUrl: './mensajeria.component.css'
})
export class MensajeriaComponent implements OnInit {
  // cliente = inject(ChatService);
  mensajesService = inject(MensajeService);
  sb = inject(SupabaseService);
  auth = inject(AuthService);
  usuarioService = inject(UsuarioService);
  new_mensaje: string = "";
  nombreActual: string = "";
  id_usuario: number = 0;

  mensajes = signal<any[]>([]);


  constructor(private cdr: ChangeDetectorRef) { 
    this.mensajesService.traerTodos().then((data) =>{
      this.mensajes.set([...data]);
    });
  }

  async ngOnInit() {
    const canal = this.sb.supabase.channel("db-changes")
      .on("postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "mensajes"
        },
        async (payload: any) => {
          console.log("cambios: ", payload);
          const {data, error} = await this.usuarioService.buscarUsuarioId(payload.new["id_usuario"]);
          console.log("data: ", data);
          this.nombreActual = data![0].nombre;
          this.id_usuario = data![0].id;
          payload.new.usuarios = {nombre: data![0].nombre, id: data![0].id}
          this.mensajes.update((valorAnterior) => {
            valorAnterior.push(payload.new);
            return valorAnterior;
          })
          // this.mensajes.update((valor_anterior) => {
          //   let usuarios: { [key: string]: any } = {};
          //   usuarios["id"] = this.usuario.usuarioActual[0]["id"];
          //   usuarios["nombre"] = this.usuario.usuarioActual[0]["nombre"];
          //   let antes = payload.new = {
          //     ...payload.new,
          //     usuarios
          //   };
          //   valor_anterior.push(antes);
          //   console.log(payload);
          //   return valor_anterior;
          // })
          console.log("Mensajes: ");
          console.log(this.mensajes());
          this.cdr.detectChanges();
        })
      .subscribe();
  }



  async enviarMensajes() {
    if (this.auth.usuarioActual) {
      console.log("mi email", this.auth.usuarioActual.email);
      const usuario = await this.usuarioService.buscarUsuarioMail(this.auth.usuarioActual.email!)
      .then((data) => {
        console.log("enviar, data", data);
        this.mensajesService.insertar(this.new_mensaje, data![0].id);
        this.new_mensaje = "";
      });
    }
  }

}
