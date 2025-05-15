import { Routes} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { ErrorComponent } from './components/error/error.component';
import { ListadoComponent } from './components/listado/listado.component';
import { RegistroComponent } from './components/registro/registro.component';

export const routes: Routes = [
    {path: "home", title: "Sala de Juegos", component: HomeComponent},
    {path: "about", title: "About Me", component: AboutComponent},
    {path: "login",title: "Login", component: LoginComponent},
    {path: "listado",title: "Listado", component: ListadoComponent},
    {path: "registro",title: "Registro", component: RegistroComponent},
    {path: "", redirectTo: "/home", pathMatch:"full"},
    {path: "**",title: "Error 404", component: ErrorComponent}, //wildcard route 404 page
];
