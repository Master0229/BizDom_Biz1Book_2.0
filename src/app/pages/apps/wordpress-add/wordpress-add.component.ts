import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-wordpress-add',
  templateUrl: './wordpress-add.component.html',
  styles: [':host ::ng-deep .ql-container {height: 200px;}'],
})
export class WordpressAddComponent implements OnInit {
  contentTypes = [
    { label: 'Text', value: 'Text', checked: true },
    { label: 'Video', value: 'Video' },
    { label: 'Image', value: 'Image' },
    { label: 'Vimeo', value: 'Vimeo' },
  ]

  categoriesTypes = [
    {
      label: 'Travel',
      value: 'travel',
    },
    {
      label: 'Lifestyle',
      value: 'lifestyle',
    },
  ]

  constructor() {}
  ngOnInit() {}
}
