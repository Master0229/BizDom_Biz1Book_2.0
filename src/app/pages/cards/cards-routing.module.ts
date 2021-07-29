import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

// cards
import { BasicCardsComponent } from 'src/app/pages/cards/basic-cards/basic-cards.component'
import { TabbedCardsComponent } from 'src/app/pages/cards/tabbed-cards/tabbed-cards.component'

const routes: Routes = [
  {
    path: 'basic-cards',
    component: BasicCardsComponent,
    data: { title: 'Cards / Basic Cards' },
  },
  {
    path: 'tabbed-cards',
    component: TabbedCardsComponent,
    data: { title: 'Cards / Tabbed Cards' },
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardsRouterModule {}
