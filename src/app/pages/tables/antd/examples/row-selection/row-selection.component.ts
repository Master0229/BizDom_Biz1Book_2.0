import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'kit-antd-table-row-selection',
  templateUrl: './row-selection.component.html',
  styles: [
    `
      .operate {
        margin-bottom: 16px;
      }

      .operate span {
        margin-left: 8px;
      }
    `,
  ],
})
export class KitAntdTableRowSelectionComponent implements OnInit {
  isAllDisplayDataChecked = false
  isOperating = false
  isIndeterminate = false
  listOfDisplayData: Data[] = []
  listOfAllData: Data[] = []
  mapOfCheckedId: { [key: string]: boolean } = {}
  numberOfChecked = 0

  currentPageDataChange($event: Data[]): void {
    this.listOfDisplayData = $event
    this.refreshStatus()
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.id])
    this.isIndeterminate =
      this.listOfDisplayData
        .filter(item => !item.disabled)
        .some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked
    this.numberOfChecked = this.listOfAllData.filter(item => this.mapOfCheckedId[item.id]).length
  }

  checkAll(value: boolean): void {
    this.listOfDisplayData
      .filter(item => !item.disabled)
      .forEach(item => (this.mapOfCheckedId[item.id] = value))
    this.refreshStatus()
  }

  operateData(): void {
    this.isOperating = true
    setTimeout(() => {
      this.listOfAllData.forEach(item => (this.mapOfCheckedId[item.id] = false))
      this.refreshStatus()
      this.isOperating = false
    }, 1000)
  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.listOfAllData.push({
        id: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
        disabled: i % 2 === 0,
      })
    }
  }
}

export interface Data {
  id: number
  name: string
  age: number
  address: string
  disabled: boolean
}
