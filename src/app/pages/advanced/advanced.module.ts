import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SharedModule } from 'src/app/shared.module'
import { AdvancedRouterModule } from './advanced-routing.module'
import { WidgetsComponentsModule } from 'src/app/components/kit/widgets/widgets-components.module'

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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { LatestTransactionsComponent } from './latest-transactions/latest-transactions.component'
import { DayClosingComponent } from './day-closing/day-closing.component';
import { DenominationEntryComponent } from './denomination-entry/denomination-entry.component'

const COMPONENTS = [
  AdvancedMailTemplatesComponent,
  AdvancedTypographyComponent,
  AdvancedUtilitiesComponent,
  AdvancedGridComponent,
  AdvancedFormExamplesComponent,
  AdvancedInvoiceComponent,
  AdvancedPricingTablesComponent,
  AdvancedColorsComponent,
  SalesReportComponent,
]

@NgModule({
  imports: [
    SharedModule,
    AdvancedRouterModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetsComponentsModule,
    NgbModule,
  ],
  declarations: [...COMPONENTS, LatestTransactionsComponent, DayClosingComponent, DenominationEntryComponent],
})
export class AdvancedModule {}
