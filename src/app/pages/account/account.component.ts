import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Login, Register } from '../../model/RedStore';
import { ToastrModule, ToastrService } from 'ngx-toastr';
// import {  } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ToastrModule, FormsModule, CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
})
export class AccountComponent {
  @ViewChild('loginForm') loginForm!: ElementRef;
  @ViewChild('regForm') regForm!: ElementRef;
  @ViewChild('indicator') indicator!: ElementRef;

  @ViewChild('loginPassword') loginPassword!: ElementRef;
  @ViewChild('registerPassword') registerPassword!: ElementRef;

  isShowIconVisible: boolean = false;

  masterService: MasterService = inject(MasterService);
  toastr: ToastrService = inject(ToastrService);
  router: Router = inject(Router);

  registerUser: Register = new Register();
  loginUser: Login = new Login();

  constructor(private title: Title) {
    this.title.setTitle('RedStore - Signup/Login')
  }

  register() {
    this.regForm.nativeElement.style.transform = 'translateX(0px)';
    this.loginForm.nativeElement.style.transform = 'translateX(0px)';
    this.indicator.nativeElement.style.transform = 'translateX(100px)';
  }

  login() {
    this.regForm.nativeElement.style.transform = 'translateX(300px)';
    this.loginForm.nativeElement.style.transform = 'translateX(300px)';
    this.indicator.nativeElement.style.transform = 'translateX(0px)';
  }

  onRegister() {
    // debugger;
    this.masterService.registerUser(this.registerUser).subscribe({
      next: (res: any) => {
        if (res) {
          this.toastr.success(
            "You've registed successfully. You can proceed to login!"
          );
        } else {
          this.toastr.error('Error from API!');
        }
      },
    });
  }

  onLogin() {
    // debugger;
    this.masterService.loginUser(this.loginUser).subscribe({
      next: (res: any) => {
        if (res) {
          this.toastr.success(
            "You're well to our store"
          );
          try {
            localStorage.setItem('RedStoreUser', JSON.stringify(res));
          } catch (err) {
            console.error(err);
          }
          this.masterService.onLoginUser$.next(true);
          this.router.navigateByUrl('/dashboard');
        } else {
          this.toastr.error('Something went wrong. Please try again!');
        }
      },
    });
  }

  showRegisterPassword() {
    if (this.registerPassword.nativeElement.type == 'password') {
      this.registerPassword.nativeElement.type = 'text';
      this.isShowIconVisible = true;
    } else {
      this.registerPassword.nativeElement.type = 'password';
      this.isShowIconVisible = false;
    }
  }

  showLoginPassword() {
    if (this.loginPassword.nativeElement.type == 'password') {
      this.loginPassword.nativeElement.type = 'text';
      this.isShowIconVisible = true;
    } else {
      this.loginPassword.nativeElement.type = 'password';
      this.isShowIconVisible = false;
    }
  }
}
