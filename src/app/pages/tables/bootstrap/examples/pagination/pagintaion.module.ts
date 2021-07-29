import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { BootstrapTablePaginationComponent } from './pagination.component'

@NgModule({
  imports: [CommonModule, FormsModule, NgbModule],
  declarations: [BootstrapTablePaginationComponent],
  exports: [BootstrapTablePaginationComponent],
  bootstrap: [BootstrapTablePaginationComponent],
})
export class BootstrapTablePaginationModule {}
