import { Component, OnInit } from '@angular/core'
declare var require: any
const orders: any = require('./data.json')

@Component({
  selector: 'app-ecommerce-orders',
  templateUrl: './orders.component.html',
})
export class EcommerceOrdersComponent implements OnInit {
  listOfSearchName: string[] = []
  listOfSearchAddress: string[] = []
  listOfData = orders
  listOfDisplayData = [...this.listOfData]
  mapOfSort: { [key: string]: any } = {
    id: null,
    date: null,
    customer: null,
    total: null,
    tax: null,
    shipping: null,
    quantity: null,
    status: null,
  }
  sortName: string | null = null
  sortValue: string | null = null

  ngOnInit() {}

  sort(sortName: string, value: string): void {
    this.sortName = sortName
    this.sortValue = value
    for (const key in this.mapOfSort) {
      if (this.mapOfSort.hasOwnProperty(key)) {
        this.mapOfSort[key] = key === sortName ? value : null
      }
    }
    this.search(this.listOfSearchName, this.listOfSearchAddress)
  }

  search(listOfSearchName: string[], listOfSearchAddress: string[]): void {
    this.listOfSearchName = listOfSearchName
    this.listOfSearchAddress = listOfSearchAddress
    const filterFunc = item =>
      (this.listOfSearchAddress.length
        ? this.listOfSearchAddress.some(address => item.address.indexOf(address) !== -1)
        : true) &&
      (this.listOfSearchName.length
        ? this.listOfSearchName.some(name => item.name.indexOf(name) !== -1)
        : true)
    const listOfData = this.listOfData.filter(item => filterFunc(item))
    if (this.sortName !== null && this.sortValue !== null) {
      this.listOfDisplayData = listOfData.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName] > b[this.sortName]
            ? 1
            : -1
          : b[this.sortName] > a[this.sortName]
          ? 1
          : -1,
      )
    } else {
      this.listOfDisplayData = listOfData
    }
  }
}
