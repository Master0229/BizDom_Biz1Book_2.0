import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'kit-antd-table-fixed-all',
  templateUrl: './fixed-all.component.html',
})
export class KitAntdTableFixedAllComponent implements OnInit {
  listOfData: any[] = []

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        name: `Edward King ${i}`,
        age: 32,
        address: `London`,
      })
    }
  }
}
