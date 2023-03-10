import iziToast from 'izitoast';
import { LocalStorageService } from './../services/local-storage.service';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InterceptRequestsService {

  constructor(
    private router: Router,
    private secureStorage: LocalStorageService
  ) { }

  // intercept request and add headers
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone();

    if (!request.headers.get('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }

    if (!request.headers.get('Authorization')) {

      const token = localStorage.getItem('token') || null;
      if (token) {
        request = request.clone({
          setHeaders: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
      }
    }

    return next.handle(request)
      .pipe(
        tap(event => {

        }, error => {

          console.log(error);

          if (error.status === 401) {
            iziToast.warning({
              title: 'Token invalido',
              message: 'Su sesión ha caducado'
            })
            this.secureStorage.clearToken('user');
            localStorage.removeItem('token');
            this.router.navigate(['/auth/login']);
          }
        })
      );
  }
}
