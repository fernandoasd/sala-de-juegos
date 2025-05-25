import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimpsonsService {
public httpCliente = inject(HttpClient);
private link = "https://thesimpsonsquoteapi.glitch.me/quotes";

  constructor() { 

  }

  traerPersonajeRandom(){
    return this.httpCliente.get(this.link+"?count=3").pipe(
      catchError(error => {
        console.log("error: ", error);
        return error;
      })
    );
  }
}
