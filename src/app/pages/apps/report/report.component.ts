import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store'
import * as SettingsActions from 'src/app/store/settings/actions'
import * as Reducers from 'src/app/store/reducers'

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  isSupportChatOpen: boolean

  constructor(private store: Store<any>) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.isSupportChatOpen = state.isSupportChatOpen
    })
  }

  ngOnInit(): void {
  }


  toggle() {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        isSupportChatOpen: !this.isSupportChatOpen,
      }),
    )
  }

}
