import { Routes } from '@angular/router';
import { logueadoGuard } from './guards/logueado.guard';
import { AboutComponent } from './pages/about/about.component';
// import { noLogueadoGuardGuard } from './guards/no-logueado-guard.guard';


// Ruteo Hijo -> mostrar una ruta y sus hijas
//Los componentes no se carguen todos juntos
// denegar o permitir la denegacion de ciertas paginas

export const routes: Routes = [
    {
        path: "",
        redirectTo: "registro",
        pathMatch: "full"
    },
    {
        path: "home",
        title: "Sala de Juegos",
        loadComponent: () => import("./pages/home/home.component").then((archivo) => archivo.HomeComponent),
    },
    {
        path: "about",
        title: "About Me",
        loadComponent: () => import("./pages/about/about.component").then((archivo) => archivo.AboutComponent)
    },
    {
        path: "login",
        title: "Login",
        loadComponent: () => import("./pages/login/login.component").then((archivo) => archivo.LoginComponent),
    },
    {
        path: "listado",
        title: "Listado",
        loadComponent: () => import("./pages/lista-juegos/lista-juego.component").then((archivo) => archivo.ListaJuegoComponent)
    },
    {
        path: "chat",
        title: "Chat",
        loadComponent: () => import("./pages/mensajeria/mensajeria.component").then((archivo) => archivo.MensajeriaComponent),
        canActivate: [logueadoGuard]
    },
    {
        path: "registro",
        title: "Registro",
        loadComponent: () => import("./pages/registro/registro.component").then((archivo) => archivo.RegistroComponent),

    },
    {
        path: "juegos", title: "Juegos", loadComponent: () => import("./pages/juegos/juegos.component").then((archivo) => archivo.JuegosComponent),
        loadChildren: () => import("./pages/juegos/modulo-juegos/modulo-juegos.module").then((archivo) => archivo.ModuloJuegosModule),
        canActivate: [logueadoGuard]
    },
    {
        path: "encuesta",
        title: "Encuesta",
        loadComponent: () => import("./pages/encuesta/encuesta.component").then((archivo) => archivo.EncuestaComponent),
        canActivate: [logueadoGuard]

    },
    {
        path: "**",
        title: "Error 404",
        loadComponent: () => import("./pages/error/error.component").then((archivo) => archivo.ErrorComponent)
    }, //wildcard route 404 page
];
