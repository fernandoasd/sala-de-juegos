import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from '../ahorcado/ahorcado.component';
import { DinoRunnerComponent } from '../dino-runner/dino-runner.component';
import { HttpExamppleComponent } from '../http-exampple/http-exampple.component';
import { MayorMenorComponent } from '../mayor-menor/mayor-menor.component';
import { MiJuegoComponent } from '../mi-juego/mi-juego.component';
import { PreguntadosComponent } from '../preguntados/preguntados.component';

const routes: Routes = [
      { path: "ahorcado", title: "Ahorcado", component: AhorcadoComponent },
      { path: "preguntados", title: "Preguntados", component: PreguntadosComponent },
      { path: "miJuego", title: "Mi Juego", component: MiJuegoComponent },
      { path: "httpExample", title: "Ejemplo HTTP", component: HttpExamppleComponent },
      { path: "mayor-menor", title: "mayor-menor", component: MayorMenorComponent },
      { path: "dino-runner", title: "dino-runner", component: DinoRunnerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuloJuegosRoutingModule { }
