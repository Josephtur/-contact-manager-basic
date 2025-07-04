// Importamos el tipo Route para definir rutas en Angular
import { Routes } from '@angular/router';
import { ContactListComponent } from './contacts/components/contact-list/contact-list.component';
import { ContactAddComponent } from './contacts/components/contact-add/contact-add.component';

// Definimos el array de rutas de la aplicación
export const routes: Routes = [

    // Ruta raiz (vacia): redirige a contacts
    // pathMatch: 'full' indica que la URL debe coincidir exactamente con ''
    { path: '', redirectTo: 'contacts', pathMatch: 'full' },
    
    // Ruta '/contacts': muestra la lista de contactos
    { path: 'contacts', component: ContactListComponent },
    
    // Ruta 'contacts/add': Muestra el formulario para añadir el contacto
    { path: 'contacts/add', component: ContactAddComponent},
    
    // Ruta comidin: ** captura cualer URL no definida y redirige a contacts
    // Util para manejar erroes o rutas invalidas
    { path: '**', redirectTo: 'contacts' }
];
