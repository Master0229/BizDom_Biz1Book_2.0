import { Component } from '@angular/core'
import { NzNotificationService } from 'ng-zorro-antd/notification'

@Component({
  selector: 'kit-antd-notification-example',
  templateUrl: './notification.component.html',
})
export class KitAntdNotificationExampleComponent {
  createNotification(type: string): void {
    this.notification.create(
      type,
      'Notification Title',
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    )
  }

  constructor(private notification: NzNotificationService) {}
}
