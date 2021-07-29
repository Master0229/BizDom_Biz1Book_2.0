import { Component } from '@angular/core'

@Component({
  selector: 'kit-antd-collapse-example',
  templateUrl: './collapse.component.html',
})
export class KitAntdCollapseExampleComponent {
  panels = [
    {
      active: true,
      name: 'This is panel header 1',
      disabled: false,
    },
    {
      active: false,
      disabled: false,
      name: 'This is panel header 2',
    },
    {
      active: false,
      disabled: true,
      name: 'This is panel header 3',
    },
  ]
}
