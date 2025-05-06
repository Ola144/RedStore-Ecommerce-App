import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { Login, Register } from '../../model/RedStore';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  @ViewChild('logForm') logForm!: ElementRef;
  @ViewChild('regForm') regForm!: ElementRef;
  @ViewChild('indicator') indicator!: ElementRef;

  @ViewChild('logPassword') logPassword!: ElementRef;
  @ViewChild('regPassword') regPassword!: ElementRef;

  isShowIconVisible: boolean = false;
  isLogInPopupVisible: boolean = false;

  registerLoading: boolean = false;
  loginLoading: boolean = false;

  masterService: MasterService = inject(MasterService);
  toastr: ToastrService = inject(ToastrService);
  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  registerUser: Register = new Register();
  loginUser: Login = new Login();

  constructor(private title: Title) {
    this.title.setTitle('RedStore - Signup/Login')
  }

  register() {
    this.regForm.nativeElement.style.transform = 'translateX(0px)';
    this.logForm.nativeElement.style.transform = 'translateX(0px)';
    this.indicator.nativeElement.style.transform = 'translateX(100px)';
  }

  login() {
    this.regForm.nativeElement.style.transform = 'translateX(300px)';
    this.logForm.nativeElement.style.transform = 'translateX(300px)';
    this.indicator.nativeElement.style.transform = 'translateX(0px)';
  }

  onRegister() {
    // debugger;
    this.registerLoading = true;
    this.masterService.registerUser(this.registerUser).subscribe({
      next: (res: any) => {
        if (res) {
          this.toastr.success(
            "You've registed successfully. You can proceed to login!"
          );
          this.registerLoading = false;
        }
      },
      error: (err: any) => {
        if (err) {
          this.toastr.error('Please check your internet connection and try again!');
          this.registerLoading = false;
        }
      }
    });
  }

  onLogin() {
    // debugger;
    this.loginLoading = true;
    this.masterService.loginUser(this.loginUser).subscribe({
      next: (res: any) => {
        if (res) {
          this.loginLoading = false;
          try {
            localStorage.setItem('RedStoreUser', JSON.stringify(res));
          } catch (err) {
            console.error(err);
          }
          window.scrollTo(0, 0);
          this.router.navigateByUrl('/dashboard');
          this.toastr.success('You are welcome to RedStore.')
          this.masterService.onLoginUser$.next(true);
        } 
      },
      error: (err: any) => {
        if (err) {
          this.toastr.error('Pleace check your internet connection and try again!');
          this.loginLoading = false;
        }
      }
    });
  }

  showRegisterPassword() {
    if (this.regPassword.nativeElement.type == 'password') {
      this.regPassword.nativeElement.type = 'text';
      this.isShowIconVisible = true;
    } else {
      this.regPassword.nativeElement.type = 'password';
      this.isShowIconVisible = false;
    }
  }

  showLoginPassword() {
    if (this.logPassword.nativeElement.type == 'password') {
      this.logPassword.nativeElement.type = 'text';
      this.isShowIconVisible = true;
    } else {
      this.logPassword.nativeElement.type = 'password';
      this.isShowIconVisible = false;
    }
  }
}
