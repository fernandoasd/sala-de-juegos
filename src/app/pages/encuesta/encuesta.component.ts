import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-encuesta',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent {
  auth = inject(AuthService);
  sb = inject(SupabaseService);

  usuarioActual = signal<any[] | null>([]);
  encuesta: FormGroup | null = null;
  encuestaCargada = signal<boolean>(false);

  async ngOnInit() {
    let mailUsuariOActual = this.auth.usuarioActual?.email;
    this.usuarioActual.set((await this.auth.usuariosService.buscarUsuarioMail(mailUsuariOActual!)).data);
    console.log("usuario: ", this.usuarioActual()![0]);
    if (this.usuarioActual()![0]) {
      this.cargarEncuesta();
    }
    else {

      console.log("usuario no guardado en la BBDD");
    }
  }


  cargarEncuesta() {
    this.encuesta = new FormGroup({
      nombre: new FormControl({ value: this.usuarioActual()![0].nombre || "---", disabled: this.usuarioActual()![0].nombre || false }, {
        validators: [
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.required],
      }),
      apellido: new FormControl({ value: this.usuarioActual()![0].apellido || "---", disabled: this.usuarioActual()![0].apellido || false }, {
        validators: [
          Validators.minLength(3),
          Validators.maxLength(15),
          Validators.required],
      }),
      edad: new FormControl({ value: this.usuarioActual()![0].edad || "---", disabled: this.usuarioActual()![0].edad || false }, {
        validators: [
          Validators.required,
          Validators.min(18),
          Validators.max(99)
        ]
      }),
      telefono: new FormControl({ value: this.usuarioActual()![0].telefono || "12345678", disabled: this.usuarioActual()![0].telefono || false }, {
        validators: [
          Validators.required,
          Validators.pattern(/^\d+$/),
          Validators.maxLength(10)
        ]
      }),
      juegoFavorito: new FormControl("", {
        validators: [
          Validators.required,
        ]
      }),
      recomiendaPagina: new FormControl(false),
      comentario: new FormControl("", {
        validators: [
          Validators.required,
        ]
      }),
    })
    this.encuestaCargada.set(true);
  }


  async enviar() {
    this.encuesta?.markAllAsTouched(); 
    console.log(this.encuesta);
    if (this.encuesta!.valid) {
      console.log("Se puede enviar");

      Swal.fire({
        title: "Enviar",
        text: "¿Desea enviar la encuesta?",
        showDenyButton: true,
        icon: 'question',
        confirmButtonText: "Enviar",
        denyButtonText: `Cancelar`
      }).then((result) => {
        if (result.isConfirmed) {
          this.guardarEncuesta().then(([data, error])=>{
            Swal.fire("Enviada", "Gracias por responder.", 'success');
            console.log("data ", data);
            console.log("error ", error);
          });
        }
      });

    } else {
      Swal.fire({
        icon: 'warning',
        title: "Error",
        text: "Compruebe los campos requeridos"
      });
    }
  }

  async guardarEncuesta(){
    console.log(this.encuesta);
    console.log("nombre", this.encuesta?.get("nombre")?.value);
    console.log("recomiendaPagina", this.encuesta?.get("recomiendaPagina")?.value);

    const {data, error} = await this.sb.supabase.from("encuestas").insert({id_usuario: this.usuarioActual()![0].id, juegoFavorito: this.encuesta?.get("juegoFavorito")?.value, recomiendaPagina: this.encuesta?.get("recomiendaPagina")?.value, comentario: this.encuesta?.get("comentario")?.value});
    console.log(data);
    return [data, error];
  }
}
