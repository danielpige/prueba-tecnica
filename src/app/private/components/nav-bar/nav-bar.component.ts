import iziToast from 'izitoast';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserR } from 'src/app/interfaces/userResponse.interface';
import { AuthService } from 'src/app/utils/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  user: UserR | null = null;

  constructor(
    private authSvc: AuthService,
    private router: Router
  ){
  }

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy(): void {
  }

  getUser(): void
  {
    this.authSvc.user$.subscribe({
      next: (user) => {
        this.user = user;
      }
    });

  }

  signOut(): void
  {
    iziToast.success({
      message: 'Hasta luego ' + this.user?.nombre
    })
    this.authSvc.signOut();
  }
}
