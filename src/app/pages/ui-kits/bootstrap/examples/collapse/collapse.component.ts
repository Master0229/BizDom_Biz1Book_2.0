import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'kit-bootstrap-collapse-example',
  templateUrl: './collapse.component.html',
})
export class KitBootstrapCollapseExampleComponent implements OnInit {
  public isCollapsed = false
  public isCollapsed1 = true
  public isCollapsed2 = true
  public isCollapsed3 = true

  constructor() {}

  ngOnInit() {}
}
