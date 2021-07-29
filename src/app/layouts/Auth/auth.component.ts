import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
import { slideFadeinUp, slideFadeinRight, zoomFadein, fadein } from '../router-animations'

@Component({
  selector: 'layout-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [slideFadeinUp, slideFadeinRight, zoomFadein, fadein],
})
export class LayoutAuthComponent {
  logo: String
  isGrayTopbar: Boolean
  isCardShadow: Boolean
  isSquaredBorders: Boolean
  isBorderless: Boolean
  authPagesColor: String
  routerAnimation: String

  constructor(private store: Store<any>) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.logo = state.logo
      this.isGrayTopbar = state.isGrayTopbar
      this.isCardShadow = state.isCardShadow
      this.isSquaredBorders = state.isSquaredBorders
      this.isBorderless = state.isBorderless
      this.authPagesColor = state.authPagesColor
      this.routerAnimation = state.routerAnimation
      this.routerAnimation = state.routerAnimation
    })
  }

  routeAnimation(outlet: RouterOutlet, animation: string) {
    if (animation === this.routerAnimation) {
      return outlet.isActivated && outlet.activatedRoute.routeConfig.path
    }
  }
}
