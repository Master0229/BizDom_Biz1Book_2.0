import { Component, Input } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'

@Component({
  selector: 'cui-acl',
  template: `
    <ng-content *ngIf="authorized"></ng-content>
  `,
})
export class ACLComponent {
  @Input() roles: any[] = []
  authorized: Boolean = false

  constructor(private store: Store<any>) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.authorized = this.roles.includes(state.role)
    })
  }
}
