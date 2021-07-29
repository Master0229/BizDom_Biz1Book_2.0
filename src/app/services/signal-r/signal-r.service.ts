import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import * as moment from 'moment'
import * as signalR from '@microsoft/signalr'
import { AuthService } from 'src/app/auth.service'
import { NotificationService } from '../notification/notification.service'
import { UrbanpiperService } from '../urbanpiper/urbanpiper.service'
import { EventService } from '../event/event.service'
// import { NotificationService } from '../service/notification/notification.service';
// import { AuthService } from '../auth.service';
// import { DataService } from './data.service';

// import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  base_url1 = 'https://localhost:44383/'
  base_url = 'https://biz1pos.azurewebsites.net/'
  base_urlc = 'https://biz1posapi-rv7.conveyor.cloud/'

  hubconnection: signalR.HubConnection = new signalR.HubConnectionBuilder()
    .withUrl(this.base_url + 'uphub')
    .withAutomaticReconnect([0, 1000, 5000, 10000])
    .configureLogging(signalR.LogLevel.Information)
    .build()
  CompanyId
  StoreId
  hubRoom
  isconnected: boolean = false
  logInfo
  shouldConnect: boolean = true
  notificationobj = {}
  orders = []
  autoaccepttime: number
  foodpreptime: number
  bot

  constructor(
    public router: Router,
    private notification: NotificationService,
    private auth: AuthService,
    private upservice: UrbanpiperService,
    private event: EventService,
  ) {
    this.logInfo = JSON.parse(localStorage.getItem('logInfo'))
    if (this.logInfo != (undefined || null)) {
      this.CompanyId = this.logInfo.CompanyId
      this.StoreId = this.logInfo.StoreId
      this.hubRoom = this.StoreId + '/' + this.CompanyId
      this.foodpreptime = this.logInfo.FoodPrepTime
      this.autoaccepttime = this.logInfo.AutoAcceptTime
    }

    this.hubconnection.on('NewOrder', (platform, id, storeid) => {
      console.log('NEW ORDER', this.router.url)
      console.log(platform, id, storeid, this.StoreId)
      var notificationobj = {
        title: `New ${platform.charAt(0).toUpperCase() + platform.slice(1)} Order!`,
        subtitle: 'PLease accept ASAP',
        body: 'A new online order hs been placed',
        other: { platform: platform },
      }
      if (this.StoreId == storeid) {
        this.notifyorder()
        this.notification.notify(notificationobj)
      }
    })

    this.hubconnection.on('orderupdate', (orderid, storeid) => {
      if (this.StoreId == storeid) {
        this.notifyorder()
      }
    })

    this.hubconnection.on('DeliveryOrderUpdate', (fromstoreid, tostoreid, invoiceno) => {
      console.log('DeliveryOrderUpdate', fromstoreid, tostoreid, invoiceno)
      if (tostoreid == this.StoreId) {
        this.auth.getorderbyinvoice(invoiceno).subscribe(data => {
          var order = JSON.parse(data['OrderJson'])
          order.status = "S"
          this.auth.updatepreorderbyinvoice(order).subscribe(data => {
            this.event.emitNotif({ newerrororder: true })
          })
        })
      } else {
        this.auth.checkanddeletepreorder(invoiceno).subscribe(data => {
          this.event.emitNotif({ newerrororder: true })
        })
      }
    })

    this.hubconnection.onreconnecting(err => {
      console.log('<😱>', err)
    })

    this.hubconnection.onreconnected(connectionid => {
      console.log(connectionid)
      this.notifyorder()
    })
  }

  setLogInfo() {
    this.logInfo = JSON.parse(localStorage.getItem('logInfo'))
    console.log(this.logInfo)
    if (this.logInfo != (undefined || null)) {
      this.CompanyId = this.logInfo.CompanyId
      this.StoreId = this.logInfo.StoreId
      this.hubRoom = this.StoreId + '/' + this.CompanyId
    }
  }

  connect(from) {
    this.setLogInfo()
    console.log('start connection', from, this.hubconnection.state)
    if (navigator.onLine && this.logInfo != (undefined || null)) {
      this.hubconnection
        .start()
        .then(() => {
          console.log('Connection started! <😎>')
          this.isconnected = true
          this.notifyorder()
          // this.hubconnection.invoke('joinroom', this.hubRoom);
        })
        .catch(err => {
          setTimeout(() => {
            this.connect('signalr-service-error')
            console.log(err)
          }, 2000)
        })
    } else {
      setTimeout(() => {
        this.setLogInfo()
        if (navigator.onLine) this.connect('signalr-service-offline')
      }, 2000)
    }
  }

  getOrders() {
    if (this.isconnected) {
      // this.hubconnection.invoke('GetStoreOrders', this.hubRoom, this.StoreId);
    } else {
      setTimeout(() => this.getOrders(), 2000)
    }
  }

  getKOTs() {
    if (this.isconnected) {
      this.hubconnection.invoke('GetStoreKOTs', this.hubRoom, this.StoreId)
    } else {
      setTimeout(() => this.getOrders(), 2000)
    }
  }

  disconnect() {
    this.logInfo = null
    this.CompanyId = null
    this.StoreId = null
    this.hubRoom = null
    this.shouldConnect = false
    this.hubconnection
      .stop()
      .then(() => {
        console.log('Terminated Succesfully 😎')
      })
      .catch(() => {
        this.shouldConnect = true
        console.log('Error Terminating 😱')
      })
  }

  notifyorder() {
    if (this.router.url != '/apps/order') {
      this.auth.getstoreuporders(this.StoreId).subscribe(data => {
        var orders = data['orders']
        var newordercount = 0
        orders.forEach(order => {
          if (order.OrderStatusId == 0) newordercount++
        })
        this.notificationobj['onlineordercount'] = newordercount
        // this.ds.notify(this.notificationobj)
        if (newordercount > 0) {
          this.notification.startnotificationsound()
        } else {
          this.notification.stopnotificationsound()
        }
        this.startBot(orders)
      })
    }
  }

  startBot(orders) {
    this.orders = orders
    clearInterval(this.bot)
    if (orders.some(x => x.OrderStatusId == 0)) {
      this.bot = setInterval(() => {
        this.checkunacceptedorder()
      }, 60000)
    }
  }

  checkunacceptedorder() {
    this.orders.forEach(order => {
      if (order.OrderStatusId == 0) {
        var placedtimestamp = JSON.parse(order.Json).order.details.created
        var elapsedminutes = (new Date().getTime() - placedtimestamp) / (1000 * 60)
        console.log('CHECKING UNACCEPTED ORDER', this.autoaccepttime, elapsedminutes)
        if (elapsedminutes >= this.autoaccepttime) {
          this.upservice.accept(order.UPOrderId)
        }
      } else if (order.OrderStatusId == 1) {
      }
    })
  }
}
