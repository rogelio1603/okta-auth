import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <h1>Mi Aplicación con Okta</h1>
    <div *ngIf="(authState$ | async) as authState">
      <button *ngIf="!authState?.isAuthenticated" (click)="login()">Login</button>
      <button *ngIf="authState?.isAuthenticated" (click)="logout()">Logout</button>
    </div>
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [RouterModule, CommonModule]
})
export class AppComponent {
  public authState$: Observable<AuthState>;

  constructor(
    oktaStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) {
    this.authState$ = oktaStateService.authState$;
  }

  async login() {
    await this.oktaAuth.signInWithRedirect();
  }

  async logout() {
    await this.oktaAuth.signOut();
  }
}
