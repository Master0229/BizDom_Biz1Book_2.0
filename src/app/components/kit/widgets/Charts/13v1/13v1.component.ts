import { Component, OnInit } from '@angular/core'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import Chartist from 'chartist'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'kit-chart-13v1',
  templateUrl: './13v1.component.html',
})
export class CuiChart13v1Component implements OnInit {
  chartData = data
  chartOptions = {
    lineSmooth: Chartist.Interpolation.none({
      fillHoles: false,
    }),
    showPoint: true,
    showLine: true,
    showArea: true,
    fullWidth: true,
    showLabel: false,
    axisX: {
      showGrid: false,
      showLabel: false,
      offset: 0,
    },
    axisY: {
      showGrid: false,
      showLabel: false,
      offset: 0,
    },
    chartPadding: 0,
    low: 0,
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
