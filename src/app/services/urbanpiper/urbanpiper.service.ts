import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UrbanpiperService {
  statusdata = {
    "1": {
      new_status: 'Acknowledged',
      message: 'Order Accepted from restaurant'
    },
    "3": {
      new_status: 'Food Ready',
      message: 'Food prepared @Restaurant'
    },
    "4": {
      new_status: 'Dispatched',
      message: 'Driver picked up the order'
    },
    "5": {
      new_status: 'Completed',
      message: 'Order delivered to customer'
    },
    "-1": {
      new_status: 'Cancelled',
      message: ""
    }
  }
  logInfo: any;
  CompanyId: number;
  StoreId: number;

  constructor(private auth: AuthService) {
    // this.logInfo = JSON.parse(localStorage.getItem("logInfo"));
    // this.CompanyId = this.logInfo.CompanyId
    // this.StoreId = this.logInfo.StoreId
  }

  accept(orderid) {
    var statusdata = JSON.stringify(this.statusdata["1"])
    this.orderstatusupdate(orderid, statusdata, 1)
  }

  foodready(orderid) {
    var statusdata = JSON.stringify(this.statusdata["3"])
    this.orderstatusupdate(orderid, statusdata, 3)
  }

  private orderstatusupdate(orderid, statusdata, statusid) {
    this.setLogInfo()
    this.auth
      .UPOrderStatusChange(orderid, JSON.stringify(statusdata), statusid, this.StoreId, this.CompanyId)
      .subscribe(data => {
        console.log(data)
      })
  }

  setLogInfo() {
    this.logInfo = JSON.parse(localStorage.getItem("logInfo"));
    console.log(this.logInfo)
    if (this.logInfo != (undefined || null)) {
      this.CompanyId = this.logInfo.CompanyId;
      this.StoreId = this.logInfo.StoreId;
    }
  }
}
