import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent {

  encuesta = new FormGroup({
    nombre: new FormControl("---", {
      validators: [
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.required],
    }),
    apellido: new FormControl("---", {
      validators: [
        Validators.minLength(3),
        Validators.maxLength(15),
        Validators.required],
    }),
    edad: new FormControl("", {
      validators: [
        Validators.required,
        Validators.min(18),
        Validators.max(99)
      ]
    }),
    telefono: new FormControl("", {
      validators: [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.maxLength(10)
      ]
    }),
  })

  enviar() {
    console.log(this.encuesta);
    if (this.encuesta.valid) {
      console.log("Se puede enviar");

      Swal.fire({
        title: "Enviar",
        text: "¿Desea enviar la encuesta?",
        showDenyButton: true,
        icon: 'question',
        confirmButtonText: "Enviar",
        denyButtonText: `Cancelar`
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Enviada", "Gracias por responder.", 'success');
        }
      });

    } else {
      console.log("No se puede enviar");
      Swal.fire({
        icon: 'warning',
        title: "Error",
        text: "Compruebe los campos requeridos",
        draggable: true
      });
    }
  }
}
