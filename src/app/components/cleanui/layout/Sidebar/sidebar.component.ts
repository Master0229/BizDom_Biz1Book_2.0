import { Component } from '@angular/core'
import { select, Store } from '@ngrx/store'
import store from 'store'
import * as SettingsActions from 'src/app/store/settings/actions'
import * as Reducers from 'src/app/store/reducers'

@Component({
  selector: 'cui-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isSidebarOpen: boolean
  isMenuCollapsed: boolean
  isMenuShadow: boolean
  isMenuUnfixed: boolean
  menuLayoutType: string
  menuColor: string
  flyoutMenuColor: string
  systemLayoutColor: string
  isTopbarFixed: boolean
  isFooterDark: boolean
  isContentMaxWidth: boolean
  isAppMaxWidth: boolean
  isGrayBackground: boolean
  isGrayTopbar: boolean
  isCardShadow: boolean
  isSquaredBorders: boolean
  isBorderless: boolean
  routerAnimation: string
  locale: string
  leftMenuWidth: Number
  logo: string
  authPagesColor: string
  theme: string
  primaryColor: string

  defaultColor = '#4b7cf3'
  window: any = window as any

  constructor(private store: Store<any>) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.isSidebarOpen = state.isSidebarOpen
      this.isMenuCollapsed = state.isMenuCollapsed
      this.isMenuShadow = state.isMenuShadow
      this.isMenuUnfixed = state.isMenuUnfixed
      this.menuLayoutType = state.menuLayoutType
      this.menuColor = state.menuColor
      this.flyoutMenuColor = state.flyoutMenuColor
      this.systemLayoutColor = state.systemLayoutColor
      this.isTopbarFixed = state.isTopbarFixed
      this.isFooterDark = state.isFooterDark
      this.isContentMaxWidth = state.isContentMaxWidth
      this.isAppMaxWidth = state.isAppMaxWidth
      this.isGrayBackground = state.isGrayBackground
      this.isGrayTopbar = state.isGrayTopbar
      this.isCardShadow = state.isCardShadow
      this.isSquaredBorders = state.isSquaredBorders
      this.isBorderless = state.isBorderless
      this.routerAnimation = state.routerAnimation
      this.locale = state.locale
      this.leftMenuWidth = state.leftMenuWidth
      this.logo = state.logo
      this.authPagesColor = state.authPagesColor
      this.theme = state.theme
      this.primaryColor = state.primaryColor
    })
  }

  toggle() {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        isSidebarOpen: !this.isSidebarOpen,
      }),
    )
  }

  settingChange(value: boolean, setting: string) {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        [setting]: value,
      }),
    )
  }

  setWidth(value: number) {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        leftMenuWidth: value,
      }),
    )
  }

  setTheme(nextTheme) {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        theme: nextTheme,
      }),
    )
  }

  setPrimaryColor(e) {
    const color = e.target ? e.target.value : e
    const addStyles = () => {
      const styleElement = document.querySelector('#primaryColor')
      if (styleElement) {
        styleElement.remove()
      }
      const body = document.querySelector('body')
      const styleEl = document.createElement('style')
      const css = document.createTextNode(`:root { --kit-color-primary: ${color};}`)
      styleEl.setAttribute('id', 'primaryColor')
      styleEl.appendChild(css)
      body.appendChild(styleEl)
    }
    addStyles()
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        primaryColor: color,
      }),
    )
  }

  resetColor() {
    this.setPrimaryColor(this.defaultColor)
  }
}
