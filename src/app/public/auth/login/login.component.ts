import iziToast from 'izitoast';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/utils/services/auth.service';
import { Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm!: FormGroup;
  loading = false;
  hide = true;
  remenber = false;

  constructor(
    private fb: FormBuilder,
    private authSvc: AuthService,
    private router: Router
  ){
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
  }

  initForm(): void
  {
    const email: string | null = localStorage.getItem('email') || null;
    if (email) {
      this.remenber = true;
    }

    this.loginForm = this.fb.group({
      username: [this.remenber? email : null, [Validators.minLength(6), Validators.email, Validators.required]],
      password: [null, [Validators.minLength(6), Validators.required]],
      desdeMs: [true],
      companyId: ['10']
    })
  }

  getControlInvalid(control: string): boolean | undefined
  {
    return this.loginForm.get(control)?.invalid && this.loginForm.get(control)?.touched;
  }

  submit(): void
  {
    if (this.loading || this.loginForm.invalid) {
      return;
    }

    this.loading = true;

     this.authSvc.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        if (this.remenber) {
          localStorage.setItem('email', this.loginForm.value.username);
        }else {
          localStorage.removeItem('email');
        }
        iziToast.success({
          title: 'Hola!',
          message: 'Bienvenido ' + res.nombre
        });
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        console.log(error);
        this.loading = false;
        iziToast.error({
          title: 'Ups!',
          message: 'Por favor verificar usuario o contraseña'
        });
      }
    });

  }

  remenberMe(event: MatCheckboxChange): void
  {
    this.remenber = event.checked;
  }



}
