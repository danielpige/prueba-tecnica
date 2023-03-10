import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/utils/services/auth.service';
import iziToast from 'izitoast';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup;
  loading = false;
  hide = true;
  hideConfirmation = true;

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
    this.registerForm = this.fb.group({
      nombre: [null, [Validators.required, Validators.minLength(3)]],
      apellido: [null, [Validators.required, Validators.minLength(3)]],
      doctoIdent: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      email: [null, [Validators.required, Validators.email]],
      clave: [null, [Validators.required]],
      claveConfirmation: [null, [Validators.required, Validators.minLength(6)]],
      cia: ['10']
    }, {
      validators: [
        this.equalPasswords('clave', 'claveConfirmation'),
      ]
    });
  }

  equalPasswords(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if (pass1Control.value && pass2Control.value) {
        if (pass1Control.value !== pass2Control.value) {
          pass2Control.setErrors({ noEsIgual: true });
        }
      }else {
        pass2Control.setErrors({ novalida: true });
      }
    };
  }

  getControlInvalid(control: string): boolean | undefined
  {
    return this.registerForm.get(control)?.invalid && this.registerForm.get(control)?.touched;
  }

  submit(): void
  {
    if (this.loading || this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    const data: User = this.registerForm.value;

    delete data.claveConfirmation;

    this.authSvc.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        iziToast.success({
          title: 'Hola!',
          message: 'Bienvenido ' + res.nombre
        });
        this.router.navigate(['/home']);
      },
      error: (error) => {
        iziToast.error({
          title: 'Upps',
          message: 'Ha ocurrido un error, por favor verifica los datos ingresados'
        });
        this.loading = false;
      }
    });

  }
}
