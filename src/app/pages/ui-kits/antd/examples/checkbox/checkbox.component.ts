import { Component } from '@angular/core'

@Component({
  selector: 'kit-antd-checkbox-example',
  templateUrl: './checkbox.component.html',
})
export class KitAntdCheckboxExampleComponent {
  checked: Boolean = true

  checkOptionsOne = [
    { label: 'Apple', value: 'Apple', checked: true },
    { label: 'Pear', value: 'Pear' },
    { label: 'Orange', value: 'Orange' },
  ]
  checkOptionsTwo = [
    { label: 'Apple', value: 'Apple' },
    { label: 'Pear', value: 'Pear', checked: true },
    { label: 'Orange', value: 'Orange' },
  ]
  checkOptionsThree = [
    { label: 'Apple', value: 'Apple', disabled: true, checked: true },
    { label: 'Pear', value: 'Pear', disabled: true },
    { label: 'Orange', value: 'Orange' },
  ]

  log(value: object[]): void {
    console.log(value)
  }
}
