import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'kit-antd-table-grouping',
  templateUrl: './grouping.component.html',
})
export class KitAntdTableGroupingComponent implements OnInit {
  widthConfig = ['100px', '200px', '200px', '100px', '100px', '200px', '200px', '100px']
  scrollConfig = { x: '1200px', y: '240px' }
  listOfDisplayData: any[] = []
  listOfData: any[] = []
  sortValue: string | null = null
  filterName = [
    { text: 'Joe', value: 'Joe' },
    { text: 'John', value: 'John' },
  ]
  searchName: string[] = []

  search(searchName: string[]): void {
    this.searchName = searchName
    const filterFunc = (item: any) => {
      return this.searchName.length
        ? this.searchName.some(name => item.name.indexOf(name) !== -1)
        : true
    }
    const listOfData = this.listOfData.filter(item => filterFunc(item))
    this.listOfDisplayData = listOfData.sort((a, b) =>
      this.sortValue === 'ascend' ? (a.age > b.age ? 1 : -1) : b.age > a.age ? 1 : -1,
    )
  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        name: 'John Brown',
        age: i + 1,
        street: 'Lake Park',
        building: 'C',
        number: 2035,
        companyAddress: 'Lake Street 42',
        companyName: 'SoftLake Co',
        gender: 'M',
      })
    }
    this.listOfDisplayData = [...this.listOfData]
  }
}
