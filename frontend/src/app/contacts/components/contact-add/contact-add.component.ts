import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-add', // etiqueta HTML con la que invocamos
  imports: [CommonModule, FormsModule], // Modulos que utiliza este component
  templateUrl: './contact-add.component.html', // ruta al archivo html
  styleUrl: './contact-add.component.css' //ruta al archivo css de estilos
})


export class ContactAddComponent {
  // propiedades del componente - enlazado con [(ngModel)]
  name = ''; // nombre del nuevo contacto
  email = ''; //email del nuevo contacto
  phone = ''; // telefono del nuevo contacto

  // inyeccion de dependencias
  // svc : instancia de contactservice para llamar a la api o logica de datos
  // router. instancia de router para redirigir tras guardar
  constructor (
    private svc: ContactService,
    private route: Router
  ){}

  // metodo que se ejecuta al enviar el formulario (NgSubmit)=save()
  save() {
    // validacion basica en TS ademas de la validacion en el template
    if (!this.name.trim() || !this.email.trim()){
      // si name o email estan vacios o solo espacios 
      alert('Nombre y email obligatorios');
      return;
    }

    // Llamada al servicio para añadir el contacto

    this.svc
      .add({
        name: this.name,
        email: this.email,
        phone: this.phone
      })
 //cuando el observable indica que ha recbido los datos el suscribe ejecutara el redireccionamiento 
      .subscribe(() => {
        this.route.navigate(['/contacts']); // redirige a la lista de contactos
      });

  }
}
