import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { BootstrapTableSearchComponent } from './search-filter.component'

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgbModule],
  declarations: [BootstrapTableSearchComponent],
  exports: [BootstrapTableSearchComponent],
  bootstrap: [BootstrapTableSearchComponent],
})
export class BootstrapTableSearchModule {}
