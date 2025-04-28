export interface IProduct {
  id: string;
  productName: string,
  price: number,
  count: number,
  rating: number,
  image: string,
  availableQty: number,
}

export interface ITeam {
  id: string;
  name: string,
  position: number,
  location: number,
  image: string,
}

export interface IOrder {
  id: string;
  createdBy: {
    id: undefined;
    fullName: string;
    city: string;
    phoneNumber: string;
    date: string;
    address: string;
  },
  product:[
    {
      id: string,
      productName: string,
      price: number,
      discount: number,
      count: number,
      rating: number,
      availableQty: number,
    }
  ],
  taxAmount: number;
  grandTotal: number;
}

export class Register {
  id: undefined;
  username: string;
  email: string;
  password: string;

  constructor() {
    this.id = undefined;
    this.username = '';
    this.email = '';
    this.password = '';
  }
}

export class Login {
  id: undefined;
  username: string;
  password: string;

  constructor() {
    this.id = undefined;
    this.username = '';
    this.password = '';
  }
}

export class CreateOrder {
  id: undefined;
  fullName: string;
  city: string;
  phoneNumber: string;
  date: Date;
  address: string;

  constructor() {
    this.id = undefined;
    this.fullName = '';
    this.city = '';
    this.phoneNumber = '';
    this.date = new Date();
    this.address = '';
  }
}

export class ContactUs {
  id: undefined;
  firstName: string;
  lastName: string;
  emailId: string;
  phoneNumber: string;
  message: string;

  constructor() {
    this.id = undefined;
    this.firstName = '';
    this.lastName = '';
    this.emailId = '';
    this.phoneNumber = '';
    this.message = '';
  }
}
