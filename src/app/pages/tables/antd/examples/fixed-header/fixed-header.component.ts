import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'kit-antd-table-fixed-header',
  templateUrl: './fixed-header.component.html',
})
export class KitAntdTableFixedHeaderComponent implements OnInit {
  listOfData: any[] = []

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      })
    }
  }
}
