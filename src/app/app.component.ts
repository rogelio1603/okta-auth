import { Component, Inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <nav style="display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; background-color: #f0f0f0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
      <div style="font-weight: bold; font-size: 1.2rem;">
        Portal
      </div>
      <div style="display: flex; gap: 1rem;">
        <button 
          (click)="navigateTo('/')"
          style="padding: 0.5rem 1rem; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; transition: background-color 0.3s;"
          onmouseover="this.style.backgroundColor='#0056b3'"
          onmouseout="this.style.backgroundColor='#007bff'">
          Angular App
        </button>
        <button 
          (click)="navigateTo('/next-portal')"
          style="padding: 0.5rem 1rem; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer; transition: background-color 0.3s;"
          onmouseover="this.style.backgroundColor='#218838'"
          onmouseout="this.style.backgroundColor='#28a745'">
          Next.js App
        </button>
      </div>
    </nav>
      <h1>Gainwell Angular</h1>
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
  private codeVerifier: string;

  constructor(
    oktaStateService: OktaAuthStateService,
    @Inject(OKTA_AUTH) private oktaAuth: OktaAuth
  ) {
    this.authState$ = oktaStateService.authState$;
    this.codeVerifier = this.generateCodeVerifier();
  }

  // Generate a random code verifier
  private generateCodeVerifier(): string {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return base64URLEncode(array);
  }

  // Generate code challenge from verifier
  private async generateCodeChallenge(verifier: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return base64URLEncode(new Uint8Array(digest));
  }

  async login() {
    const codeChallenge = await this.generateCodeChallenge(this.codeVerifier);
    
    // Store code verifier in sessionStorage for the callback
    sessionStorage.setItem('pkce_code_verifier', this.codeVerifier);
    sessionStorage.setItem('pkce_code_challenge', codeChallenge);

    // Add PKCE parameters to the signInWithRedirect call
    await this.oktaAuth.signInWithRedirect({
      codeChallengeMethod: 'S256',
      codeVerifier: this.codeVerifier,
      codeChallenge: codeChallenge
    });
  }

  async logout() {
    await this.oktaAuth.signOut();
  }

  // Método para la navegación
  navigateTo(path: string) {
    window.location.href = `http://localhost${path}`;
  }
}

// Helper function for base64URL encoding
function base64URLEncode(buffer: ArrayBuffer | Uint8Array): string {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
  return base64;
}
