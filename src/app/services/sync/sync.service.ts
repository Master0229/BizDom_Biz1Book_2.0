import { Injectable } from '@angular/core'
import { AuthService } from 'src/app/auth.service'
import { EventService } from '../event/event.service'

@Injectable({
  providedIn: 'root',
})
export class SyncService {
  cansaveorder = true
  pendingorders: any = []
  preorders: any = []
  cansavepreorder: boolean = true
  cansavependingorder: boolean = true
  constructor(private auth: AuthService, private event: EventService) { }
  sync() {
    console.log(navigator.onLine)
    if (this.preorders.length == 0) this.cansavepreorder = true
    if (this.pendingorders.length == 0) this.cansavependingorder = true
    if (this.cansavepreorder) this.getpreorders()
    if (this.cansavependingorder) this.getorders()
    // if (this.cansaveorder) {
    //   this.getorders()
    //   this.getpreorders()
    // }
  }
  getorders() {
    this.event.emitNotif({ newerrororder: true })
    if (navigator.onLine) {
      if (this.pendingorders.length == 0) {
        this.cansavependingorder = false
        this.auth.getorders().subscribe(data => {
          this.pendingorders = data
          if (this.pendingorders.length > 0) this.saveorders()
          else this.cansavependingorder = true
        })
      } else {
        this.saveorders()
      }
    } else {
      setTimeout(() => {
        this.getorders()
      }, 30000)
    }
  }
  saveorders() {
    var order = this.pendingorders.shift()
    this.auth.saveorder({ OrderJson: JSON.stringify(order) }).subscribe(
      data => {
        var responselogdata = { invoiceno: order.InvoiceNo, loggeddatetime: new Date().getTime(), response: data }
        this.logresponse(responselogdata)
        if (data['status'] == 200 || data['status'] == 409) {
          this.auth.transactionsinvoice(order.InvoiceNo).subscribe(trdt => {
            var transactions: any = trdt
            if (transactions.length > 0) {
              transactions.forEach(tr => {
                tr.OrderId = data['data'][0].OrderId
              })
              this.auth.ordertransaction(transactions).subscribe(otdt => {
                this.auth.deleteorderfromnedb(order._id, order.InvoiceNo).subscribe(ddata => {
                  this.getorders()
                })
              })
            } else {
              this.auth.deleteorderfromnedb(order._id, order.InvoiceNo).subscribe(ddata => {
                this.getorders()
              })
            }
          })
        } else if (data['status'] == 409) {
          order.status = 'D'
          this.auth.updateordertonedb(order).subscribe(ddata => {
            this.getorders()
          })
        } else if (data['status'] == 500) {
          order.status = 'E'
          order.error = data['error']
          this.auth.updateordertonedb(order).subscribe(ddata => {
            this.getorders()
          })
        }
      },
      error => {
        this.getorders()
      },
    )
  }
  /////////////////////////////////////////// PREORDERS
  getpreorders() {
    this.event.emitNotif({ newerrororder: true })
    if (navigator.onLine) {
      if (this.preorders.length == 0) {
        this.cansavepreorder = false
        this.auth.getpreorders().subscribe(data => {
          this.preorders = data
          this.preorders = this.preorders.filter(
            x => x.datastatus == 'new_order' || x.datastatus == 'edit_order',
          )
          if (this.preorders.length > 0) this.savepreorder()
          else this.cansavepreorder = true
        })
      } else {
        this.savepreorder()
      }
    } else {
      setTimeout(() => {
        this.getpreorders()
      }, 30000)
    }
  }
  savepreorder() {
    var order = this.preorders.shift()
    if (order.datastatus == 'new_order' || (order.datastatus == 'new_order_retry' && order.retrytime >= new Date().getTime())) {
      this.auth.saveorder({ OrderJson: JSON.stringify(order) }).subscribe(
        data => {
          var responselogdata = { invoiceno: order.InvoiceNo, loggeddatetime: new Date().getTime(), response: data }
          this.logresponse(responselogdata)
          if (data['status'] == 200) {
            order.status = 'S'
            order.OrderId = data['data'][0].OrderId
            order.changeditems = []
            order.Transactions = []

            this.auth.transactionsinvoice(order.InvoiceNo).subscribe(trdt => {
              var transactions: any = trdt
              if (transactions.length > 0) {
                transactions.forEach(tr => {
                  tr.OrderId = data['data'][0].OrderId
                })
                this.auth.ordertransaction(transactions).subscribe(otdt => {
                  this.auth.updatepreorders(order).subscribe(ddata => {
                    this.getpreorders()
                  })
                })
              } else {
                this.auth.updatepreorders(order).subscribe(ddata => {
                  this.getpreorders()
                })
              }
            })
          } else if (data['status'] == 409) {
            order.status = 'D'
            this.auth.updatepreorders(order).subscribe(ddata => {
              this.getpreorders()
            })
          } else if (data['status'] == 500) {
            order.status = 'E'
            order.error = data['error']
            if (data["error"]["InnerException"] != null && data["error"]["InnerException"].includes("Timeout expired")) {
              order.status = 'P'
              order.datastatus = "new_order_retry"
              order.retrytime = new Date().getTime() + 60000
            }
            this.auth.updatepreorders(order).subscribe(ddata => {
              this.getpreorders()
            })
          }
        },
        error => {
          this.getpreorders()
        },
      )
    } else if (order.datastatus == 'edit_order' || (order.datastatus == 'edit_order_retry' && order.retrytime >= new Date().getTime())) {
      this.auth.updateorder({ OrderJson: JSON.stringify(order) }).subscribe(
        data => {
          if (data['status'] == 200) {
            order.status = 'S'
            order.changeditems = []
            order.Transactions = []

            this.auth.transactionsinvoice(order.InvoiceNo).subscribe(trdt => {
              var transactions: any = trdt
              if (transactions.length > 0) {
                transactions.forEach(tr => {
                  tr.OrderId = order.OrderId
                })
                this.auth.ordertransaction(transactions).subscribe(otdt => {
                  this.auth.logtransactions(transactions).subscribe(tldt => { })
                  this.auth.updatepreorders(order).subscribe(ddata => {
                    this.getpreorders()
                  })
                })
              } else {
                this.auth.updatepreorders(order).subscribe(ddata => {
                  this.getpreorders()
                })
              }
            })
          } else if (data['status'] == 409) {
            order.status = 'D'
            this.auth.updatepreorders(order).subscribe(ddata => {
              this.getpreorders()
            })
          } else if (data['status'] == 500) {
            order.status = 'E'
            order.error = data['error']
            if (data["error"]["InnerException"] != null && data["error"]["InnerException"].includes("Timeout expired")) {
              order.status = 'P'
              order.datastatus = "edit_order_retry"
              order.retrytime = new Date().getTime() + 60000
            }
            this.auth.updatepreorders(order).subscribe(ddata => {
              this.getpreorders()
            })
          }
        },
        error => {
          this.getpreorders()
        },
      )
    } else {
      this.getpreorders()
    }
  }
  logresponse(logdata) {
    this.auth.logordersaveresponse(logdata).subscribe(data => { })
  }
}
