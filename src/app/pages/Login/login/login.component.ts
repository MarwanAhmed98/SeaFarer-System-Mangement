import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/AuthService/auth-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoading = false;
  isSuccess = '';
  isErr = '';

  LoginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  constructor(private authService: AuthService, private router: Router) { }

  SubmitForm(): void {
    if (this.LoginForm.valid) {
      const username = this.LoginForm.get('username')?.value;
      const password = this.LoginForm.get('password')?.value;
      if (username !== '1' || password !== '123456') {
        this.isLoading = false;
        this.isErr = 'Username must be "1" and Password must be "123456"';
        return;
      }

      console.log('Sending login:', this.LoginForm.value);
      this.isLoading = true;

      this.authService.sendLoginForm(this.LoginForm.value).pipe(
        timeout(10000)
      ).subscribe({
        next: (res) => {
          console.log('Response:', res);
          this.isLoading = false;
          if (res.token || res.access_token) {
            localStorage.setItem('token', res.token || res.access_token);
            this.isSuccess = 'Login Successful';
            this.router.navigate(['/Seafarers']);
          } else {
            this.isErr = 'No token found in response';
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.isErr = err.error?.message || 'Login failed or timed out';
        }
      });
    }
  }
}