import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-ecommerce-cart',
  templateUrl: './cart.component.html',
})
export class EcommerceCartComponent implements OnInit {
  products = data
  constructor() {}
  ngOnInit() {}
}
