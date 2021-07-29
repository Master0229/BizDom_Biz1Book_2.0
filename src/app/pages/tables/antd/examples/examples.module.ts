import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/shared.module'

// Antd Tables components
import { KitAntdTableBasicComponent } from './basic/basic.component'
import { KitAntdTableRowSelectionComponent } from './row-selection/row-selection.component'
import { KitAntdTableFilterComponent } from './filter/filter.component'
import { KitAntdTableResetFilterComponent } from './reset-filter/reset-filter.component'
import { KitAntdTableCustomFilterComponent } from './custom-filter/custom-filter.component'
import { KitAntdTableSizeComponent } from './size/size.component'
import { KitAntdTableBorderComponent } from './border/border.component'
import { KitAntdTableExpandedComponent } from './expanded/expanded.component'
import { KitAntdTableSpanComponent } from './span/span.component'
import { KitAntdTableTreeComponent } from './tree/tree.component'
import { KitAntdTableFixedHeaderComponent } from './fixed-header/fixed-header.component'
import { KitAntdTableFixedColumnsComponent } from './fixed-columns/fixed-columns.component'
import { KitAntdTableFixedAllComponent } from './fixed-all/fixed-all.component'
import { KitAntdTableGroupingComponent } from './grouping/grouping.component'
import { KitAntdTableEditableCellsComponent } from './editable-cells/editable-cells.component'
import { KitAntdTableEditableRowsComponent } from './editable-rows/editable-rows.component'
import { KitAntdTableDynamicComponent } from './dynamic/dynamic.component'

const COMPONENTS = [
  KitAntdTableBasicComponent,
  KitAntdTableRowSelectionComponent,
  KitAntdTableFilterComponent,
  KitAntdTableResetFilterComponent,
  KitAntdTableCustomFilterComponent,
  KitAntdTableSizeComponent,
  KitAntdTableBorderComponent,
  KitAntdTableExpandedComponent,
  KitAntdTableSpanComponent,
  KitAntdTableTreeComponent,
  KitAntdTableFixedHeaderComponent,
  KitAntdTableFixedColumnsComponent,
  KitAntdTableFixedAllComponent,
  KitAntdTableGroupingComponent,
  KitAntdTableEditableCellsComponent,
  KitAntdTableEditableRowsComponent,
  KitAntdTableDynamicComponent,
]

@NgModule({
  imports: [SharedModule, FormsModule, ReactiveFormsModule, CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class AntdTablesExaplesModule {}
