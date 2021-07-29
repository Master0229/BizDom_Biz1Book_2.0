import { Component, OnInit } from '@angular/core'
import { NgbCalendar, NgbDateStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from 'src/app/auth.service'
import * as moment from 'moment'

@Component({
  selector: 'app-day-closing',
  templateUrl: './day-closing.component.html',
  styleUrls: ['./day-closing.component.scss'],
})
export class DayClosingComponent implements OnInit {
  companyid: number = 0
  storeid: number = 0
  selected_date: string = ''
  selected_time: string = ''
  time: { hour: number; minute: number }
  stores: any = []
  model: NgbDateStruct
  date: { year: number; month: number }
  dayclosingdata: any

  hoveredDate: NgbDate | null = null

  fromDate: NgbDate
  toDate: NgbDate | null = null
  constructor(private auth: AuthService, private calendar: NgbCalendar) {
    this.fromDate = calendar.getToday()
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10)
  }

  ngOnInit(): void {
    this.auth.getdbdata(['loginfo']).subscribe(data => {
      this.companyid = data['loginfo'][0].CompanyId
      this.storeid = data['loginfo'][0].StoreId
    })
  }

  gettransactions() {
    this.selected_date = moment(this.model).format('DD-MM-YYYY')
    this.selected_time = moment(this.time).format('HH:mm')
    this.auth.dayclosing(this.companyid, this.storeid, this.selected_date, null).subscribe(data => {
      console.log(data)
      this.dayclosingdata = data
    })
  }

  setdate(event) {
    console.log(event.next)
  }

  selectToday() {
    this.model = this.calendar.getToday()
    console.log(moment(this.model).format('YYYY-MM-DD'))
    console.log(this.date)
  }

  selectnow() {
    this.model = this.calendar.getToday()
    this.time = { hour: new Date().getHours(), minute: new Date().getMinutes() }
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date
    } else {
      this.toDate = null
      this.fromDate = date
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    )
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate)
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    )
  }
}
