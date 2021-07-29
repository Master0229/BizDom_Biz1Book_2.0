import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-ecommerce-dashboard',
  templateUrl: './dashboard.component.html',
})
export class EcommerceDashboardComponent implements OnInit {
  products = data
  constructor() {}
  ngOnInit() {}
}
