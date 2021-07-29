import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { TablesRouterModule } from './tables-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { AntdTablesExaplesModule } from 'src/app/pages/tables/antd/examples/examples.module'
import { BootstrapTableBasicModule } from 'src/app/pages/tables/bootstrap/examples/basic/basic.module'
import { BootstrapTableSortModule } from 'src/app/pages/tables/bootstrap/examples/sort/sort.module'
import { BootstrapTableSearchModule } from 'src/app/pages/tables/bootstrap/examples/search-filter/search-filter.module'
import { BootstrapTablePaginationModule } from 'src/app/pages/tables/bootstrap/examples/pagination/pagintaion.module'
import { BootstrapTableCompleteModule } from 'src/app/pages/tables/bootstrap/examples/complete/complete.module'

// Tables components
import { TablesAntdComponent } from 'src/app/pages/tables/antd/antd.component'
import { TablesBootstrapComponent } from 'src/app/pages/tables/bootstrap/bootstrap.component'

const COMPONENTS = [TablesAntdComponent, TablesBootstrapComponent]

@NgModule({
  imports: [
    SharedModule,
    TablesRouterModule,
    FormsModule,
    ReactiveFormsModule,
    AntdTablesExaplesModule,
    NgbModule,
    BootstrapTableBasicModule,
    BootstrapTableSortModule,
    BootstrapTableSearchModule,
    BootstrapTablePaginationModule,
    BootstrapTableCompleteModule,
  ],
  declarations: [...COMPONENTS],
})
export class TablesModule {}
