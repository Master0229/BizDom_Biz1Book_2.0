import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'kit-table-2',
  templateUrl: './2.component.html',
  styleUrls: ['./2.component.scss'],
})
export class CuiTable2Component implements OnInit {
  tableData = data
  constructor() {}
  ngOnInit() {}
}
