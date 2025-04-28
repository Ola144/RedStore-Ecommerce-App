import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IProduct } from '../../model/RedStore';
import { MasterService } from '../../service/master.service';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'
import { FormsModule } from '@angular/forms';
import { MatBadge } from '@angular/material/badge'

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule, MatBadge],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  masterService: MasterService = inject(MasterService);
  toastr: ToastrService = inject(ToastrService)
  router: Router = inject(Router);

  cartItems: IProduct[] = [];
  loggedUserItem: any;
  isLoggedIn: any = false;


  ngOnInit() {
    this.getAllCartProducts();

    this.masterService.onAddToCart$.subscribe((res: any) => {
      this.getAllCartProducts();
    });

    try {
      let localData = localStorage.getItem('RedStoreUser');

      if (localData != null) {
        this.loggedUserItem = JSON.parse(localData);
      }
    } catch (err) {
      console.error(err);
    }

    this.masterService.onLoginUser$.subscribe({
      next: (res) => {
        this.isLoggedIn = this.masterService.isLoggedIn();
      }
    })
  }

  getAmountBaseOnQuantity(product: IProduct) {
    // const discountPrice = product.price * ((100 - product.discount) / 100);
    const amount = product.price * product.count;

    return amount.toFixed(0);
  }

  getTotalAmount() {
    let i = 0,
      sum = 0

    for (; i < this.cartItems.length; i++) {
      sum += (+this.cartItems[i].price) * this.cartItems[i].count;
    }

    return sum;
  }

  getTaxAmount() {
    let i = 0,
      taxAmount = 0

    for (; i < this.cartItems.length; i++) {
      taxAmount += (+this.cartItems[i].price * this.cartItems[i].count / 100 * 10);
    }

    // this.cartItems.forEach(item => {
    //   taxAmount = item.price * item.count / 100 * 10;
    // });

    return taxAmount;
  }

  getAllCartProducts() {
    this.masterService.getAllCartProducts().subscribe({
      next: (res: any) => {
        this.cartItems = res;
      }
    })
  }

  onDeleteCartItem(id: string) {
    // const isDelete = this.toastr.
    this.masterService.deleteCartProductById(id).subscribe({
      next: (res) => {
        if (res) {
          this.toastr.success('Product deleted successfully!');
          this.getAllCartProducts();
        } else {
          this.toastr.error('Something went wrong. Please try again!');
        }
      }
    });
  }

  onLogout() {
    try {
      localStorage.removeItem('RedStoreUser');
    } catch (err) {
      console.error(err);
    }
    this.toastr.info('Thanks for your patronage!');
    this.router.navigateByUrl('/account');
    this.masterService.onLoginUser$.next(false);

    this.loggedUserItem = undefined;
  }

}

