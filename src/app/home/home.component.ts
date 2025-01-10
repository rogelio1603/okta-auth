import { Component, OnInit, Inject } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { CommonModule } from '@angular/common';
import { OktaAuth, AuthState } from '@okta/okta-auth-js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  template: `
  `,
  standalone: true,
  imports: [CommonModule]
})
export class HomeComponent implements OnInit {
  authState$: Observable<AuthState>;
  userInfo: any;

  constructor(
    private oktaStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) {
    this.authState$ = this.oktaStateService.authState$;
  }

  async ngOnInit() {
    this.authState$.subscribe(async (state: any) => {
      if (state?.isAuthenticated) {
        const userClaims = await this.oktaAuth.getUser();
        const accessToken = await this.oktaAuth.getAccessToken();
        
        this.userInfo = {
          nombre: userClaims.name,
          email: userClaims.email,
          token: accessToken
        };
        
        console.log('Token:', accessToken);
        console.log('Usuario:', userClaims);
      }
    });
  }

  async login() {
    try {
      await this.oktaAuth.signInWithRedirect();
    } catch (error) {
      console.error('Error durante el login:', error);
    }
  }

  async logout() {
    try {
      await this.oktaAuth.signOut();
    } catch (error) {
      console.error('Error durante el logout:', error);
    }
  }
} 