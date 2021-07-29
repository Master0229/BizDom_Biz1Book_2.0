import { Component, ViewChild, AfterViewChecked } from '@angular/core'
import { ChartComponent } from 'angular2-chartjs'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'kit-chart-10',
  templateUrl: './10.component.html',
  styleUrls: ['./10.component.scss'],
})
export class CuiChart10Component implements AfterViewChecked {
  @ViewChild(ChartComponent) chart: ChartComponent
  @ViewChild('tooltip') tooltip
  @ViewChild('tooltipLabel') tooltipLabel
  @ViewChild('tooltipValue') tooltipValue
  @ViewChild('legend') legend
  chartData = data
  options = {
    responsive: true,
    maintainAspectRatio: false,
    cutoutPercentage: 70,
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
      custom: tooltipData => {
        const tooltipEl = this.tooltip.nativeElement
        tooltipEl.style.opacity = 1
        if (tooltipData.opacity === 0) {
          tooltipEl.style.opacity = 0
        }
      },
      callbacks: {
        label: (tooltipItem, itemData) => {
          const dataset = itemData.datasets[0]
          const value = dataset.data[tooltipItem.index]
          this.tooltipLabel.nativeElement.innerHTML = value
          this.tooltipValue.nativeElement.innerHTML = itemData.labels[tooltipItem.index]
        },
      },
    },
    legendCallback: chart => {
      const { labels } = chart.data
      const legendMarkup = []
      const dataset = chart.data.datasets[0]
      legendMarkup.push('<div class="flex-shrink-0">')
      let legends = labels.map((label, index) => {
        const color = dataset.backgroundColor[index]
        return `<div class="d-flex align-items-center flex-nowrap mt-2 mb-2">
                  <div class="tablet mr-3" style="background-color: ${color}"></div>
                  ${label}
                  </div>`
      })
      legends = legends.join('')
      legendMarkup.push(legends)
      legendMarkup.push('</div>')
      this.legend.nativeElement.innerHTML = legendMarkup.join('')
    },
  }
  constructor() {}
  ngAfterViewChecked() {
    this.chart.chart.generateLegend()
  }
}
