import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TopNavigationComponent } from './components/top-navigation/top-navigation.component';

@Component({
  selector: 'app-root',
  template: `
    <app-top-navigation></app-top-navigation>
    
    <div style="margin-top: 80px;"> <!-- Añadido para compensar el navbar fijo -->
      <h1>Gainwell Angular</h1>
      <div *ngIf="(authState$ | async) as authState">
        <button *ngIf="!authState?.isAuthenticated" (click)="login()">Login</button>
        <button *ngIf="authState?.isAuthenticated" (click)="logout()">Logout</button>
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  standalone: true,
  imports: [RouterModule, CommonModule, TopNavigationComponent]
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
