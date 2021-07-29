import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { EcommerceRouterModule } from './ecommerce-routing.module'
import { WidgetsComponentsModule } from 'src/app/components/kit/widgets/widgets-components.module'
import { FormsModule } from '@angular/forms'

// Ecommerce
import { EcommerceDashboardComponent } from 'src/app/pages/ecommerce/dashboard/dashboard.component'
import { EcommerceOrdersComponent } from 'src/app/pages/ecommerce/orders/orders.component'
import { EcommerceProductCatalogComponent } from 'src/app/pages/ecommerce/product-catalog/product-catalog.component'
import { EcommerceProductDetailsComponent } from 'src/app/pages/ecommerce/product-details/product-details.component'
import { EcommerceCartComponent } from 'src/app/pages/ecommerce/cart/cart.component'

const COMPONENTS = [
  EcommerceDashboardComponent,
  EcommerceOrdersComponent,
  EcommerceProductCatalogComponent,
  EcommerceProductDetailsComponent,
  EcommerceCartComponent,
]

@NgModule({
  imports: [SharedModule, EcommerceRouterModule, WidgetsComponentsModule, FormsModule],
  declarations: [...COMPONENTS],
})
export class EcommerceModule {}
