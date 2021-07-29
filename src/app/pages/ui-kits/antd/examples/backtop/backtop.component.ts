import { Component } from '@angular/core'

@Component({
  selector: 'kit-antd-backtop-example',
  templateUrl: './backtop.component.html',
  styles: [
    `
      strong {
        color: rgba(64, 64, 64, 0.6);
      }

      ::ng-deep .ant-back-top {
        z-index: 10000;
      }
    `,
  ],
})
export class KitAntdBackTopExampleComponent {}
