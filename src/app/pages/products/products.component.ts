import { Component, inject, Input, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IProduct } from '../../model/RedStore';
import { MasterService } from '../../service/master.service';
import { CurrencyPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ProductCardComponent } from "../product-card/product-card.component";
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatTooltipModule, MatToolbarModule, MatIconModule, MatButtonModule, FormsModule, ProductCardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  
  products: IProduct[] = [];
  @Input() rating: any[] = [];

  masterService: MasterService = inject(MasterService);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);

  isLoadProductsBtnVisible: boolean = false;
  isSearchBtnVisible: boolean = true;

  constructor(private title: Title) {
    this.title.setTitle('RedStore - Products')
  }

  ngOnInit(): void {
    this.getAllProducts();

    this.products = this.activeRoute.snapshot.data['products'];

    // this.rating = this.products.find(item => item.rating);
  }

  getAllProducts() {
    this.masterService.getAllProducts().subscribe({
      next: (res: any)=>{
        this.products = res;
      }
    })
  }

  sortByPrice() {
    this.products = this.products.sort((a, b) => b.price - a.price);
    // this.products.sort((a, b) => {
    //   return a.productName.localeCompare(b.productName);
    // })
  }

  sortByRating() {
    this.products = this.products.sort((a, b) => {
      return b.rating - a.rating
    })
  }

  onSearch(inputValue: HTMLInputElement) {
    if (inputValue.value) {
      this.products = this.products.filter((product) => product.productName.toLowerCase().includes(inputValue.value.toLowerCase()));
      this.isLoadProductsBtnVisible = true;
      this.isSearchBtnVisible = false;
    } else {
      this.getAllProducts();
    }
  }

  loadAllProducts() {
    this.getAllProducts()
    this.isLoadProductsBtnVisible = false;
    this.isSearchBtnVisible = true;
  }

}
