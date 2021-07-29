import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { BootstrapTableBasicComponent } from './basic.component'

@NgModule({
  imports: [CommonModule, NgbModule],
  declarations: [BootstrapTableBasicComponent],
  exports: [BootstrapTableBasicComponent],
  bootstrap: [BootstrapTableBasicComponent],
})
export class BootstrapTableBasicModule {}
