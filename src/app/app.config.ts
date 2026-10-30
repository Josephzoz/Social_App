import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { headerInterceptor } from './core/interceptors/Header/header-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,withViewTransitions() ,withInMemoryScrolling({scrollPositionRestoration:'top',anchorScrolling:'enabled'})),
    provideHttpClient(withFetch(),withInterceptors([headerInterceptor]))
  ]
};
