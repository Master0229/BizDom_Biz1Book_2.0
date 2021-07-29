import { Component } from '@angular/core'

@Component({
  selector: 'kit-antd-mention-example',
  templateUrl: './mention.component.html',
})
export class KitAntdMentionExampleComponent {
  inputValue: string = '@afc163'
  suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご']

  onChange(value: string): void {
    console.log(value)
  }

  onSelect(suggestion: string): void {
    console.log(`onSelect ${suggestion}`)
  }
}
