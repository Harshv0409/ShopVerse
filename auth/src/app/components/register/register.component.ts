// RegisterComponent — Reactive Forms with validation
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  errorMessage = '';

  // Form banao rules ke saath
  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,           // khali nahi hona chahiye
      Validators.minLength(3)        // kam se kam 3 characters
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email               // valid email format hona chahiye
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)        // kam se kam 6 characters
    ])
  });

  constructor(private http: HttpClient) {}

  // Easy access ke liye getters
  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }

  onRegister() {
    if (this.registerForm.invalid) return; // form valid nahi toh submit mat karo

    this.http.post<any>('http://localhost:8080/api/auth/register', this.registerForm.value)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('role', response.role);
          localStorage.setItem('name', response.name);
          alert('Registration successful! Welcome ' + response.name);
        },
        error: () => {
          this.errorMessage = 'Email already registered!';
        }
      });
  }
}
