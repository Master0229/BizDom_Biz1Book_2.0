import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-ecommerce-product-catalog',
  templateUrl: './product-catalog.component.html',
})
export class EcommerceProductCatalogComponent implements OnInit {
  products = data
  constructor() {}
  ngOnInit() {}
}
