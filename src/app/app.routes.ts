import { Routes } from '@angular/router';
import { HomeComponent } from './pages/Home/home/home.component';
import { LoginComponent } from './pages/Login/login/login.component';
import { authGuardGuard } from './core/guards/AuthGuard/auth-guard.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'Seafarers', component: HomeComponent, title: 'Seafarers', canActivate: [authGuardGuard] },
];
