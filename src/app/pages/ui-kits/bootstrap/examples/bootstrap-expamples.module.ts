import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/shared.module'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { KitBootstrapAlertsExampleComponent } from './alerts/alerts.component'
import { KitBootstrapBadgesExampleComponent } from './badges/badges.component'
import { KitBootstrapBreadcrumbsExampleComponent } from './breadcrumbs/breadcrumbs.component'
import { KitBootstrapButtonDropdownExampleComponent } from './button-dropdown/button-dropdown.component'
import { KitBootstrapButtonGroupExampleComponent } from './button-group/button-group.component'
import { KitBootstrapButtonsExampleComponent } from './buttons/buttons.component'
import { KitBootstrapCardExampleComponent } from './card/card.component'
import { KitBootstrapCarouselExampleComponent } from './carousel/carousel.component'
import { KitBootstrapCollapseExampleComponent } from './collapse/collapse.component'
import { KitBootstrapDatepickerExampleComponent } from './datepicker/datepicker.component'
import { KitBootstrapDropdownsExampleComponent } from './dropdowns/dropdowns.component'
import { KitBootstrapFormExampleComponent } from './form/form.component'
import { KitBootstrapInputGroupExampleComponent } from './input-group/input-group.component'
import { KitBootstrapJumbotronExampleComponent } from './jumbotron/jumbotron.component'
import { KitBootstrapLayoutExampleComponent } from './layout/layout.component'
import { KitBootstrapListgroupExampleComponent } from './listgroup/listgroup.component'
import { KitBootstrapMediaObjectExampleComponent } from './media-object/media-object.component'
import { KitBootstrapModalsExampleComponent } from './modals/modals.component'
import { KitBootstrapNavbarExampleComponent } from './navbar/navbar.component'
import { KitBootstrapNavsExampleComponent } from './navs/navs.component'
import { KitBootstrapPaginationExampleComponent } from './pagination/pagination.component'
import { KitBootstrapPopoverExampleComponent } from './popover/popover.component'
import { KitBootstrapProgressExampleComponent } from './progress/progress.component'
import { KitBootstrapRatingExampleComponent } from './rating/rating.component'
import { KitBootstrapSpinnersExampleComponent } from './spinners/spinners.component'
import { KitBootstrapTablesExampleComponent } from './tables/tables.component'
import { KitBootstrapTabsExampleComponent } from './tabs/tabs.component'
import { KitBootstrapTimepickerExampleComponent } from './timepicker/timepicker.component'
import { KitBootstrapToastsExampleComponent } from './toasts/toasts.component'
import { KitBootstrapTooltipsExampleComponent } from './tooltips/tooltips.component'
import { KitBootstrapTypeaheadExampleComponent } from './typeahead/typeahead.component'

const COMPONENTS = [
  KitBootstrapAlertsExampleComponent,
  KitBootstrapBadgesExampleComponent,
  KitBootstrapBreadcrumbsExampleComponent,
  KitBootstrapButtonDropdownExampleComponent,
  KitBootstrapButtonGroupExampleComponent,
  KitBootstrapButtonsExampleComponent,
  KitBootstrapCardExampleComponent,
  KitBootstrapCarouselExampleComponent,
  KitBootstrapCollapseExampleComponent,
  KitBootstrapDatepickerExampleComponent,
  KitBootstrapDropdownsExampleComponent,
  KitBootstrapFormExampleComponent,
  KitBootstrapInputGroupExampleComponent,
  KitBootstrapJumbotronExampleComponent,
  KitBootstrapLayoutExampleComponent,
  KitBootstrapListgroupExampleComponent,
  KitBootstrapMediaObjectExampleComponent,
  KitBootstrapModalsExampleComponent,
  KitBootstrapNavbarExampleComponent,
  KitBootstrapNavsExampleComponent,
  KitBootstrapPaginationExampleComponent,
  KitBootstrapPopoverExampleComponent,
  KitBootstrapProgressExampleComponent,
  KitBootstrapRatingExampleComponent,
  KitBootstrapSpinnersExampleComponent,
  KitBootstrapTablesExampleComponent,
  KitBootstrapTabsExampleComponent,
  KitBootstrapTimepickerExampleComponent,
  KitBootstrapToastsExampleComponent,
  KitBootstrapTooltipsExampleComponent,
  KitBootstrapTypeaheadExampleComponent,
]

@NgModule({
  imports: [SharedModule, FormsModule, ReactiveFormsModule, NgbModule, CommonModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class BootstrapUIKitExamplesModule {}
