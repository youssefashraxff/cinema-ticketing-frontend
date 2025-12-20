import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { interval, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  // Variables
  errorMessage!: string | undefined;
  successMessage!: string | undefined;
  isLoading: boolean = false;
  timer: number = 3;

  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  registerForm: FormGroup;

  ngOnInit(): void {
    this.registerForm.setValue({
      firstName: 'Youssef',
      lastName: 'Ashraf',
      email: 'youssef.ashraf.1104@gmail.com',
      password: '1234',
      confirmPassword: '1234',
    });
  }

  constructor() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  onSubmit() {
    console.log('donee');
    this.handleBeforeSubmit();
    if (this.registerForm.invalid) {
      console.log('false');
      this.isLoading = false;
      return;
    }

    const { firstName, lastName, email, password } = this.registerForm.value;

    this.authService
      .register({
        username: `${firstName} ${lastName}`,
        email,
        password,
      })
      .subscribe({
        next: (response) => {
          console.log(response);
          this.handlePostResponse(response);
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
          this.handleErrorResponse(error);
        },
      });
  }

  handleBeforeSubmit(): void {
    if (this.isLoading) return; // 🛑 prevent double submit
    this.registerForm.markAllAsTouched();
    this.isLoading = true;
    this.errorMessage = undefined;
    this.successMessage = undefined;
  }

  handlePostResponse(response: any): void {
    console.log(response);
    localStorage.setItem('token', response.token);
    localStorage.setItem('role', response.user.role);
    localStorage.setItem('username', response.user.username);
    localStorage.setItem('userId', response.user.id.toString());
    this.registerForm.reset();
    this.errorMessage = undefined;
    this.successMessage = 'Account created successfully';
    this.isLoading = false;

    interval(1000)
      .pipe(take(5))
      .subscribe(() => {
        this.timer--;
        if (this.timer === 0) {
          this.router.navigateByUrl('/');
        }
      });
  }

  handleErrorResponse(error: any): void {
    console.log(error.error?.message);
    this.isLoading = false;
    this.successMessage = undefined;
    this.errorMessage = error.error?.message || 'Registration failed, please try again';
    this.cdr.detectChanges();
  }
}
