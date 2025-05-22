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
  supabaseService = inject(SupabaseService);
  auth = inject(AuthService);
  usuarioService = inject(UsuarioService);
  new_mensaje: string = "";
  nombreActual: string = "";
  miId: number = 0;

  mensajes = signal<any[]>([]);


  constructor(private cdr: ChangeDetectorRef) {
    // this.mensajesService.traerTodos().then((data) =>{
    //   this.mensajes.set([...data]);
    // });
  }

  async ngOnInit() {
    // Obtener mensajes existentes
    this.miId = (await this.supabaseService.obtenerUsuarioMail(this.auth.usuarioActual?.email!)).data![0].id;
    console.log("miId: ---------------------------------", this.miId);
    this.supabaseService.obtenerMensajes().then(({ data, error }) => {
      console.log("data", data);
      this.mensajes.set([...data as any[]]);
    });
    // Suscribirse al canal para escuchar nuevos mensajes
    this.supabaseService.onMensajesInsert((nuevo) => {
      if (nuevo) {
        this.supabaseService.supabase.from("usuarios").select("*").eq("id", nuevo.id_usuario)
      .then(({ data, error }) => {
        console.log("nuevo.id_usuario: ---------------------------------", nuevo.id_usuario);

        console.log();
        console.log("enviar, data", data);
        this.mensajes.update((mensajeAnterior)=>{
          nuevo["usuarios"] = {
            id: data![0].id,
            nombre: data![0].nombre
          }
          console.log("nuevo:  ", nuevo);
          mensajeAnterior.push(nuevo);
          console.log("nuevo mensaje", mensajeAnterior);
          this.cdr.detectChanges();
        return mensajeAnterior;
        });
        return data;
      });
        
      } else {
        console.warn('payload.new vacío');
      }
    });
  };

  async enviarMensajes() {
  if (this.auth.usuarioActual) {
    console.log("mi email", this.auth.usuarioActual.email);
    await this.supabaseService.obtenerUsuarioMail(this.auth.usuarioActual.email!)
      .then(({ data, error }) => {
        this.miId = data![0].id;
        this.nombreActual = data![0].nombre;
        console.log("enviar, data", data);
        this.mensajesService.insertar(this.new_mensaje, data![0].id);
        this.new_mensaje = "";
        return data;
      });
  }
}


  // const canal = this.sb.supabase.channel("db-changes")
  //   .on("postgres_changes",
  //     {
  //       event: "*",
  //       schema: "public",
  //       table: "mensajes"
  //     },
  //     async (payload: any) => {
  //       console.log("cambios: ", payload);
  //       console.log("id_usuario: ", payload.new.id_usuario);
  //       const {data} = await this.usuarioService.buscarUsuarioId(payload.new.id_usuario)
  //       .then((data) => {
  //         console.log("data: ", data);
  //         return data;
  //       });
  //       this.nombreActual = data![0].nombre;
  //       this.id_usuario = data![0].id;
  //       payload.new.usuarios = {nombre: data![0].nombre, id: data![0].id}
  //       this.mensajes.update((valorAnterior) => {
  //         valorAnterior.push(payload.new);
  //         return valorAnterior;
  //       });
  //       // this.mensajes.update((valor_anterior) => {
  //       //   let usuarios: { [key: string]: any } = {};
  //       //   usuarios["id"] = this.usuario.usuarioActual[0]["id"];
  //       //   usuarios["nombre"] = this.usuario.usuarioActual[0]["nombre"];
  //       //   let antes = payload.new = {
  //       //     ...payload.new,
  //       //     usuarios
  //       //   };
  //       //   valor_anterior.push(antes);
  //       //   console.log(payload);
  //       //   return valor_anterior;
  //       // })
  //       console.log("Mensajes: ");
  //       console.log(this.mensajes());
  //       this.cdr.detectChanges();
  //     })
  //   .subscribe();
}





//   async ngOnInit() {
//     // Obtener mensajes existentes
//     this.supabaseService.obtenerMensajes().then(({ data, error }) => {
//       console.log("data", data);
//       this.mensajes.set([...data as any[]]);
//     });
//     // Suscribirse al canal para escuchar nuevos mensajes
//     this.supabaseService.onMensajesInsert((nuevo) => {
//       if (nuevo) {
//         this.mensajes.update((mensajeAnterior)=>{
//           mensajeAnterior.push(nuevo);
//         return mensajeAnterior;
//         });
//       } else {
//         console.warn('payload.new vacío');
//       }
//     });
//   };

//   async enviarMensajes() {
//   if (this.auth.usuarioActual) {
//     console.log("mi email", this.auth.usuarioActual.email);
//     await this.supabaseService.obtenerUsuarioMail(this.auth.usuarioActual.email!)
//       .then(({ data, error }) => {
//         console.log("enviar, data", data);
//         this.mensajesService.insertar(this.new_mensaje, data![0].id);
//         this.new_mensaje = "";
//         return data;
//       });
//   }
// }