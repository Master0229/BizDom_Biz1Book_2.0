import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// widgets
import { ChartsWidgetsComponent } from 'src/app/pages/widgets/charts/charts.component'
import { GeneralWidgetsComponent } from 'src/app/pages/widgets/general/general.component'
import { ListsWidgetsComponent } from 'src/app/pages/widgets/lists/lists.component'
import { TablesWidgetsComponent } from 'src/app/pages/widgets/tables/tables.component'

const routes: Routes = [
  {
    path: 'charts',
    component: ChartsWidgetsComponent,
    data: { title: 'Widgets / Charts' },
  },
  {
    path: 'general',
    component: GeneralWidgetsComponent,
    data: { title: 'Widgets / General' },
  },
  {
    path: 'lists',
    component: ListsWidgetsComponent,
    data: { title: 'Widgets / Lists' },
  },
  {
    path: 'tables',
    component: TablesWidgetsComponent,
    data: { title: 'Widgets / Tables' },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WidgetsRouterModule {}
