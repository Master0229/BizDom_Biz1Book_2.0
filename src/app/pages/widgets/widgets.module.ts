import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { WidgetsRouterModule } from './widgets-routing.module'
import { WidgetsComponentsModule } from 'src/app/components/kit/widgets/widgets-components.module'

// widgets
import { ChartsWidgetsComponent } from 'src/app/pages/widgets/charts/charts.component'
import { GeneralWidgetsComponent } from 'src/app/pages/widgets/general/general.component'
import { ListsWidgetsComponent } from 'src/app/pages/widgets/lists/lists.component'
import { TablesWidgetsComponent } from 'src/app/pages/widgets/tables/tables.component'

const COMPONENTS = [
  ChartsWidgetsComponent,
  GeneralWidgetsComponent,
  ListsWidgetsComponent,
  TablesWidgetsComponent,
]

@NgModule({
  imports: [SharedModule, WidgetsRouterModule, WidgetsComponentsModule],
  declarations: [...COMPONENTS],
})
export class WidgetsModule {}
