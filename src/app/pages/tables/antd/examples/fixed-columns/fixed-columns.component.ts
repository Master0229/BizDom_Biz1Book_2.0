import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'kit-antd-table-fixed-columns',
  templateUrl: './fixed-columns.component.html',
})
export class KitAntdTableFixedColumnsComponent implements OnInit {
  listOfData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 40,
      address: 'London',
    },
  ]
  ngOnInit() {}
}
