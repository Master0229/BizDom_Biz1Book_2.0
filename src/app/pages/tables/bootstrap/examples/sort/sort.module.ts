import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { NgbdSortableHeader, NgbdTableSortable } from './sort.component'

@NgModule({
  imports: [CommonModule, NgbModule],
  declarations: [NgbdTableSortable, NgbdSortableHeader],
  exports: [NgbdTableSortable],
  bootstrap: [NgbdTableSortable],
})
export class BootstrapTableSortModule {}
