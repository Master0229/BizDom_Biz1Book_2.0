import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { LayoutsModule } from 'src/app/layouts/layouts.module'

// dashboard
import { EcommerceDashboardComponent } from 'src/app/pages/ecommerce/dashboard/dashboard.component'
import { EcommerceOrdersComponent } from 'src/app/pages/ecommerce/orders/orders.component'
import { EcommerceProductCatalogComponent } from 'src/app/pages/ecommerce/product-catalog/product-catalog.component'
import { EcommerceProductDetailsComponent } from 'src/app/pages/ecommerce/product-details/product-details.component'
import { EcommerceCartComponent } from 'src/app/pages/ecommerce/cart/cart.component'

const routes: Routes = [
  {
    path: 'dashboard',
    component: EcommerceDashboardComponent,
    data: { title: 'Ecommerce Dashboard' },
  },
  {
    path: 'orders',
    component: EcommerceOrdersComponent,
    data: { title: 'Ecommerce Orders' },
  },
  {
    path: 'product-catalog',
    component: EcommerceProductCatalogComponent,
    data: { title: 'Ecommerce Product Catalog' },
  },
  {
    path: 'product-details',
    component: EcommerceProductDetailsComponent,
    data: { title: 'Ecommerce Product Details' },
  },
  {
    path: 'cart',
    component: EcommerceCartComponent,
    data: { title: 'Ecommerce Cart' },
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [],
  exports: [RouterModule],
})
export class EcommerceRouterModule {}
