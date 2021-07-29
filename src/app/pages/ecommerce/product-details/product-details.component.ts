import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-ecommerce-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class EcommerceProductDetailsComponent implements OnInit {
  images = data.images
  products = data.products
  isFavorite = true
  activeImgIndex = 0
  constructor() {}
  ngOnInit() {}

  setFavorite() {
    this.isFavorite = !this.isFavorite
  }

  setImage(index) {
    this.activeImgIndex = index
  }
}
