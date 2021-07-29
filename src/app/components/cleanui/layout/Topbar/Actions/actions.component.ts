import { Component } from '@angular/core'
import { AuthService } from 'src/app/auth.service'
import { EventService } from 'src/app/services/event/event.service'

@Component({
  selector: 'cui-topbar-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class TopbarActionsComponent {
  erroredorders = []

  constructor(private auth: AuthService, private event: EventService) {
    this.geterrorredorders()
    this.event.notify().subscribe(data => {
      if (data.hasOwnProperty('newerrororder')) {
        this.geterrorredorders()
      }
    })
  }
  geterrorredorders() {
    this.auth.erroredorders().subscribe(data => {
      console.log(data)
      this.erroredorders = data['pendingorders']
      this.erroredorders = [...data['preorders']]
    })
  }
}
