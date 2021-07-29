import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { IconsRouterModule } from './icons-routing.module'

// icons
import { IconsFontawesomeComponent } from 'src/app/pages/icons/fontawesome/fontawesome.component'
import { IconsIcomoonComponent } from 'src/app/pages/icons/icomoon-free/icomoon.component'
import { IconsLinearComponent } from 'src/app/pages/icons/linearicons-free/linear.component'
import { IconsFeatherComponent } from 'src/app/pages/icons/feather-icons/feather.component'

const COMPONENTS = [
  IconsFontawesomeComponent,
  IconsIcomoonComponent,
  IconsLinearComponent,
  IconsFeatherComponent,
]

@NgModule({
  imports: [SharedModule, IconsRouterModule],
  declarations: [...COMPONENTS],
})
export class IconsModule {}
