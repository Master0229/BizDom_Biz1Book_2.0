import { Component } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-icons-icomoon',
  templateUrl: './icomoon.component.html',
})
export class IconsIcomoonComponent {
  icons = data
}
