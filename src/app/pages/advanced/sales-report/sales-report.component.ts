import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'
import { AuthService } from 'src/app/auth.service'

@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss'],
})
export class SalesReportComponent implements OnInit {
  companyid: number = 0
  storeid: number = 0
  from: string
  to: string
  loading: boolean = false
  pos_sales = []
  swzm_sales = []
  transactions = []
  currenttype = null
  dayclosingdata: any
  dayclosingtransactions = []
  cashintransactions = []
  cashouttransactions = []
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getdbdata(['loginfo']).subscribe(data => {
      var loginfo = data['loginfo'][0]
      this.companyid = loginfo.CompanyId
      this.storeid = loginfo.StoreId
      this.from = moment().format('YYYY-MM-DD')
      this.to = moment().format('YYYY-MM-DD')
      this.getstorepaymentsbytypes()
      this.getdayclosingdata()
    })
  }

  setPaymentImage(paymentType: string) {
    var url = ''
    paymentType = paymentType
      .trim()
      .replace(/[^a-zA-Z ]/g, '')
      .toLowerCase()
    console.log(paymentType)
    if (paymentType.toLowerCase().includes('cash')) {
      url = './assets/images/cash.png'
    } else if (paymentType.includes('googlepay') || paymentType.includes('gpay')) {
      url = './assets/images/google-pay.png'
    } else if (
      paymentType.includes('card') ||
      paymentType.includes('credit') ||
      paymentType.includes('debit')
    ) {
      url = './assets/images/credit-card.png'
    } else if (paymentType.includes('phonepe')) {
      url = './assets/images/phonepe.png'
    } else {
      url = './assets/images/payment.png'
    }
    return url
  }

  getstorepaymentsbytypes() {
    this.auth
      .getstorepaymentsbytype(this.storeid, this.companyid, this.from, this.to)
      .subscribe(data => {
        console.log(data)
        this.pos_sales = data['pos_transactions']
        this.swzm_sales = data['sw_zm_transactions']
        this.pos_sales.forEach(sl => {
          sl.icon = this.setPaymentImage(sl.PaymentType)
        })
        this.swzm_sales.forEach(sl => {
          if (sl.SourceId == 2) {
            sl.icon = './assets/images/swiggy.png'
            sl.platform = 'Swiggy'
          } else if (sl.SourceId == 3) {
            sl.icon = './assets/images/zomato.png'
            sl.platform = 'Zomato'
          }
        })
      })
  }

  transactionsbytype(sourceid, ptypeid, type) {
    this.cashintransactions = []
    this.cashouttransactions = []
    this.currenttype = type
    this.auth
      .gettransactionsbytype(this.storeid, this.companyid, this.from, this.to, sourceid, ptypeid)
      .subscribe(data => {
        console.log(data)
        this.transactions = data['transactions']
        var amount = 0
        this.transactions.forEach(tr => {
          amount += tr.Amount
        })
        console.log(amount)
      })
  }

  getdayclosingdata() {
    var _date = moment().format('DD-MM-YYYY')
    var _time = moment().format('HH:mm')
    this.auth.dayclosing(this.companyid, this.storeid, _date, null).subscribe(data => {
      console.log(data)
      this.dayclosingdata = data
      this.dayclosingdata.ExpectedClosingBal =
        this.dayclosingdata.closingTrans.OpeningBalance +
        this.dayclosingdata.CashIn -
        this.dayclosingdata.CashOut
    })
  }

  showdayclosingdata() {
    this.transactions = []
    this.cashintransactions = this.dayclosingdata.cashInTrx
    this.cashouttransactions = this.dayclosingdata.cashOutTrx
  }
}
