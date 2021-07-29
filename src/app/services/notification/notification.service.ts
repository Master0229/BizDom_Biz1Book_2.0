import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { Howl, Howler } from 'howler';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationsound: Howl

  constructor(private electron: ElectronService) {
    if (this.electron.isElectronApp)
      this.notificationsound = new Howl({
        src: [__dirname + './assets/audio/plucky.mp3'],
        loop: true
      });
  }

  notify(notificationobj) {
    if (this.electron.isElectronApp) {
      // Importing the Notification Module from Electron,
      // Since it is a Part of the Main Process, Using the
      // Remote Module to Import it in Renderer Process
      const Notification = this.electron.remote.Notification;
      var imageurl = "";
      if (notificationobj.other.hasOwnProperty("platform")) {
        if (notificationobj.other.platform == "swiggy") {
          imageurl = __dirname + './assets/images/swiggy-notify.png'
        } else if (notificationobj.other.platform == "zomato") {
          imageurl = __dirname + './assets/images/zomato-notify.png'
        } else {
          imageurl = __dirname + './assets/images/food-ready-low.png'
        }
      }
      const options: Electron.NotificationConstructorOptions = {
        title: notificationobj.title,
        subtitle: notificationobj.subtitle,
        body: notificationobj.body,
        silent: false,
        icon: imageurl,
        hasReply: true,
        replyPlaceholder: 'Reply Here',
        closeButtonText: 'Close Button',
        actions: [{
          type: 'button',
          text: 'Show Button'
        }]
      }

      // Instantiating a new Notifications Object
      // with custom Options
      const customNotification = new Notification(options);

      customNotification.show();
      this.startnotificationsound()
      console.log("new Order Notification")
    }
  }

  startnotificationsound() {
    console.log("START NOTIFICATION")
    if (this.electron.isElectronApp) {
      this.notificationsound.stop()
      this.notificationsound.play()
    }
  }

  stopnotificationsound() {
    if (this.electron.isElectronApp)
      this.notificationsound.stop()
  }
}
