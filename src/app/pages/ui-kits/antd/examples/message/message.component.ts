import { Component } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd/message'

@Component({
  selector: 'kit-antd-message-example',
  templateUrl: './message.component.html',
})
export class KitAntdMessageExampleComponent {
  createMessage(type: string): void {
    this.message.create(type, `This is a message of ${type}`)
  }

  constructor(private message: NzMessageService) {}
}
