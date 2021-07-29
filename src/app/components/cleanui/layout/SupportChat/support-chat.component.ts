import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as SettingsActions from 'src/app/store/settings/actions'
import * as Reducers from 'src/app/store/reducers'

@Component({
  selector: 'cui-support-chat',
  templateUrl: './support-chat.component.html',
  styleUrls: ['./support-chat.component.scss'],
})
export class SupportChatComponent {
  isSupportChatOpen: boolean

  constructor(private store: Store<any>) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.isSupportChatOpen = state.isSupportChatOpen
    })
  }

  toggle() {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        isSupportChatOpen: !this.isSupportChatOpen,
      }),
    )
  }
}
