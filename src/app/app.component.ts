import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DatabaseService } from './services/database.service';
import { Auto } from './classes/auto';
import { AuthService } from './services/auth.service';
import { FooterComponent } from './pages/footer/footer.component';
import { NavbarComponent } from "./pages/navbar/navbar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'saladejuegos';
  databaseService = inject(DatabaseService);
  sp = inject(AuthService);
  auth = inject(AuthService);
  
  constructor() {
    let auto = new Auto("Ford", "Falcon", 900)
    // this.databaseService.crear(auto);
    // auto.id = -1;
    // auto.marca = "Venture";
    // this.databaseService.modificar(auto);
    // this.databaseService.eliminar(-1);
    // this.databaseService.listar();
  }

  cerrarSesion() {
    this.sp.cerrarSesion();
  }

}
