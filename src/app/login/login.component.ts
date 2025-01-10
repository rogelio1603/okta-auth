import { Component, OnInit } from '@angular/core';
import { OktaAuthStateService } from '@okta/okta-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  template: '<p>loging in...</p>'
})
export class LoginComponent implements OnInit {
  constructor(
    private oktaStateService: OktaAuthStateService,
    private router: Router
  ) {}

  ngOnInit() {
    this.oktaStateService.authState$.subscribe((authState) => {
      if (authState.isAuthenticated) {
        this.router.navigate(['/']);
      }
    });
  }
} 