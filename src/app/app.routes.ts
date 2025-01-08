import { Routes } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [OktaAuthGuard]
  },
  {
    path: 'login/callback',
    component: OktaCallbackComponent
  }
];
