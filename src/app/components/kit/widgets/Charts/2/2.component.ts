import { Component, OnInit } from '@angular/core'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'kit-chart-2',
  templateUrl: './2.component.html',
})
export class CuiChart2Component implements OnInit {
  chartData = data
  chartOptions = {
    low: 0,
    chartPadding: {
      right: 0,
      left: 0,
      top: 5,
      bottom: 0,
    },
    fullWidth: true,
    showPoint: true,
    lineSmooth: false,
    axisY: {
      showGrid: false,
      showLabel: false,
      offset: 0,
    },
    axisX: {
      showGrid: false,
      showLabel: false,
      offset: 0,
    },
    showArea: true,
    plugins: [
      ChartistTooltip({
        anchorToPoint: false,
        appendToBody: true,
        seriesName: false,
      }),
    ],
  }
  constructor() {}
  ngOnInit() {}
}
