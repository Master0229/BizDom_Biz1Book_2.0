import { Component } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-icons-fontawesome',
  templateUrl: './fontawesome.component.html',
})
export class IconsFontawesomeComponent {
  icons = data
}
