import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-apps-profile',
  templateUrl: './profile.component.html',
})
export class AppsProfileComponent implements OnInit {
  activeKey = 0

  constructor() {}
  ngOnInit() {}

  changeKey(key) {
    this.activeKey = key
  }
}
