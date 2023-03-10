import iziToast from 'izitoast';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authSvc: AuthService,
    private router: Router,

  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }

  private checkLogin(): boolean | any
  {
    if (this.authSvc.isLoggedIn()) {
      return true;
    } else {
      iziToast.warning({
        message: 'Usted no tiene permisos para ingresar a esta pagina o su sesión ha caducado'
      });

      this.router.navigate(['/auth/login']);
      return false;
    }
  }

}
