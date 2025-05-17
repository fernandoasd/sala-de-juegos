import { Routes } from '@angular/router';


// Ruteo Hijo -> mostrar una ruta y sus hijas
//Los componentes no se carguen todos juntos
// denegar o permitir la denegacion de ciertas paginas

export const routes: Routes = [
    {
        path: "home", title: "Sala de Juegos",loadComponent: () => import("./pages/home/home.component").then((archivo) => archivo.HomeComponent)
    },
    { path: "about", title: "About Me",loadComponent: () => import("./pages/about/about.component").then((archivo) => archivo.AboutComponent)
     },
    { path: "login", title: "Login", loadComponent: () => import("./pages/login/login.component").then((archivo) => archivo.LoginComponent)
    },
    { path: "listado", title: "Listado", loadComponent: () => import("./pages/lista-juegos/lista-juego.component").then((archivo) => archivo.ListaJuegoComponent) },
    { path: "registro", title: "Registro", loadComponent: () => import("./pages/registro/registro.component").then((archivo) => archivo.RegistroComponent) },
    {
        path: "juegos", title: "Juegos", loadComponent: () => import("./pages/juegos/juegos.component").then((archivo) => archivo.JuegosComponent) ,
        loadChildren: () => import("./pages/juegos/juegos.routes").then((archivo) => archivo.routes),
    },
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "**", title: "Error 404", loadComponent: () => import("./pages/error/error.component").then((archivo) => archivo.ErrorComponent) }, //wildcard route 404 page
];
