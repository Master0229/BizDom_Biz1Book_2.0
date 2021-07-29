import { Component, OnInit } from '@angular/core'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'kit-chart-11v1',
  templateUrl: './11v1.component.html',
  styleUrls: ['./11v1.component.scss'],
})
export class CuiChart11v1Component implements OnInit {
  chartData = data
  chartOptions: any = {}
  constructor() {
    this.chartOptions = {
      options: {
        axisX: {
          showLabel: false,
          showGrid: false,
          offset: 0,
        },
        axisY: {
          showLabel: false,
          showGrid: false,
          offset: 0,
        },
        showArea: true,
        high: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
        fullWidth: true,
        height: '110px',
        showPoint: true,
        plugins: [
          ChartistTooltip({
            anchorToPoint: false,
            appendToBody: true,
            seriesName: false,
          }),
        ],
      },
      low: 20,
      type: 'Line',
    }
  }
  ngOnInit() {}
}
