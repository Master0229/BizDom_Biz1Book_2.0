import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-apps-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class AppsGalleryComponent implements OnInit {
  data = data
  constructor() {}
  ngOnInit() {}
}
