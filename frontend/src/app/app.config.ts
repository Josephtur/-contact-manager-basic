// Importa la configuración de la app y una función para optimizar la detección de cambios
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';

// Importa la función que configura el enrutador (routing)
import { provideRouter } from '@angular/router';

// Importa las rutas de la aplicación
import { routes } from './app.routes';

// Importa el cliente HTTP standalone para hacer peticiones (GET, POST, etc.)
import { provideHttpClient } from '@angular/common/http';

// Configuración principal de la aplicación Angular
export const appConfig: ApplicationConfig = {
  providers: [
    // Mejora el rendimiento agrupando eventos antes de activar detección de cambios
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Proporciona el sistema de enrutamiento con las rutas definidas
    provideRouter(routes),

    // Activa el HttpClient para poder hacer peticiones HTTP en los servicios
    provideHttpClient()
  ]
};