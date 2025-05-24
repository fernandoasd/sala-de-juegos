import { Routes } from "@angular/router";
import { AhorcadoComponent } from "./ahorcado/ahorcado.component";
import { MayorOMenorComponent } from "./mayor-omenor/mayor-omenor.component";
import { MiJuegoComponent } from "./mi-juego/mi-juego.component";
import { PreguntadosComponent } from "./preguntados/preguntados.component";
import { HttpExamppleComponent } from "./http-exampple/http-exampple.component";
import { MayorMenorComponent } from "./mayor-menor/mayor-menor.component";

const routes: Routes = [
    { path: "ahorcado", title: "Ahorcado", component: AhorcadoComponent },
    { path: "mayor-o-menor", title: "Mayor o Menor", component: MayorOMenorComponent },
    { path: "preguntados", title: "Preguntados", component: PreguntadosComponent },
    { path: "miJuego", title: "Mi Juego", component: MiJuegoComponent },
    { path: "httpExample", title: "Ejemplo HTTP", component: HttpExamppleComponent },
    { path: "mayor-menor", title: "mayor-menor", component: MayorMenorComponent }


]

export { routes };
