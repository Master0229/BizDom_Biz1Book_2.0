import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import * as UserActions from 'src/app/store/user/actions'
import * as Reducers from 'src/app/store/reducers'
import { AuthService } from 'src/app/auth.service'
import { SyncService } from 'src/app/services/sync/sync.service'
import { EventService } from 'src/app/services/event/event.service'
import { Router } from '@angular/router'
import { fromEvent, merge, Observable, Observer } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'cui-topbar-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class TopbarUserMenuComponent {
  badgeCount: number = 0
  name: string = ''
  role: string = ''
  email: string = ''
  phone: string = ''
  storename: string = ''
  isOnlineserv: Observable<boolean>
  isOnline: boolean

  constructor(
    private store: Store<any>,
    private auth: AuthService,
    private sync: SyncService,
    private event: EventService,
    private router: Router,
  ) {
    // this.store.pipe(select(Reducers.getUser)).subscribe(state => {
    //   this.name = state.name
    //   this.role = state.role
    //   this.email = state.email
    // })
    this.auth.getdbdata(['user', 'loginfo']).subscribe(data => {
      this.name = data['user'][0].Name
      this.role = data['user'][0].Role
      this.email = data['loginfo'][0].Email
      this.phone = data['loginfo'][0].ContactNo
      this.storename = data['loginfo'][0].Store
    })
    console.log(this.event)
    this.event.notify().subscribe(data => {
      if (data.hasOwnProperty('newordercount')) {
        this.badgeCount = data['newordercount']
      }
      if (data.hasOwnProperty('networkstatus')) {
        this.isOnline = data['networkstatus']
      }
    })
    this.isOnlineserv = merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine)
        sub.complete()
      }),
    )
  }

  badgeCountIncrease() {
    this.badgeCount = this.badgeCount + 1
  }

  syncorders() {
    this.sync.sync()
  }

  syncdata() {
    this.isOnlineserv.subscribe(data => {
      console.log(data)
      this.isOnline = data
    })
    var logInfo = JSON.parse(localStorage.getItem('logInfo'))
    this.auth.getStoreData(logInfo.CompanyId, logInfo.StoreId).subscribe(data => {
      console.log(data)
      console.log(JSON.stringify(Object.keys(data)))
      var storedata = {}
      storedata['product'] = data['Product']
      storedata['category'] = data['Category']
      storedata['customers'] = data['Customers']
      storedata['kotgroups'] = data['KotGroups']
      storedata['diningarea'] = data['DiningArea']
      storedata['diningtable'] = data['DiningTable']
      storedata['paymenttypes'] = data['StorePaymentTypes']
      storedata['discountrule'] = data['DiscountRule']
      storedata['additionalcharges'] = data['AdditionalCharge']
      storedata['stores'] = data['Stores']
      storedata['pendingorders'] = []
      storedata['preorders'] = []
      storedata['orderstatusbtns'] = data['OrderStatusButtons']
      data['PendingOrders'].forEach((oj, index) => {
        // console.log(oj.Id,index, oj.OrderNo)
        if (oj.OrderJson) {
          var json = JSON.parse(oj.OrderJson)
          console.log(json.InvoiceNo, oj.OrderNo)
          json.datastatus = ''
          json.status = 'S'
          delete json._id
          storedata['preorders'].push(json)
        } else {
          // console.log(oj.OrderJson)
        }
      })
      this.auth.storeselect(storedata).subscribe(data1 => {
        console.log(data1)
        this.router.navigateByUrl('/auth/lockpage')
      })
      this.auth.getdbdata(['printersettings']).subscribe(data => {
        var printersettings = data['printersettings'][0] ? data['printersettings'][0] : {}
        printersettings.kotgroups = []
        if (storedata['kotgroups']) {
          storedata['kotgroups'].forEach(kotgrp => {
            var obj = kotgrp
            obj.Printers = JSON.parse(kotgrp.Printer)
            delete obj.Printer
            printersettings.kotgroups.push(obj)
          })
        }
        this.auth.updateprintersettings(printersettings).subscribe(data => { })
      })
      // ["<Category>","<TaxGroup>","<Product>","<DiningArea>","<DiningTable>","<DiscountRule>","<AdditionalCharge>",
      // "<OrderType>","<Customers>","<PaymentType>","<KotGroups>","PendingOrders","<StorePaymentTypes>",
      // "<OrderStatus>","<ItemStatus>","<KOTStatus>","<PaymentStatus>","<TableStatus>","<TransType>","<Aggregators>"]
    })
  }

  logout() {
    localStorage.removeItem('token')
    this.store.dispatch(new UserActions.Logout())
  }
}
