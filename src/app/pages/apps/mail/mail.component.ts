import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-apps-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.scss'],
})
export class AppsMailComponent implements OnInit {
  isAllDisplayDataChecked = false
  isIndeterminate = false
  listOfDisplayData = data
  listOfAllData = data
  mapOfCheckedId = {}
  constructor() {}
  ngOnInit() {}
  currentPageDataChange($event): void {
    this.listOfDisplayData = $event
    this.refreshStatus()
  }

  refreshStatus(): void {
    this.isAllDisplayDataChecked = this.listOfDisplayData
      .filter(item => !item.disabled)
      .every(item => this.mapOfCheckedId[item.id])
    this.isIndeterminate =
      this.listOfDisplayData
        .filter(item => !item.disabled)
        .some(item => this.mapOfCheckedId[item.id]) && !this.isAllDisplayDataChecked
  }

  checkAll(value): void {
    this.listOfDisplayData
      .filter(item => !item.disabled)
      .forEach(item => (this.mapOfCheckedId[item.id] = value))
    this.refreshStatus()
  }
}
