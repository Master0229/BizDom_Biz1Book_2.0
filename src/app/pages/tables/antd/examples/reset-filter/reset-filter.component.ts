import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'kit-antd-table-reset-filter',
  templateUrl: './reset-filter.component.html',
  styles: [
    `
      .table-operations {
        margin-bottom: 16px;
      }

      .table-operations > button {
        margin-right: 8px;
      }
    `,
  ],
})
export class KitAntdTableResetFilterComponent implements OnInit {
  listOfSearchName: string[] = []
  listOfSearchAddress: string[] = []
  listOfFilterName = [
    { text: 'Joe', value: 'Joe' },
    { text: 'Jim', value: 'Jim' },
  ]
  listOfFilterAddress = [
    { text: 'London', value: 'London' },
    { text: 'Sidney', value: 'Sidney' },
  ]
  listOfData = [
    {
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ]
  listOfDisplayData = [...this.listOfData]
  mapOfSort: { [key: string]: any } = {
    name: null,
    age: null,
    address: null,
  }
  sortName: string | null = null
  sortValue: string | null = null

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
    if (this.sortName && this.sortValue) {
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

  resetFilters(): void {
    this.listOfFilterName = [
      { text: 'Joe', value: 'Joe' },
      { text: 'Jim', value: 'Jim' },
    ]
    this.listOfFilterAddress = [
      { text: 'London', value: 'London' },
      { text: 'Sidney', value: 'Sidney' },
    ]
    this.listOfSearchName = []
    this.listOfSearchAddress = []
    this.search(this.listOfSearchName, this.listOfSearchAddress)
  }

  resetSortAndFilters(): void {
    this.sortName = null
    this.sortValue = null
    this.mapOfSort = {
      name: null,
      age: null,
      address: null,
    }
    this.resetFilters()
    this.search(this.listOfSearchName, this.listOfSearchAddress)
  }
  ngOnInit() {}
}
