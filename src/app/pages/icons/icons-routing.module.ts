import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// icons
import { IconsFontawesomeComponent } from 'src/app/pages/icons/fontawesome/fontawesome.component'
import { IconsIcomoonComponent } from 'src/app/pages/icons/icomoon-free/icomoon.component'
import { IconsLinearComponent } from 'src/app/pages/icons/linearicons-free/linear.component'
import { IconsFeatherComponent } from 'src/app/pages/icons/feather-icons/feather.component'

const routes: Routes = [
  {
    path: 'fontawesome',
    component: IconsFontawesomeComponent,
    data: { title: 'Icons / Fontawesome' },
  },
  {
    path: 'icomoon-free',
    component: IconsIcomoonComponent,
    data: { title: 'Icons / Icomoon Free' },
  },
  {
    path: 'linearicons-free',
    component: IconsLinearComponent,
    data: { title: 'Icons / Linearicons Free' },
  },
  {
    path: 'feather-icons',
    component: IconsFeatherComponent,
    data: { title: 'Icons / Feather Icons' },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IconsRouterModule {}
