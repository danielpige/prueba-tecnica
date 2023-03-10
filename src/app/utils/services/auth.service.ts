import iziToast from 'izitoast';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { Endpoint } from 'src/app/shared/endpoints';
import { User, UserLogin } from 'src/app/interfaces/user.interface';
import { UserR, UserResponse } from 'src/app/interfaces/userResponse.interface';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user = new BehaviorSubject<UserR | null>(null);

  get user$(): Observable<UserR | null>
  {
    return this.user.asObservable();
  }
  get  userValue(): UserR | null
  {
    return this.user.getValue();
  }

  constructor(
    private globalSvc: GlobalService,
    private router: Router,
    private secureStorage: LocalStorageService
  ) {
    this.verifySession();
  }

  register(data: User): Observable<UserR>
  {
    return this.globalSvc.post(Endpoint.AUTH.REGISTER, data).pipe(
      map((res: UserResponse) => {

        localStorage.setItem('token', res.token);
        this.secureStorage.setJsonValue('user', res.usuario);
        this.user.next(res.usuario);

        return res.usuario;
      })
    );
  }

  login(data: UserLogin): Observable<UserR>
  {
    return this.globalSvc.post(Endpoint.AUTH.LOGIN, data).pipe(
      map((res: UserResponse) => {

        localStorage.setItem('token', res.token);
        this.secureStorage.setJsonValue('user', res.usuario);
        this.user.next(res.usuario);
        return res.usuario;
      })
    );
  }

  isLoggedIn(): boolean
  {
    const token: string | null = localStorage.getItem('token') || null;
    if (token) {
      return true
    }else {
      return false;
    }
  }

  signOut(): void
  {
    this.user.next(null);
    localStorage.removeItem('token');
    this.secureStorage.clearToken('user');
    this.router.navigate(['/auth/login']);
  }

  verifySession(): void
  {
    const token: string | null = localStorage.getItem('token') || null;
    const user: UserR | null = this.secureStorage.getJsonValue('user');

    if (user) {
      if (!token) {
        iziToast.info({
          message: 'Su sesión ha caducado'
        });
        this.signOut();
      }else {
        this.user.next(user);
      }
    }
  }
}
