import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { NzNotificationService } from 'ng-zorro-antd'
import { AuthService } from 'src/app/auth.service'
import * as UserActions from 'src/app/store/user/actions'

@Component({
  selector: 'cui-system-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['../style.component.scss'],
})
export class LockscreenComponent {
  pin: string
  loginfo
  constructor(private auth: AuthService, private store: Store<any>,
    private notification: NzNotificationService,
    private router: Router) {
    this.getloginfo()
  }

  getloginfo() {
    this.auth.getdbdata(["loginfo"]).subscribe(data => {
      this.loginfo = data["loginfo"][0]
      if(!this.loginfo) this.logout()
    })
  }

  unlock() {
    var loginfo = JSON.parse(localStorage.getItem('logInfo'))
    this.auth.unlock(this.pin).subscribe(data => {
      console.log(data)
      if (data["status"] == 200) {
        loginfo.UserId = data["userid"]
        loginfo.RoleId = data["roleid"]
        localStorage.setItem('logInfo',JSON.stringify(loginfo))
        this.store.dispatch(new UserActions.LoginSuccessful({}))
        this.router.navigate(['/apps/order'])
      } else {
        this.notification.error("Pin Mismatch", data["data"])
      }
    })
  }

  logout() {
    localStorage.removeItem("token")
    this.router.navigate(['/auth/login'])
  }
}
