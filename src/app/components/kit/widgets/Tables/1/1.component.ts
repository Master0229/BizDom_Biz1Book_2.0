import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'kit-table-1',
  templateUrl: './1.component.html',
  styleUrls: ['./1.component.scss'],
})
export class CuiTable1Component implements OnInit {
  tableData = data
  constructor() {}
  ngOnInit() {}
}
