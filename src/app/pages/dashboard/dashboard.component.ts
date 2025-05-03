import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../service/master.service';
import { IProduct } from '../../model/RedStore';
import { filter, map, Observable } from 'rxjs';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProductCardComponent } from "../product-card/product-card.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  masterService: MasterService = inject(MasterService);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
    

  bannerImg: string = '/public/assets/image1.png';
  exclusiveImg: string = '/public/assets/exclusive.png';

  categoryProducts: IProduct[] = [];
  featuredProducts: Observable<any[]> = new Observable<any[]>;
  latestProducts: Observable<any[]> = new Observable<any[]>;

  constructor(private title: Title) {
    this.title.setTitle('RedStore - Home')
  }
  
  ngOnInit() {
    this.getAllCategories();
    
    this.featuredProducts = this.masterService.getAllFeaturedProducts()

    this.latestProducts = this.masterService.getAllLatestProduct();
    
    this.categoryProducts = this.activeRoute.snapshot.data['categoryProd'];
  }

  

  getAllCategories() {
    this.masterService.getAllCategories().subscribe({
      next: (res: any)=>{
        this.categoryProducts = res;
      }
    })
  }

  // getFeaturedProuducts() {
  //   this.masterService.getAllFeaturedProducts().subscribe({
  //     next: (res: any) => {
  //       this.featuredProducts = res;
  //     }
  //   });
  // }
}
