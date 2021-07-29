import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// Tables
import { TablesAntdComponent } from 'src/app/pages/tables/antd/antd.component'
import { TablesBootstrapComponent } from 'src/app/pages/tables/bootstrap/bootstrap.component'

const routes: Routes = [
  {
    path: 'antd',
    component: TablesAntdComponent,
    data: { title: 'Tables / Antd' },
  },
  {
    path: 'bootstrap',
    component: TablesBootstrapComponent,
    data: { title: 'Tables / Bootstrap' },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRouterModule {}
