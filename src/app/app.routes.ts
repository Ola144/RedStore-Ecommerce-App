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
import { redStoreAboutResolve, redStoreCategoryPResolve, redStoreCheckoutResolve, redStoreFeaturedPResolve, redStoreLatestPResolve, redStoreResolve } from './guards/red-store-resolve.guard';

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
    canActivate: [redStoreGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        resolve: {
          categoryProd: redStoreCategoryPResolve,
          featuredProd: redStoreFeaturedPResolve,
          lastestProd: redStoreLatestPResolve
        }
      },
      {
        path: 'about-us',
        component: AboutUsComponent,
        resolve: {teams: redStoreAboutResolve}
      },
      {
        path: 'products',
        component: ProductsComponent,
        resolve: {products: redStoreResolve}
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'checkout',
        component: CheckoutComponent,
        resolve: {products: redStoreCheckoutResolve}
      },
    ],
  },
];
