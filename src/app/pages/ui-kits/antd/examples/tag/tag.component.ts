import { Component } from '@angular/core'

@Component({
  selector: 'kit-antd-tag-example',
  templateUrl: './tag.component.html',
})
export class KitAntdTagExampleComponent {
  onClose(): void {
    console.log('tag was closed.')
  }

  preventDefault(e: Event): void {
    e.preventDefault()
    e.stopPropagation()
    console.log('tag can not be closed.')
  }
}
