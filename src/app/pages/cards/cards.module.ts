import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { CardsRouterModule } from './cards-routing.module'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'
// icons
import { BasicCardsComponent } from 'src/app/pages/cards/basic-cards/basic-cards.component'
import { TabbedCardsComponent } from 'src/app/pages/cards/tabbed-cards/tabbed-cards.component'

const COMPONENTS = [BasicCardsComponent, TabbedCardsComponent]

@NgModule({
  imports: [SharedModule, CardsRouterModule, PerfectScrollbarModule],
  declarations: [...COMPONENTS],
})
export class CardsModule {}
