// LoginComponent — Reactive Forms with validation
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMessage = '';

  // Form banao rules ke saath
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  constructor(private http: HttpClient) {}

  // Easy access ke liye getters
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onLogin() {
    if (this.loginForm.invalid) return;

    this.http.post<any>('http://localhost:8080/api/auth/login', this.loginForm.value)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('name', response.name);
          alert('Login successful! Welcome ' + response.name);
        },
        error: () => {
          this.errorMessage = 'Wrong email or password!';
        }
      });
  }
}
