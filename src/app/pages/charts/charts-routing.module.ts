import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// charts
import { ChartsChartistComponent } from 'src/app/pages/charts/chartist/chartist.component'
import { ChartsChartComponent } from 'src/app/pages/charts/chart/chart.component'
import { ChartsC3Component } from 'src/app/pages/charts/c3/c3.component'

const routes: Routes = [
  {
    path: 'chartistjs',
    component: ChartsChartistComponent,
    data: { title: 'Charts / Chartist.js' },
  },
  {
    path: 'chartjs',
    component: ChartsChartComponent,
    data: { title: 'Charts / Chart.js' },
  },
  {
    path: 'c3',
    component: ChartsC3Component,
    data: { title: 'Charts / C3' },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ChartsRouterModule {}
