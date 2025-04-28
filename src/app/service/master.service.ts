import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';

import { Subject, filter, map, Observable, BehaviorSubject } from 'rxjs';
import { Login, Register, IProduct, CreateOrder, ContactUs, ITeam } from '../model/RedStore';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  apiUrl: string = 'http://localhost:3000/';
  localUser: Login | any;

  priceLimit: number = 100;

  // Subject to pass data to shopping cart on add to cart
  onAddToCart$: Subject<IProduct> = new Subject<IProduct>();
  onLoginUser$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    try {
      let localData = localStorage.getItem('RedStoreUser');

      if (localData != null) {
        this.localUser = JSON.parse(localData);
      }
    } catch (err) {
      console.error(err);
    }
  }

  isLoggedIn() {
    try {
      return !!localStorage.getItem('RedStoreUser');
    } catch (err) {
      return console.error(err);
    }
  }

  registerUser(user: Register) {
    // debugger;
    return this.http.post(`${this.apiUrl}register`, user);
  }

  loginUser(user: Login) {
    // debugger;
    return this.http.post(`${this.apiUrl}login`, user);
  }

  getAllProducts(): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}getAllProducts`);
  }

  getAllCategories(): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.apiUrl}getAllCategories`);
  }

  getAllLatestProduct(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}getAllLatestProduct`);
  }
  
  getAllFeaturedProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}getAllProducts`).pipe(
      map((data) => data.filter((product) => product.price > this.priceLimit))
    );
  }

  createCartProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.apiUrl}ShoppingCartProducts`, product);
  }

  getAllCartProducts() {
    return this.http.get(`${this.apiUrl}ShoppingCartProducts`);
  }

  deleteCartProductById(id: string){
    return this.http.delete(`${this.apiUrl}ShoppingCartProducts/${id}`);
  }
  // =${id} /${id}

  createOder(createdBy: any, product: IProduct[], grandTotal: number, taxAmount: number): Observable<CreateOrder>{
    return this.http.post<CreateOrder>(`${this.apiUrl}Order`, {createdBy, product, grandTotal, taxAmount});
  }

  getAllOrders(){
    return this.http.get(`${this.apiUrl}Order`)
  }

  deleteOrderById(id: string){
    return this.http.delete(`${this.apiUrl}Order/${id}`);
  }

  updateOrder(createdBy: any, product: IProduct[], grandTotal: number, taxAmount: number){
    return this.http.post(`${this.apiUrl}Order`, {createdBy, product, grandTotal, taxAmount});
  }

  createMessage(user: ContactUs): Observable<ContactUs> {
    return this.http.post<ContactUs>(`${this.apiUrl}ContactUs`, user);
  }

  getAllFeedBacks(): Observable<ContactUs[]> {
    return this.http.get<ContactUs[]>(`${this.apiUrl}ContactUs`);
  }

  getAllTeam(): Observable<ITeam[]> {
    return this.http.get<ITeam[]>(`${this.apiUrl}Team`);
  }
}
