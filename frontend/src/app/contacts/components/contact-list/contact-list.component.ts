// Importamos los módulos y servicios necesarios
import { Component, OnInit } from '@angular/core';             // Decorador y ciclo de vida
import { CommonModule } from '@angular/common';                // Módulo que habilita directivas como *ngIf, *ngFor
import { FormsModule } from '@angular/forms';                  // Para usar [(ngModel)] (enlace bidireccional)
import { ContactService, Contact } from '../../services/contact.service'; // Servicio para operaciones de contactos

@Component({
  selector: 'app-contact-list',         // Nombre del componente usado en HTML <app-contact-list>
  standalone: true,                     // Componente independiente (sin necesidad de declararlo en un módulo)
  imports: [CommonModule, FormsModule], // Importa funcionalidades necesarias para la plantilla
  templateUrl: './contact-list.component.html', // HTML asociado
  styleUrls: ['./contact-list.component.css']   // CSS asociado
})
export class ContactListComponent implements OnInit {
  // Lista de contactos que se mostrará en la tabla
  contacts: Contact[] = [];

  // ID del contacto que se está editando (si hay uno)
  editId: number | null = null;

  // Propiedades que se usan para editar el contacto seleccionado
  name = '';
  email = '';
  phone = '';

  // Indicador de carga (usado para desactivar botón de "Borrar")
  loading = false;

  // Inyectamos el servicio de contactos
  constructor(private svc: ContactService) {}

  // Método del ciclo de vida que se ejecuta al iniciar el componente
  ngOnInit() {
    this.load(); // Carga los contactos al arrancar
  }

  // Método que llama al servicio para obtener todos los contactos
  load() {
    this.svc.getAll().subscribe(list => this.contacts = list);
  }

  // Método que prepara los datos para editar un contacto en línea
  startEdit(c: Contact) {
    this.editId = c.id!;           // Guardamos el ID del contacto que se va a editar
    this.name = c.name;            // Copiamos los datos actuales en las variables
    this.email = c.email;
    this.phone = c.phone || '';    // Si no hay teléfono, dejamos string vacío
  }

  // Método que guarda los cambios en un contacto
  save(c: Contact) {
    // Validamos que nombre y email no estén vacíos
    if (!this.name.trim() || !this.email.trim()) return;

    // Actualizamos los campos del contacto con los nuevos valores
    c.name = this.name;
    c.email = this.email;
    c.phone = this.phone;

    // Enviamos los cambios al servicio y recargamos la lista
    this.svc.update(c).subscribe(() => {
      this.editId = null; // Salimos del modo edición
      this.load();        // Recargamos los datos actualizados
    });
  }

  // Método que cancela la edición de un contacto
  cancel() {
    this.editId = null; // Restablece el estado para salir del modo edición
  }

  // Método que borra un contacto tras confirmación del usuario
  delete(c: Contact) {
    // Confirmamos con el usuario antes de eliminar
    if (!confirm(`¿Borrar a ${c.name}?`)) return;

    this.loading = true; // Indicamos que estamos procesando

    // Llamamos al servicio para eliminar
    this.svc.delete(c.id!).subscribe(() => {
      this.loading = false; // Terminó la operación
      this.load();          // Recargamos la lista sin el contacto borrado
    });
  }
}

