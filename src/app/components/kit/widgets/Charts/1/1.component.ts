import { Component, OnInit } from '@angular/core'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'kit-chart-1',
  templateUrl: './1.component.html',
  styleUrls: ['./1.component.scss'],
})
export class CuiChart1Component implements OnInit {
  chartData = data
  chartOptions = {
    seriesBarDistance: 10,
    horizontalBars: true,
    axisY: {
      showGrid: false,
      showLabel: false,
      offset: 0,
    },
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
