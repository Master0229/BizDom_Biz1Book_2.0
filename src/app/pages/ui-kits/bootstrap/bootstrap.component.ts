import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'kit-ui-kit-bootstrap',
  templateUrl: './bootstrap.component.html',
})
export class UiKitBootstrapComponent implements OnInit {
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
