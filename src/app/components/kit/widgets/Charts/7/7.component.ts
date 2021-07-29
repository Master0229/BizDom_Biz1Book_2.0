import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'kit-chart-7',
  templateUrl: './7.component.html',
  styleUrls: ['./7.component.scss'],
})
export class CuiChart7Component implements OnInit {
  tableData = data
  constructor() {}
  ngOnInit() {}
}
