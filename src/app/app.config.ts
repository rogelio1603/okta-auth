import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { OktaAuthModule, OKTA_AUTH, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { oktaConfig } from './auth-config';

const oktaAuth = new OktaAuth(oktaConfig);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(OktaAuthModule),
    { provide: OKTA_AUTH, useValue: oktaAuth },
    { provide: OKTA_CONFIG, useValue: { oktaAuth } }
  ]
};
