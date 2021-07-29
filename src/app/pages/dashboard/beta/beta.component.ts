import { Component, OnInit } from '@angular/core'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'

declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-dashboard-alpha',
  templateUrl: './beta.component.html',
})
export class DashboardBetaComponent implements OnInit {
  taskTableData = data.taskTableData
  progressGroup = data.progressGroup

  databaseData = data.databaseTable
  displayDatabaseData = [...this.databaseData]
  sortNameDatabase = null
  sortValueDatabase = null

  allChecked = false
  indeterminate = false
  rangeMarks = {
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    60: '60',
    70: '70',
    80: '80',
    90: '90',
    100: '100',
  }

  rangeSlider = data.rangeSlider
  weekChartData = data.weekChartData
  weekChartOptions = {
    fullWidth: true,
    showArea: false,
    chartPadding: {
      right: 30,
      left: 0,
    },
    plugins: [
      ChartistTooltip({
        appendToBody: true,
      }),
    ],
  }
  monthChartData = data.monthChartData
  monthChartOptions = {
    seriesBarDistance: 10,
    plugins: [
      ChartistTooltip({
        appendToBody: true,
      }),
    ],
  }

  calendarData = data.calendarData

  date = new Date(2012, 11, 21)
  mode = 'month'

  sort(sort: { key: string; value: string }): void {
    this.sortNameDatabase = sort.key
    this.sortNameDatabase = sort.value
    this.search()
  }

  search(): void {
    if (this.sortNameDatabase && this.sortNameDatabase) {
      this.displayDatabaseData = this.databaseData.sort((a, b) =>
        this.sortNameDatabase === 'ascend'
          ? a[this.sortNameDatabase] > b[this.sortNameDatabase]
            ? 1
            : -1
          : b[this.sortNameDatabase] > a[this.sortNameDatabase]
          ? 1
          : -1,
      )
    } else {
      this.displayDatabaseData = this.databaseData
    }
  }

  currentPageDataChange(
    $event: Array<{ name: string; username: number; checked: boolean; disabled: boolean }>,
  ): void {
    this.taskTableData = $event
  }

  refreshStatus(): void {
    const allChecked = this.taskTableData
      .filter(value => !value.disabled)
      .every(value => value.checked === true)
    const allUnChecked = this.taskTableData
      .filter(value => !value.disabled)
      .every(value => !value.checked)
    this.allChecked = allChecked
    this.indeterminate = !allChecked && !allUnChecked
  }

  checkAll(value: boolean): void {
    this.taskTableData.forEach(data => {
      if (!data.disabled) {
        data.checked = value
      }
    })
    this.refreshStatus()
  }

  ngOnInit() {}

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394
    }
    return null
  }
}
