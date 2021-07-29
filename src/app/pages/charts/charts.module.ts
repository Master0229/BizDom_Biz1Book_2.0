import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { ChartsRouterModule } from './charts-routing.module'
import { ChartistModule } from 'ng-chartist'
import { ChartModule } from 'angular2-chartjs'

// charts
import { ChartsC3Component } from 'src/app/pages/charts/c3/c3.component'
import { ChartsChartComponent } from 'src/app/pages/charts/chart/chart.component'
import { ChartsChartistComponent } from 'src/app/pages/charts/chartist/chartist.component'

const COMPONENTS = [ChartsC3Component, ChartsChartComponent, ChartsChartistComponent]

@NgModule({
  imports: [SharedModule, ChartsRouterModule, ChartistModule, ChartModule],
  declarations: [...COMPONENTS],
})
export class ChartsModule {}
