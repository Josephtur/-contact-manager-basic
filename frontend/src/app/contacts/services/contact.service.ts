// Este decorador marca la clase como "inyectable", lo que permite que Angular la gestione como un servicio
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interfaz que define cómo debe lucir un objeto de tipo Contact
export interface Contact {
  id?: number; // ID opcional del contacto (puede estar presente o no)
  name: string; // nombre de contacto obligatorio
  email: string; // email de contacto obligatorio
  phone: string; // telefono (opcional)
}

// Decorador que indica que este servicio será proporcionado a nivel de aplicación (singleton)
@Injectable({
  providedIn: 'root' // Hace que Angular cree una única instancia del servicio para toda la app
})
export class ContactService {
  // URL base de la api json server donde se gestionan los contactos
 private api = 'http://localhost:3001/contacts' 
  // Constructor del servicio. Aquí se pueden inyectar dependencias como HttpClient, etc.
  constructor(private http: HttpClient) {}
  // Aquí irían los métodos para acceder a contactos: getAll(), create(), update(), delete(), etc.

//obtiene todos los contactos
// observable que emite un array de Contact

  getAll(): Observable<Contact[]>{
    return this.http.get<Contact[]>(this.api);
  } 



  add(c: Contact): Observable<Contact>{
    return this.http.post<Contact>(this.api, c);
  }

  update(c: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.api}/${c.id}`, c);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.api}/${id}`)
  }



}