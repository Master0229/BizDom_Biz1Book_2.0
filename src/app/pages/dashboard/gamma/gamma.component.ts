import { Component, OnInit } from '@angular/core'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'

declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-dashboard-crypto',
  templateUrl: './gamma.component.html',
  styleUrls: ['./gamma.component.scss'],
})
export class DashboardGammaComponent implements OnInit {
  progressCardsData = data.progressCardsData
  newUsersData = data.newUsersData
  inboundBandwidthData = data.inboundBandwidthData
  outboundBandwidthData = data.outboundBandwidthData
  topPhotosData = data.topPhotosData
  topPhotosGraphData = data.topPhotosGraphData
  financeStatsData = data.financeStatsData
  supportCasesTableData = data.supportCasesTableData
  supportCasesPieData = data.supportCasesPieData

  boundChartistOptions = {
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
        appendToBody: true,
      }),
    ],
  }

  supportCasesPieOptions = {
    donut: true,
    donutWidth: 35,
    showLabel: false,
  }

  ngOnInit() {}
}
