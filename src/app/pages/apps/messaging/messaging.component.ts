import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-apps-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss'],
})
export class AppsMessagingComponent implements OnInit {
  dialogs = data
  activeIndex = 0
  name = this.dialogs[this.activeIndex].name
  position = this.dialogs[this.activeIndex].position
  dialog = this.dialogs[this.activeIndex].dialog
  avatar = this.dialogs[this.activeIndex].avatar

  constructor() {}
  ngOnInit() {}

  changeDialog(index) {
    this.activeIndex = index
    this.name = this.dialogs[index].name
    this.position = this.dialogs[index].position
    this.dialog = this.dialogs[index].dialog
    this.avatar = this.dialogs[index].avatar
  }
}
