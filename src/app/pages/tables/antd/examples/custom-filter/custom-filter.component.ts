import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'kit-antd-table-custom-filter',
  templateUrl: './custom-filter.component.html',
  styles: [
    `
      .search-box {
        padding: 8px;
      }

      .search-box input {
        width: 188px;
        margin-bottom: 8px;
        display: block;
      }

      .search-box button {
        width: 90px;
      }

      .search-button {
        margin-right: 8px;
      }
    `,
  ],
})
export class KitAntdTableCustomFilterComponent implements OnInit {
  searchValue = ''
  sortName: string | null = null
  sortValue: string | null = null
  listOfFilterAddress = [
    { text: 'London', value: 'London' },
    { text: 'Sidney', value: 'Sidney' },
  ]
  listOfSearchAddress: string[] = []
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

  reset(): void {
    this.searchValue = ''
    this.search()
  }

  sort(sortName: string, value: string): void {
    this.sortName = sortName
    this.sortValue = value
    this.search()
  }

  filterAddressChange(value: string[]): void {
    this.listOfSearchAddress = value
    this.search()
  }

  search(): void {
    const filterFunc = (item: { name: string; age: number; address: string }) => {
      return (
        (this.listOfSearchAddress.length
          ? this.listOfSearchAddress.some(address => item.address.indexOf(address) !== -1)
          : true) && item.name.indexOf(this.searchValue) !== -1
      )
    }
    const data = this.listOfData.filter((item: { name: string; age: number; address: string }) =>
      filterFunc(item),
    )
    if (this.sortName !== null && this.sortValue !== null) {
      this.listOfDisplayData = data.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName] > b[this.sortName]
            ? 1
            : -1
          : b[this.sortName] > a[this.sortName]
          ? 1
          : -1,
      )
    } else {
      this.listOfDisplayData = data
    }
  }
  ngOnInit() {}
}
