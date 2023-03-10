import iziToast from 'izitoast';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscriber, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// import { AuthService } from './auth.service';
// import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private httpOptions: any;

  constructor(
    private router: Router,
    private http: HttpClient,
    ) {

    const token = localStorage.getItem('token') || null
    if (token) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          responseType: ''
        })
      };
    }else {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          responseType: ''
        })
      };
    }
  }

  private handleError(error: HttpErrorResponse) {

    // if (error.status === 401) {
    //   iziToast.warning({
    //     title: 'Lo sentimos',
    //     message: 'Su sesión ha caducado, vuelva a inciar sesión'
    //   });
    //   localStorage.clear();
    //   this.router.navigate(['/auth/login']);
    // }


    const errors = [];
    if (error.error?.errors) {
      for (const key in error.error?.errors) {
        errors.push(error.error?.errors[key]);
      }
    }
    return throwError({
      codetext: error.statusText,
      code: error.status,
      message: error.message
        ? error.message
        : error.error.message
        ? error.error.message
        : error.error.message,
      handleError: true,
      error: error.error,
      errors
    });
  }

  /**
   * @description Optener token de autententication
   * @returns String
   */
  getToken(): string | null
  {
    return localStorage.getItem('token');
  }

  /**
   * @description Optener cabecera por defecto
   * @return HttpHeaders {any}
   */
  getHeader() {
    const token = localStorage.getItem('token') || null
    if (token) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          responseType: ''
        })
      };
    }else {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          responseType: ''
        })
      };
    }

    return this.httpOptions;
  }

  getFileHeaders() {
    const token = 'Bearer ' + this.getToken();
    this.httpOptions.headers.Authorization = token;
    this.httpOptions.headers.responseType = 'Blob';
    this.httpOptions.responseType = 'blob';

    return this.httpOptions;
  }

  /**
   * @description Peticiones por el metodo post
   * @param url string
   * @param data Object
   * @param header? HttpHeaders
   * @return Observable
   */
  post(url: string, data: any, headerOptions?: any): Observable<any> {
    return this.http
      .post(url, data, headerOptions ? headerOptions : this.getHeader())
      .pipe(catchError(this.handleError));
  }

  /**
   * @description Peticiones por el metodo GET
   * @param url string
   * @param header? HttpHeaders
   * @return Observable
   */
  get(url: string, headerOptions?: any): Observable<any> {
    return this.http
      .get(url, headerOptions ? headerOptions : this.getHeader())
      .pipe(catchError(this.handleError));
  }

  /**
   * @description Peticiones por el metodo PUT
   * @param url string
   * @param header? HttpHeaders
   * @return Observable
   */
  put(url: string, data?: any, headerOptions?: any): Observable<any> {
    return this.http
      .put(url, data, headerOptions ? headerOptions : this.getHeader())
      .pipe(catchError(this.handleError));
  }

  /**
   * @description Peticiones por el metodo PUT
   * @param url string
   * @param header? HttpHeaders
   * @return Observable
   */
   patch(url: string, data?: any, headerOptions?: any): Observable<any> {
    return this.http
      .patch(url, data, headerOptions ? headerOptions : this.getHeader())
      .pipe(catchError(this.handleError));
  }

  /**
   * @description Peticiones por el metodo DEL
   * @param url string
   * @param header? HttpHeaders
   * @return Observable
   */
  delete(url: string): Observable<any> {
    return this.http
      .delete(url,this.getHeader())
      .pipe(catchError(this.handleError));
  }
}
