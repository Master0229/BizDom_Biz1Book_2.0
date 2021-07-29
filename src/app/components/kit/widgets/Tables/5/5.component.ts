import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'kit-table-5',
  templateUrl: './5.component.html',
  styleUrls: ['./5.component.scss'],
})
export class CuiTable5Component implements OnInit {
  tableData = data
  constructor() {}
  ngOnInit() {}
}
