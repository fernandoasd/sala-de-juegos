import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  nombre = 'Fernando Malinowski';
  // edad = 20;
  carrera = 'Tecnicatura Universitaria en Programación';
  juegoNombre = 'Mi juego';
  juegoDescripcion = "Fugiat eu ex id dolor fugiat sint labore laboris cillum aliquip.";
  imagenUrl = 'https://media-eze1-1.cdn.whatsapp.net/v/t61.24694-24/200868439_138683118638729_6122634492130689516_n.jpg?ccb=11-4&oh=01_Q5Aa1gG7PjgXFtGzNhyz6CxYOOTOBgYTdgl9RStZ0rvnZw4e0Q&oe=683CB52A&_nc_sid=5e03e0&_nc_cat=110';
  // imagenUrl = 'https://media.istockphoto.com/id/1495088043/es/vector/icono-de-perfil-de-usuario-avatar-o-icono-de-persona-foto-de-perfil-s%C3%ADmbolo-de-retrato.jpg?s=612x612&w=0&k=20&c=mY3gnj2lU7khgLhV6dQBNqomEGj3ayWH-xtpYuCXrzk='; // Asegúrate de poner tu imagen en esa ruta

}
