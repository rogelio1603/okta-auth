import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { oktaConfig } from './auth-config';

const oktaAuth = new OktaAuth(oktaConfig);

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login/callback', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    OktaAuthModule.forRoot({ oktaAuth })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }