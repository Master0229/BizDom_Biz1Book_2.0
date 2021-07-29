import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { UIKitsRouterModule } from './ui-kits-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BootstrapUIKitExamplesModule } from 'src/app/pages/ui-kits/bootstrap/examples/bootstrap-expamples.module'
import { AntdUIKitExamplesModule } from 'src/app/pages/ui-kits/antd/examples/antd-expamples.module'

// UI Kits
import { UiKitAntdComponent } from 'src/app/pages/ui-kits/antd/antd.component'
import { UiKitBootstrapComponent } from 'src/app/pages/ui-kits/bootstrap/bootstrap.component'

const COMPONENTS = [UiKitAntdComponent, UiKitBootstrapComponent]

@NgModule({
  imports: [
    SharedModule,
    UIKitsRouterModule,
    FormsModule,
    ReactiveFormsModule,
    BootstrapUIKitExamplesModule,
    AntdUIKitExamplesModule,
  ],
  declarations: [...COMPONENTS],
})
export class UIKitsModule {}
