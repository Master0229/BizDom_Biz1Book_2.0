import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'kit-ui-kit-antd',
  templateUrl: './antd.component.html',
})
export class UiKitAntdComponent implements OnInit {
  kit = data
  selectedExampleIndex = 0
  example = this.kit[this.selectedExampleIndex]

  setExample(index): void {
    this.selectedExampleIndex = index
    this.example = this.kit[index]
  }

  constructor() {}
  ngOnInit() {}
}
