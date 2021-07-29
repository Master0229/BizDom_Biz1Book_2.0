import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'kit-bootstrap-timepicker-example',
  templateUrl: './timepicker.component.html',
})
export class KitBootstrapTimepickerExampleComponent implements OnInit {
  time = { hour: 13, minute: 30 }

  constructor() {}

  ngOnInit() {}
}
