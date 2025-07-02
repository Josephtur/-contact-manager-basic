// Importa el tipo Routes de @angular/router, que sirve para definir las rutas de la aplicación
import { Routes } from '@angular/router';

// Importa el componente ContactListComponent (para mostrar la lista de contactos)
import { ContactListComponent } from './contacts/components/contact-list/contact-list.component';

// Importa el componente ContactAddComponent (para añadir un nuevo contacto)
import { ContactAddComponent } from './contacts/components/contact-add/contact-add.component';

// Define el arreglo de rutas que usará el módulo de enrutamiento de Angular
export const routes: Routes = [

    // Ruta por defecto: si la URL está vacía, redirige a 'contacts'
    { path: '', redirectTo: 'contacts', pathMatch: 'full' },

    // Ruta que muestra la lista de contactos, usando el componente ContactListComponent
    { path: 'contacts', component: ContactListComponent },

    // Ruta para agregar un nuevo contacto, usando el componente ContactAddComponent
    { path: 'contact/add', component: ContactAddComponent },

    // Ruta comodín: si no se encuentra ninguna coincidencia, redirige a 'contacts'
    { path: '**', redirectTo: 'contacts' }
];
