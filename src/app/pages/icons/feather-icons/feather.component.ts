import { Component } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-icons-feather',
  templateUrl: './feather.component.html',
})
export class IconsFeatherComponent {
  icons = data
}
