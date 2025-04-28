import { Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { LayoutComponent } from './pages/layout/layout.component';
import path from 'path';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ProductsComponent } from './pages/products/products.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { redStoreGuard } from './guards/red-store.guard';
import { redStoreCanActiveChildrenGuard } from './guards/red-store-can-active-children.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full',
  },
  {
    path: 'account',
    component: AccountComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [redStoreCanActiveChildrenGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'product-details',
        component: ProductDetailsComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
      },
    ],
  },
];
