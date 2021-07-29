import { Component, OnInit } from '@angular/core'

interface ItemData {
  name: string
  age: number | string
  address: string
  checked: boolean
  expand: boolean
  description: string
  disabled?: boolean
}

@Component({
  selector: 'kit-antd-table-example',
  templateUrl: './table.component.html',
  styles: [
    `
      .components-table-demo-control-bar {
        margin-bottom: 12px;
      }

      .nz-form-item {
        margin-right: 16px;
        margin-bottom: 8px;
      }
    `,
  ],
})
export class KitAntdTableExampleComponent implements OnInit {
  listOfData: ItemData[] = []
  displayData: ItemData[] = []
  bordered = false
  loading = false
  sizeChanger = false
  pagination = true
  header = true
  title = true
  footer = true
  fixHeader = false
  size = 'default'
  expandable = true
  checkbox = true
  allChecked = false
  indeterminate = false
  simple = false
  noResult = false
  position = 'bottom'

  currentPageDataChange($event: ItemData[]): void {
    this.displayData = $event
    this.refreshStatus()
  }

  refreshStatus(): void {
    const validData = this.displayData.filter(value => !value.disabled)
    const allChecked = validData.length > 0 && validData.every(value => value.checked === true)
    const allUnChecked = validData.every(value => !value.checked)
    this.allChecked = allChecked
    this.indeterminate = !allChecked && !allUnChecked
  }

  checkAll(value: boolean): void {
    this.displayData.forEach(data => {
      if (!data.disabled) {
        data.checked = value
      }
    })
    this.refreshStatus()
  }

  ngOnInit(): void {
    for (let i = 1; i <= 100; i++) {
      this.listOfData.push({
        name: 'John Brown',
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
        checked: false,
        expand: false,
      })
    }
  }

  noResultChange(status: boolean): void {
    this.listOfData = []
    if (!status) {
      this.ngOnInit()
    }
  }
}
