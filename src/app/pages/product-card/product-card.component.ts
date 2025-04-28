import { Component, inject, Input, OnInit } from '@angular/core';
import { IProduct } from '../../model/RedStore';
import { MasterService } from '../../service/master.service';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [MatTooltipModule, MatToolbarModule, MatIconModule, MatButtonModule, ToastrModule, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {
  @Input() product = {} as IProduct;

  emptyStar: string = '/public/assets/empty-star.png';
  filledStar: string = '/public/assets/filled-star.png';

  masterService: MasterService = inject(MasterService);
  toastr: ToastrService = inject(ToastrService);

  ngOnInit() {

  }

  addToCart(productData: IProduct) {
    let isProductExist = productData.id;
    if (!isProductExist != null) {
      this.masterService.createCartProduct(productData).subscribe({
        next: (res: IProduct) => {
          if (res) {
            this.toastr.success('The Product Added To Cart Successfully!');

          } else {
            this.toastr.error('Something went wrong. Please try again!')
          }
        }
      })
    } else {
       this.toastr.error('The item is already exist in the shopping cart!');
    }

    this.masterService.onAddToCart$.next(productData);
  }

}
