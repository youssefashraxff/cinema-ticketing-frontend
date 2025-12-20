import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { interval, take } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ILoginResponse } from '../../interfaces/ILoginResponse';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  // Variables
  errorMessage!: string | undefined;
  successMessage!: string | undefined;
  isLoading: boolean = false;
  timer: number = 3;

  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  loginFrom: FormGroup;

  ngOnInit(): void {
    this.loginFrom.setValue({
      email: 'youssef.ashraf.1104@gmail.com',
      password: '1234',
    });
  }

  constructor() {
    this.loginFrom = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit() {
    this.handleBeforeSubmit();
    console.log(this.loginFrom.value);
    this.authService.login(this.loginFrom.value.email, this.loginFrom.value.password).subscribe({
      next: (response) => {
        this.handlePostResponse(response as any);
      },
      error: (error: HttpErrorResponse) => {
        this.handleErrorResponse(error);
      },
    });
  }
  handleBeforeSubmit(): void {
    if (this.isLoading) return; // 🛑 prevent double submit
    this.loginFrom.markAllAsTouched();
    this.isLoading = true;
  }
  handlePostResponse(response: ILoginResponse): void {
    console.log(response);
    localStorage.setItem('token', response.token);
    localStorage.setItem('role', response.user.role);
    localStorage.setItem('userId', response.user.id.toString());
    this.loginFrom.reset();
    this.errorMessage = undefined;
    this.successMessage = 'Login successfully';
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
    this.errorMessage = error.error?.message || 'Incorrect email or password';
    this.cdr.detectChanges();
  }
}
