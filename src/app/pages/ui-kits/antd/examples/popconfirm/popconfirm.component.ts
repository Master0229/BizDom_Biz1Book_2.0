import { Component } from '@angular/core'
import { NzMessageService } from 'ng-zorro-antd/message'

@Component({
  selector: 'kit-antd-popconfirm-example',
  templateUrl: './popconfirm.component.html',
})
export class KitAntdPopconfirmExampleComponent {
  cancel(): void {
    this.nzMessageService.info('click cancel')
  }

  confirm(): void {
    this.nzMessageService.info('click confirm')
  }

  constructor(private nzMessageService: NzMessageService) {}
}
