import { Component, OnInit, inject } from '@angular/core';
import { CreateOrder, IOrder, IProduct } from '../../model/RedStore';
import { MasterService } from '../../service/master.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { CustomValidators } from '../../Validators/RedStore.validator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cartItems: IProduct[] = [];
  orderList: IOrder[] = [];

  isOrderPopUpVisible: boolean = false;
  isDeletePopUpVisible: boolean = false;

  masterService: MasterService = inject(MasterService);
  toastr: ToastrService = inject(ToastrService);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
   

  billForm: FormGroup = new FormGroup({});

  constructor(private title: Title) {
    this.title.setTitle('RedStore - Checkout')
  }

  ngOnInit(): void {
    this.getAllCartProducts();
    this.getAllOrders();

    this.initializeForm();
    
    this.cartItems = this.activeRoute.snapshot.data['checkout'];
  }

  initializeForm(productData?: IOrder) {
    this.billForm = new FormGroup({
      id: new FormControl(productData ? productData.id : undefined),
      fullName: new FormControl(productData ? productData.createdBy.fullName : '', [Validators.required, CustomValidators.fullNameSpaceAllowed, CustomValidators.firstLetterUppercase]),
      city: new FormControl(productData ? productData.createdBy.city : '', Validators.required),
      phoneNumber: new FormControl(productData ? productData.createdBy.phoneNumber : '', [Validators.required, Validators.pattern('/^[0-9]{11}$/')]),
      date: new FormControl(productData ? productData.createdBy.date : new Date(), Validators.required),
      address: new FormControl(productData ? productData.createdBy.address : '', Validators.required),
      // landMark: new FormControl('', Validators.required),
    })
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

  getGrandTotal() {
    return this.getTotalAmount() + this.getTaxAmount();
  }

  placeOrder() {
    const formValue = this.billForm.value;
    this.masterService.createOder(formValue, this.cartItems, this.getGrandTotal(), this.getTaxAmount()).subscribe({
      next: (res) => {
        if (res) {
          this.toastr.success('The order is placed successfully!');
          this.isOrderPopUpVisible = true;
          this.getAllOrders();
        } else {
          this.toastr.error('Something went wrong. Please try again!');
        }
      }
    })

    // console.log(this.billForm.get('city')?.value);
  }

  getAllCartProducts() {
    this.masterService.getAllCartProducts().subscribe({
      next: (res: any) => {
        this.cartItems = res;
      }
    })
  }

  getAllOrders() {
    this.masterService.getAllOrders().subscribe({
      next: (res: any) => {
        this.orderList = res;
      }
    })
  }

  closePopUp(){
    this.isOrderPopUpVisible = false;
  }

  onEdit(productData: IOrder) {
    this.initializeForm(productData);
  }

  // onUpdateProduct() {
  //   const formValue = this.billForm.value;

  //   formValue.fullName = '';
  //   formValue.city = '';
  //   formValue.phoneNumber = '';
  //   formValue.date = new Date();
  //   formValue.address = '';

  //   this.masterService.updateOrder(formValue, this.cartItems, this.getGrandTotal(), this.getTaxAmount()).subscribe({
  //     next: (res: any) => {
  //       if (res) {
  //         this.toastr.success('The item updated successfully!');
  //         this.getAllOrders();
  //         this.isOrderPopUpVisible = true;
  //       } else {
  //         this.toastr.error('Something went wrong. Please try again!');
  //       }
  //     }
  //   })
  // }

  // onDeletOrderItem() {
  //   let i = 0,
  //     itemId = ''

  //   for (; i < this.orderList.length; i++){
  //     itemId = this.orderList[i].id;
  //   };

  //   this.masterService.deleteOrderById(itemId).subscribe({
  //     next: (res: any) => {
  //       if (res) {
  //         this.toastr.success('Order item deleted successfully');
  //         this.getAllOrders();
  //         this.isDeletePopUpVisible = false;
  //       } else {
  //         this.toastr.error('Something went wrong. Please try again!');
  //       }
  //     }
  //   });
  // };
}
