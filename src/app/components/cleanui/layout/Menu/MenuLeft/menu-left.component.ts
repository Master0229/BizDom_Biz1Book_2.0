import { Component, OnInit, Input } from '@angular/core'
import { Router, NavigationStart } from '@angular/router'
import { filter } from 'rxjs/operators'
import * as _ from 'lodash'
import { select, Store } from '@ngrx/store'
import { MenuService } from 'src/app/services/menu'
import * as SettingsActions from 'src/app/store/settings/actions'
import * as Reducers from 'src/app/store/reducers'

@Component({
  selector: 'cui-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss'],
})
export class MenuLeftComponent implements OnInit {
  menuColor: String
  isMenuShadow: Boolean
  isMenuUnfixed: Boolean
  isSidebarOpen: Boolean
  isMobileView: Boolean
  leftMenuWidth: Number
  isMenuCollapsed: Boolean
  logo: String
  menuData: any[]
  menuDataActivated: any[]
  role: String

  constructor(private menuService: MenuService, private store: Store<any>, private router: Router) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.role = state.role
    })
    this.menuService.getMenuData().subscribe(menuData => (this.menuData = menuData))
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.menuColor = state.menuColor
      this.isMenuShadow = state.isMenuShadow
      this.isMenuUnfixed = state.isMenuUnfixed
      this.isSidebarOpen = state.isSidebarOpen
      this.isMobileView = state.isMobileView
      this.leftMenuWidth = state.leftMenuWidth
      this.isMenuCollapsed = state.isMenuCollapsed
      this.logo = state.logo
    })
  }

  ngOnInit() {
    this.activateMenu(this.router.url)
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        this.activateMenu(event.url ? event.url : null)
      })
  }

  activateMenu(url: any, menuData = this.menuData) {
    menuData = JSON.parse(JSON.stringify(menuData))
    const pathWithSelection = this.getPath({ url: url }, menuData, (entry: any) => entry, 'url')
    if (pathWithSelection) {
      pathWithSelection.pop().selected = true
      _.each(pathWithSelection, (parent: any) => (parent.open = true))
    }
    this.menuDataActivated = menuData.slice()
  }

  getPath(
    element: any,
    source: any,
    property: any,
    keyProperty = 'key',
    childrenProperty = 'children',
    path = [],
  ) {
    let found = false
    const getElementChildren = (value: any) => _.get(value, childrenProperty)
    const getElementKey = (value: any) => _.get(value, keyProperty)
    const key = getElementKey(element)
    return (
      _.some(source, (e: any) => {
        if (getElementKey(e) === key) {
          path.push(e)
          return true
        } else {
          return (found = this.getPath(
            element,
            getElementChildren(e),
            property,
            keyProperty,
            childrenProperty,
            path.concat(e),
          ))
        }
      }) &&
      (found || _.map(path, property))
    )
  }

  toggleSettings() {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        isSidebarOpen: !this.isSidebarOpen,
      }),
    )
  }

  onCollapse(value: any) {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        isMenuCollapsed: value,
      }),
    )
  }

  navigatetohome(){
    this.router.navigateByUrl("/apps/order")
  }
}
