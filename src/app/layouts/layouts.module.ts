import { NgModule } from '@angular/core'
import { SharedModule } from '../shared.module'
import { LayoutModule } from '../components/cleanui/layout/layout.module'

import { LayoutAuthComponent } from './Auth/auth.component'
import { LayoutMainComponent } from './Main/main.component'
import { LayoutPublicComponent } from './Public/public.component'

const COMPONENTS = [LayoutAuthComponent, LayoutMainComponent, LayoutPublicComponent]

@NgModule({
  imports: [SharedModule, LayoutModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class LayoutsModule {}
