import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { NgbdSortableHeader } from './sortable.directive'
import { BootstrapTableCompleteComponent } from './complete.component'

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule],
  declarations: [BootstrapTableCompleteComponent, NgbdSortableHeader],
  exports: [BootstrapTableCompleteComponent],
  bootstrap: [BootstrapTableCompleteComponent],
})
export class BootstrapTableCompleteModule {}
