import { Component } from '@angular/core'

@Component({
  selector: 'kit-antd-autocomplete-example',
  templateUrl: './autocomplete.component.html',
})
export class KitAntdAutoCompleteExampleComponent {
  inputValue: string
  options: string[] = []

  inputValueCustom: string
  optionsCustom: string[] = []

  onInput(value: string): void {
    this.options = value ? [value, value + value, value + value + value] : []
  }

  onInputCustom(e: Event): void {
    const value = (e.target as HTMLInputElement).value
    if (!value || value.indexOf('@') >= 0) {
      this.optionsCustom = []
    } else {
      this.optionsCustom = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`)
    }
  }
}
