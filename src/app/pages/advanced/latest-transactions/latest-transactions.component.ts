import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import * as moment from 'moment'
import { AuthService } from 'src/app/auth.service'

@Component({
  selector: 'app-latest-transactions',
  templateUrl: './latest-transactions.component.html',
  styleUrls: ['./latest-transactions.component.scss'],
})
export class LatestTransactionsComponent implements OnInit {
  @ViewChild('editmodal', { static: true }) editmodal: ElementRef
  @ViewChild('splittransaction', { static: true }) splittransaction: ElementRef

  storeid: number = 0
  companyid: number = 0
  transactions = []
  paymenttypes = []
  transaction = null
  invoiceno = ''
  splitpay = false
  roleid = 0
  constructor(private auth: AuthService, private modalservice: NgbModal) { }

  ngOnInit(): void {
    this.auth.getdbdata(['loginfo', 'user']).subscribe(data => {
      var loginfo = data['loginfo'][0]
      this.companyid = loginfo.CompanyId
      this.storeid = loginfo.StoreId
      this.roleid = data['user'][0].RoleId
      // if (data['user'][0].RoleId == 1) {
      this.last10transactions()
      // }
    })
  }

  last10transactions() {
    this.invoiceno = ''
    this.auth.last10transactions(this.storeid, this.companyid, '').subscribe(data => {
      console.log(data)
      this.transactions = data['transactions']
      this.paymenttypes = data['paymenttypes']
    })
  }

  transactionsbyinvoiceno() {
    this.auth.last10transactions(this.storeid, this.companyid, this.invoiceno).subscribe(data => {
      console.log(data)
      this.transactions = data['transactions']
      this.paymenttypes = data['paymenttypes']
    })
  }

  transaxns = []
  openmodal(tr) {
    this.splitpay = false
    console.log(tr)
    this.transaction = tr
    this.modalservice.open(this.editmodal)
  }

  savetransaction() {
    this.transaction.PaymentType = null
    this.auth.savetransaction([this.transaction]).subscribe(data => {
      this.last10transactions()
      this.modalservice.dismissAll()
    })
  }

  splitpayment() {
    this.transaxns = []
    this.paymenttypes.forEach(pt => {
      var obj = {
        Amount: 0,
        CompanyId: this.companyid,
        CustomerId: this.transaction.CustomerId,
        Id: 0,
        InvoiceNo: this.transaction.InvoiceNo,
        Notes: null,
        OrderId: this.transaction.OrderId,
        PaymentStatusId: null,
        PaymentTypeName: pt.Name,
        PaymentTypeId: 6,
        StoreId: this.storeid,
        StorePaymentTypeId: pt.Id,
        TransDate: moment().format("YYYY-MM-DD"),
        TransDateTime: moment().format("YYYY-MM-DD HH:MM"),
        TransTypeId: 1,
        UserId: null
      }
      if (this.transaction.StorePaymentTypeId == pt.Id) {
        obj.Id = this.transaction.Id
        obj.Amount = this.transaction.Amount
      }
      this.transaxns.push(obj)
    })
    console.log(this.transaxns)
    this.modalservice.dismissAll()
    this.modalservice.open(this.splittransaction)
  }
  errormessage = ''
  makesplitpayment() {
    var total = 0
    this.transaxns.forEach(trnxn => {
      total += trnxn.Amount
    })
    if (total != this.transaction.Amount) {
      this.errormessage = "total doesnot match the amount " + this.transaction.Amount
    } else {
      this.errormessage = ""
      this.auth.savetransaction(this.transaxns).subscribe(data => {
        this.last10transactions()
        this.modalservice.dismissAll()
      })
    }
  }
}
