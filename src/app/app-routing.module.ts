import { AuthGuard } from './utils/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from './utils/guards/authenticated.guard';
import { NotFoundComponent } from './public/auth/components/not-found/not-found.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./public/auth/auth.module').then(m => m.AuthModule), canActivate: [AuthenticatedGuard] },
  { path: '', loadChildren: () => import('./public/auth/auth.module').then(m => m.AuthModule), canActivate: [AuthenticatedGuard] },
  { path: 'home', loadChildren: () => import('./private/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
