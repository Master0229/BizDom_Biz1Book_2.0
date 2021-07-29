import { Component, OnInit } from '@angular/core'

import { select, Store } from '@ngrx/store'
import store from 'store'
import * as SettingsActions from 'src/app/store/settings/actions'
import * as Reducers from 'src/app/store/reducers'
import { NotificationService } from 'src/app/services/notification/notification.service'

@Component({
  selector: 'cui-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {
  time = new Date();
  theme: string


  constructor(private store: Store<any>, private ns: NotificationService) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.theme = state.theme

    })
    }

  ngOnInit() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  setTheme(nextTheme) {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        theme: nextTheme,
      }),
    )
  }

  stopnotificationsound() {
    this.ns.stopnotificationsound()
  }
}
