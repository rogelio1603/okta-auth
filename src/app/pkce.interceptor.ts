import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class PKCEInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only add headers for auth-related requests
    if (request.url.includes('/auth/')) {
      const codeVerifier = sessionStorage.getItem('pkce_code_verifier');
      
      if (codeVerifier) {
        request = request.clone({
          setHeaders: {
            'X-Code-Verifier': codeVerifier
          }
        });
      }
    }
    
    return next.handle(request);
  }
} 