import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core'

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss'],
})
export class AboutusComponent implements OnInit {
  @ViewChild('qty', { static: false }) public prod_detail_modal: TemplateRef<any>

  constructor() {}

  ngOnInit(): void {}
  keyword = 'name'
  data = [
    {
      id: 1,
      name: 'Usa',
    },
    {
      id: 2,
      name: 'England',
    },
  ]

  selectEvent(item) {
    // do something with selected item
    this.prod_detail_modal['nativeElement'].focus()
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focused
  }
}
