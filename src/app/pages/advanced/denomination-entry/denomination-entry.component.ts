import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from 'src/app/auth.service';
import { Entry, DenomEntry } from './denomentry.module';
import * as moment from 'moment'

@Component({
  selector: 'app-denomination-entry',
  templateUrl: './denomination-entry.component.html',
  styleUrls: ['./denomination-entry.component.scss']
})
export class DenominationEntryComponent implements OnInit {
  model: NgbDateStruct
  date: { year: number; month: number }
  loginfo
  visible: boolean = false
  denomEntries = []
  tempentry: Entry
  denomEntry: DenomEntry
  denominationTypes: any = []
  today = moment().format('YYYY-MM-DD')
  selectedDate = ''

  constructor(private calendar: NgbCalendar, private auth: AuthService) {
    this.loginfo = JSON.parse(localStorage.getItem('logInfo'))
  }

  ngOnInit(): void {
    this.model = this.calendar.getToday()
    console.log(this.model)
    this.getDenominationTypes()
    this.fetchEntries(moment().format('YYYY-MM-DD'))
  }

  getDenominationTypes() {
    this.auth.denominationTypes().subscribe(data => {
      console.log(data)
      this.denominationTypes = data
    })
  }

  selectToday() {
    this.model = this.calendar.getToday()
  }

  onDateSelect(date: NgbDate) {
    this.model = date
    this.selectedDate = moment(`${date.year}-${date.month}-${date.day}`).format('YYYY-MM-DD')
    console.log(this.today, this.selectedDate)
    this.fetchEntries(`${date.year}-${date.month}-${date.day}`)
  }

  fetchEntries(date) {
    this.auth.fetchDenominationEntries(this.loginfo.StoreId, date).subscribe(data => {
      console.log(data)
      this.denomEntries = data["data"] ? data["data"] : []
      this.denomEntries = this.denomEntries.sort((a, b) => { return new Date(b.EntryDateTime).getTime() - new Date(a.EntryDateTime).getTime() })
      this.denomEntries.forEach(dentry => {
        dentry.edited = false
        dentry.CashInTransaxns = JSON.parse(dentry.CashInJson)
        dentry.CashOutTransaxns = JSON.parse(dentry.CashOutJson)
        dentry.diff = dentry.TotalAmount - dentry.ExpectedBalance
        dentry.Remarks = dentry.diff == 0 ? 'Tallied' : dentry.diff > 0 ? 'Excess' : 'Shortage'
        if (this.denomEntries.some(x => x.EditedForId == dentry.Id)) {
          dentry.edited = true
          dentry.editid = this.denomEntries.filter(x => x.EditedForId == dentry.Id)[0].Id
        }
      })
    })
  }

  getDayCLosingData(EntryDateTime) {
    console.log(this.model, moment(this.model).format('DD-MM-YYYY'))
    var _date = moment(this.model).format('DD-MM-YYYY')
    this.auth.dayclosing(this.loginfo.CompanyId, this.loginfo.StoreId, _date, moment(EntryDateTime).format("hh:mm")).subscribe(data => {
      console.log(data)
    })
  }

  open(): void {
    this.visible = true
    this.denomEntry = new DenomEntry(this.loginfo, null)
    this.denominationTypes.forEach(den => {
      this.denomEntry.Entries.push(new Entry(den))
    });
  }

  edit(editid) {
    this.visible = true
    this.denomEntry = new DenomEntry(this.loginfo, editid)
    this.denominationTypes.forEach(den => {
      this.denomEntry.Entries.push(new Entry(den))
    });
  }

  checkDenomination() {
    return this.denominationTypes.includes(this.tempentry.DenomName) ? true : false
  }

  calculate() {
    this.denomEntry.TotalAmount = 0
    this.denomEntry.Entries.forEach(entry => {
      entry.Amount = +entry.DenomName * entry.Count
      this.denomEntry.TotalAmount += entry.Amount
    })
  }

  save() {

    if (this.denomEntry.Entries.some(e => e.Count > 0 && e.Amount > 0)) {
      if (this.denomEntry.EditedForId == null) {
        var date = moment().format('YYYY-MM-DD')
        this.auth
          .getstorecashsales(this.loginfo.StoreId, this.loginfo.CompanyId, date)
          .subscribe(data => {
            console.log(data)
            var cash_transaxns = data['totalsales'][0].cashsales
            this.denomEntry.EntryDateTime = moment().format('YYYY-MM-DD hh:mm A')
            this.denomEntry.Entries = this.denomEntry.Entries.filter(e => e.Count > 0 && e.Amount > 0)
            console.log(this.model, moment(this.model).format('DD-MM-YYYY'))
            var _date = moment().format('DD-MM-YYYY')
            this.auth.dayclosing(this.loginfo.CompanyId, this.loginfo.StoreId, _date, '13:51').subscribe(dcdata => {
              this.denomEntry.OpeningBalance = dcdata["closingTrans"]["OpeningBalance"]
              this.denomEntry.CashIn = dcdata["CashIn"]
              this.denomEntry.CashOut = dcdata["CashOut"]
              this.denomEntry.SalesCash = data['totalsales'][0].cashsales ? data['totalsales'][0].cashsales : 0
              console.log(this.denomEntry.OpeningBalance, this.denomEntry.CashIn, this.denomEntry.SalesCash, this.denomEntry.CashOut)
              this.denomEntry.ExpectedBalance = this.denomEntry.OpeningBalance + this.denomEntry.CashIn + this.denomEntry.SalesCash - this.denomEntry.CashOut
              this.denomEntry.CashInJson = JSON.stringify(dcdata["cashInTrx"])
              this.denomEntry.CashOutJson = JSON.stringify(dcdata["cashOutTrx"])
              this.denomEntry.TransactionJson = JSON.stringify(data["transactions"])
              this.auth.addDenomEntry(this.denomEntry).subscribe(data => {
                this.visible = false
                this.fetchEntries(moment().format('YYYY-MM-DD'))
              })
            })
          })
      } else {
        var parentEntry = this.denomEntries.filter(x => x.Id == this.denomEntry.EditedForId)[0]
        console.log(parentEntry)
        this.denomEntry.EntryDateTime = moment().format('YYYY-MM-DD hh:mm A')
        this.denomEntry.Entries = this.denomEntry.Entries.filter(e => e.Count > 0 && e.Amount > 0)
        this.denomEntry.OpeningBalance = parentEntry["OpeningBalance"]
        this.denomEntry.CashIn = parentEntry["CashIn"]
        this.denomEntry.SalesCash = parentEntry["SalesCash"]
        this.denomEntry.CashOut = parentEntry["CashOut"]
        this.denomEntry.ExpectedBalance = this.denomEntry.OpeningBalance + this.denomEntry.CashIn + this.denomEntry.SalesCash - this.denomEntry.CashOut
        this.denomEntry.CashInJson = parentEntry["CashInJson"]
        this.denomEntry.CashOutJson = parentEntry["CashOutJson"]

        this.auth.addDenomEntry(this.denomEntry).subscribe(data => {
          this.visible = false
          this.fetchEntries(moment().format('YYYY-MM-DD'))
        })
      }
    }
  }

  close() {
    console.log("side drawer closed")
    this.visible = false
  }
}