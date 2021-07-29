import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// layout
import { AdvancedTypographyComponent } from 'src/app/pages/advanced/typography/typography.component'
import { AdvancedMailTemplatesComponent } from 'src/app/pages/advanced/mail-templates/mail-templates.component'
import { AdvancedUtilitiesComponent } from 'src/app/pages/advanced/utilities/utilities.component'
import { AdvancedGridComponent } from 'src/app/pages/advanced/grid/grid.component'
import { AdvancedFormExamplesComponent } from 'src/app/pages/advanced/form-examples/form-examples.component'
import { AdvancedInvoiceComponent } from 'src/app/pages/advanced/invoice/invoice.component'
import { AdvancedPricingTablesComponent } from 'src/app/pages/advanced/pricing-tables/pricing-tables.component'
import { AdvancedColorsComponent } from 'src/app/pages/advanced/colors/colors.component'
import { SalesReportComponent } from 'src/app/pages/advanced/sales-report/sales-report.component'
import { LatestTransactionsComponent } from './latest-transactions/latest-transactions.component'
import { DayClosingComponent } from './day-closing/day-closing.component'
import { DenominationEntryComponent } from './denomination-entry/denomination-entry.component'

const routes: Routes = [
  {
    path: 'email-templates',
    component: AdvancedMailTemplatesComponent,
    data: { title: 'Advanced / Mail Templates' },
  },
  {
    path: 'typography',
    component: AdvancedTypographyComponent,
    data: { title: 'Advanced / Typography' },
  },
  {
    path: 'utilities',
    component: AdvancedUtilitiesComponent,
    data: { title: 'Advanced / Utilities' },
  },
  {
    path: 'grid',
    component: AdvancedGridComponent,
    data: { title: 'Advanced / Grid' },
  },
  {
    path: 'form-examples',
    component: AdvancedFormExamplesComponent,
    data: { title: 'Advanced / Form Examples' },
  },
  {
    path: 'invoice',
    component: AdvancedInvoiceComponent,
    data: { title: 'Advanced / Invoice' },
  },
  {
    path: 'pricing-tables',
    component: AdvancedPricingTablesComponent,
    data: { title: 'Advanced / Pricing Tables' },
  },
  {
    path: 'colors',
    component: AdvancedColorsComponent,
    data: { title: 'Advanced / Colors' },
  },
  {
    path: 'sales-report',
    component: SalesReportComponent,
    data: { title: 'Sale Report' },
  },
  {
    path: 'latest-transactions',
    component: LatestTransactionsComponent,
    data: { title: 'Latest Transactions' },
  },
  {
    path: 'day-closing',
    component: DayClosingComponent,
    data: { title: 'Day Closing' },
  },
  {
    path: 'denominationentry',
    component: DenominationEntryComponent,
    data: { title: 'Denomination Entry' },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvancedRouterModule {}
