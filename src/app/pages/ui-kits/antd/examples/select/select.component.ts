import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'kit-antd-select-example',
  templateUrl: './select.component.html',
})
export class KitAntdSelectExampleComponent implements OnInit {
  listOfOption: Array<{ label: string; value: string }> = []
  size = 'default'
  selectedValue = 'lucy'
  tagValue = ['a10', 'c12', 'tag']

  ngOnInit(): void {
    const children: Array<{ label: string; value: string }> = []
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i })
    }
    this.listOfOption = children
  }
}
