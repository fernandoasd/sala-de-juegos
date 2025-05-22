import { Component, inject, Signal, signal } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-http-exampple',
  imports: [FormsModule, CommonModule],
  templateUrl: './http-exampple.component.html',
  styleUrl: './http-exampple.component.css'
})
export class HttpExamppleComponent {
  httpService = inject(HttpService);
  datos=  signal<any[]>([]);

  ngOnInit() {
    const texto = this.httpService.prueba();
    console.log(texto);
    const subscription = this.httpService.traerDatosClima().subscribe((respuesta) => {
      console.log("Respuesta: ");
      console.log(respuesta);
      this.datos.set([respuesta]);
      console.log("desuscribime...");
      subscription.unsubscribe();
    });
  }
}
