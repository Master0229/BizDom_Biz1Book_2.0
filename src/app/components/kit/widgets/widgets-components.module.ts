import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/shared.module'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
import { ChartistModule } from 'ng-chartist'
import { ChartModule } from 'angular2-chartjs'
import { UsMapModule } from 'angular-us-map'

import { CuiGeneral1Component } from './General/1/1.component'
import { CuiGeneral1v1Component } from './General/1v1/1v1.component'
import { CuiGeneral2Component } from './General/2/2.component'
import { CuiGeneral2v1Component } from './General/2v1/2v1.component'
import { CuiGeneral2v2Component } from './General/2v2/2v2.component'
import { CuiGeneral2v3Component } from './General/2v3/2v3.component'
import { CuiGeneral2v4Component } from './General/2v4/2v4.component'
import { CuiGeneral3Component } from './General/3/3.component'
import { CuiGeneral3v1Component } from './General/3v1/3v1.component'
import { CuiGeneral4Component } from './General/4/4.component'
import { CuiGeneral5Component } from './General/5/5.component'
import { CuiGeneral5v1Component } from './General/5v1/5v1.component'
import { CuiGeneral6Component } from './General/6/6.component'
import { CuiGeneral6v1Component } from './General/6v1/6v1.component'
import { CuiGeneral7Component } from './General/7/7.component'
import { CuiGeneral8Component } from './General/8/8.component'
import { CuiGeneral9Component } from './General/9/9.component'
import { CuiGeneral10Component } from './General/10/10.component'
import { CuiGeneral10v1Component } from './General/10v1/10v1.component'
import { CuiGeneral11Component } from './General/11/11.component'
import { CuiGeneral11v1Component } from './General/11v1/11v1.component'
import { CuiGeneral12Component } from './General/12/12.component'
import { CuiGeneral12v1Component } from './General/12v1/12v1.component'
import { CuiGeneral12v2Component } from './General/12v2/12v2.component'
import { CuiGeneral12v3Component } from './General/12v3/12v3.component'
import { CuiGeneral13Component } from './General/13/13.component'
import { CuiGeneral13v1Component } from './General/13v1/13v1.component'
import { CuiGeneral14Component } from './General/14/14.component'
import { CuiGeneral15Component } from './General/15/15.component'
import { CuiGeneral16Component } from './General/16/16.component'
import { CuiGeneral17Component } from './General/17/17.component'
import { CuiGeneral17v1Component } from './General/17v1/17v1.component'
import { CuiGeneral17v2Component } from './General/17v2/17v2.component'
import { CuiGeneral18Component } from './General/18/18.component'
import { CuiGeneral18v1Component } from './General/18v1/18v1.component'
import { CuiGeneral19Component } from './General/19/19.component'
import { CuiGeneral20Component } from './General/20/20.component'
import { CuiGeneral20v1Component } from './General/20v1/20v1.component'
import { CuiGeneral21Component } from './General/21/21.component'
import { CuiGeneral21v1Component } from './General/21v1/21v1.component'
import { CuiGeneral21v2Component } from './General/21v2/21v2.component'
import { CuiGeneral21v3Component } from './General/21v3/21v3.component'
import { CuiGeneral22Component } from './General/22/22.component'
import { CuiGeneral23Component } from './General/23/23.component'
import { CuiGeneral23v1Component } from './General/23v1/23v1.component'
import { CuiGeneral24Component } from './General/24/24.component'
import { CuiGeneral24v1Component } from './General/24v1/24v1.component'
import { CuiGeneral27Component } from './General/27/27.component'
import { CuiGeneral27v1Component } from './General/27v1/27v1.component'

import { CuiList1Component } from './Lists/1/1.component'
import { CuiList2Component } from './Lists/2/2.component'
import { CuiList3Component } from './Lists/3/3.component'
import { CuiList4Component } from './Lists/4/4.component'
import { CuiList5Component } from './Lists/5/5.component'
import { CuiList6Component } from './Lists/6/6.component'
import { CuiList7Component } from './Lists/7/7.component'
import { CuiList8Component } from './Lists/8/8.component'
import { CuiList9Component } from './Lists/9/9.component'
import { CuiList10Component } from './Lists/10/10.component'
import { CuiList11Component } from './Lists/11/11.component'
import { CuiList12Component } from './Lists/12/12.component'
import { CuiList13Component } from './Lists/13/13.component'
import { CuiList14Component } from './Lists/14/14.component'
import { CuiList15Component } from './Lists/15/15.component'
import { CuiList16Component } from './Lists/16/16.component'
import { CuiList17Component } from './Lists/17/17.component'
import { CuiList18Component } from './Lists/18/18.component'
import { CuiList19Component } from './Lists/19/19.component'
import { CuiList20Component } from './Lists/20/20.component'
import { CuiList21Component } from './Lists/21/21.component'
import { CuiList21v1Component } from './Lists/21v1/21v1.component'
import { CuiList21v2Component } from './Lists/21v2/21v2.component'

import { CuiChart1Component } from './Charts/1/1.component'
import { CuiChart2Component } from './Charts/2/2.component'
import { CuiChart3Component } from './Charts/3/3.component'
import { CuiChart4Component } from './Charts/4/4.component'
import { CuiChart4v1Component } from './Charts/4v1/4v1.component'
import { CuiChart4v2Component } from './Charts/4v2/4v2.component'
import { CuiChart4v3Component } from './Charts/4v3/4v3.component'
import { CuiChart5Component } from './Charts/5/5.component'
import { CuiChart6Component } from './Charts/6/6.component'
import { CuiChart7Component } from './Charts/7/7.component'
import { CuiChart8Component } from './Charts/8/8.component'
import { CuiChart9Component } from './Charts/9/9.component'
import { CuiChart10Component } from './Charts/10/10.component'
import { CuiChart11Component } from './Charts/11/11.component'
import { CuiChart11v1Component } from './Charts/11v1/11v1.component'
import { CuiChart11v2Component } from './Charts/11v2/11v2.component'
import { CuiChart12Component } from './Charts/12/12.component'
import { CuiChart12v1Component } from './Charts/12v1/12v1.component'
import { CuiChart13Component } from './Charts/13/13.component'
import { CuiChart13v1Component } from './Charts/13v1/13v1.component'
import { CuiChart13v2Component } from './Charts/13v2/13v2.component'

import { CuiTable1Component } from './Tables/1/1.component'
import { CuiTable2Component } from './Tables/2/2.component'
import { CuiTable3Component } from './Tables/3/3.component'
import { CuiTable4Component } from './Tables/4/4.component'
import { CuiTable5Component } from './Tables/5/5.component'
import { CuiTable6Component } from './Tables/6/6.component'
import { CuiTable7Component } from './Tables/7/7.component'
import { CuiTable8Component } from './Tables/8/8.component'

const COMPONENTS = [
  CuiGeneral1Component,
  CuiGeneral1v1Component,
  CuiGeneral2Component,
  CuiGeneral2v1Component,
  CuiGeneral2v2Component,
  CuiGeneral2v3Component,
  CuiGeneral2v4Component,
  CuiGeneral3Component,
  CuiGeneral3v1Component,
  CuiGeneral4Component,
  CuiGeneral5Component,
  CuiGeneral5v1Component,
  CuiGeneral6Component,
  CuiGeneral6v1Component,
  CuiGeneral7Component,
  CuiGeneral8Component,
  CuiGeneral9Component,
  CuiGeneral10Component,
  CuiGeneral10v1Component,
  CuiGeneral11Component,
  CuiGeneral11v1Component,
  CuiGeneral12Component,
  CuiGeneral12v1Component,
  CuiGeneral12v2Component,
  CuiGeneral12v3Component,
  CuiGeneral13Component,
  CuiGeneral13v1Component,
  CuiGeneral14Component,
  CuiGeneral15Component,
  CuiGeneral16Component,
  CuiGeneral17Component,
  CuiGeneral17v1Component,
  CuiGeneral17v2Component,
  CuiGeneral18Component,
  CuiGeneral18v1Component,
  CuiGeneral19Component,
  CuiGeneral20Component,
  CuiGeneral20v1Component,
  CuiGeneral21Component,
  CuiGeneral21v1Component,
  CuiGeneral21v2Component,
  CuiGeneral21v3Component,
  CuiGeneral22Component,
  CuiGeneral23Component,
  CuiGeneral23v1Component,
  CuiGeneral24Component,
  CuiGeneral24v1Component,
  CuiGeneral27Component,
  CuiGeneral27v1Component,
  CuiList1Component,
  CuiList2Component,
  CuiList3Component,
  CuiList4Component,
  CuiList5Component,
  CuiList6Component,
  CuiList7Component,
  CuiList8Component,
  CuiList9Component,
  CuiList10Component,
  CuiList11Component,
  CuiList12Component,
  CuiList13Component,
  CuiList14Component,
  CuiList15Component,
  CuiList16Component,
  CuiList17Component,
  CuiList18Component,
  CuiList19Component,
  CuiList20Component,
  CuiList21Component,
  CuiList21v1Component,
  CuiList21v2Component,
  CuiChart1Component,
  CuiChart2Component,
  CuiChart3Component,
  CuiChart4Component,
  CuiChart4v1Component,
  CuiChart4v2Component,
  CuiChart4v3Component,
  CuiChart5Component,
  CuiChart6Component,
  CuiChart7Component,
  CuiChart8Component,
  CuiChart9Component,
  CuiChart10Component,
  CuiChart11Component,
  CuiChart11v1Component,
  CuiChart11v2Component,
  CuiChart12Component,
  CuiChart12v1Component,
  CuiChart13Component,
  CuiChart13v1Component,
  CuiChart13v2Component,
  CuiTable1Component,
  CuiTable2Component,
  CuiTable3Component,
  CuiTable4Component,
  CuiTable5Component,
  CuiTable6Component,
  CuiTable7Component,
  CuiTable8Component,
]

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    ChartistModule,
    ChartModule,
    CommonModule,
    UsMapModule,
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class WidgetsComponentsModule {}
