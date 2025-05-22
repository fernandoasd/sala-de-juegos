import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private httpClient = inject(HttpClient);

  constructor() { 
    const observable = this.httpClient.get<any>("https://goweather.xyz/weather/"+"Avellaneda")
  
    // observable.subscribe((respuesta) => {
    //   console.log("API");
    //   console.log(respuesta);
    // })
  }

  traerDatosClima(){
    const observable = this.httpClient.get<any>("https://goweather.xyz/weather/"+"Avellaneda");
    return observable;
  }

  prueba(){
    return "esto es una prueba";
  }
}
