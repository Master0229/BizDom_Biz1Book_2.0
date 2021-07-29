import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// UI Kits
import { UiKitAntdComponent } from 'src/app/pages/ui-kits/antd/antd.component'
import { UiKitBootstrapComponent } from 'src/app/pages/ui-kits/bootstrap/bootstrap.component'

const routes: Routes = [
  {
    path: 'antd',
    component: UiKitAntdComponent,
    data: { title: 'UI Kit / Antd' },
  },
  {
    path: 'bootstrap',
    component: UiKitBootstrapComponent,
    data: { title: 'UI Kit / Bootstrap' },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UIKitsRouterModule {}
