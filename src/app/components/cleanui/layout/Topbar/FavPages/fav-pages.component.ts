import { Component, OnInit } from '@angular/core'
import store from 'store'
import { NzMessageService } from 'ng-zorro-antd/message'
import { MenuService } from 'src/app/services/menu'

@Component({
  selector: 'cui-topbar-fav-pages',
  templateUrl: './fav-pages.component.html',
  styleUrls: ['./fav-pages.component.scss'],
})
export class TopbarFavPagesComponent implements OnInit {
  searchText: String = ''
  favs: any = store.get('app.topbar.favs') || []
  pagesList: any[] = []
  menuData: any[]
  filteredPagesList: any[] = []

  constructor(private menuService: MenuService, private message: NzMessageService) {}

  ngOnInit() {
    this.menuService.getMenuData().subscribe(menuData => (this.menuData = menuData))
    this.loadPagesList()
    this.filterPagesList()
  }

  loadPagesList() {
    const pagesList = () => {
      const menuData = this.menuData
      const _menuData = JSON.parse(JSON.stringify(menuData))
      const flattenItems = (items, key) =>
        items.reduce((flattenedItems, item) => {
          if (item.category) {
            return flattenedItems
          }
          if (item.key === 'nestedItem1' || item.disabled) {
            // skip unwanted items
            return flattenedItems
          }
          if (Array.isArray(item[key])) {
            const items = item[key].map(child => {
              child.icon = item.icon
              return child
            })
            return flattenedItems.concat(flattenItems(items, key))
          }
          flattenedItems.push(item)
          return flattenedItems
        }, [])
      return flattenItems(_menuData, 'children')
    }
    this.pagesList = pagesList()
  }

  filterPagesList() {
    const pagesList = this.pagesList
    const favs = this.favs
    const _searchText = this.searchText ? this.searchText.toUpperCase() : ''
    const getFilteredPageList = () => {
      const list = []
      pagesList.forEach(item => {
        const isActive = favs.some(child => child.url === item.url)
        if (!item.title.toUpperCase().includes(_searchText) && _searchText) {
          return null
        }
        item.isActive = isActive
        list.push(item)
        return null
      })
      return list
    }
    this.filteredPagesList = getFilteredPageList()
  }

  setFav(e, item) {
    e.preventDefault()
    e.stopPropagation()
    const favs = this.favs
    const isActive = favs.some(child => child.url === item.url)
    if (isActive) {
      const filtered = favs.filter(child => child.url !== item.url)
      store.set('app.topbar.favs', filtered)
      this.favs = filtered
      this.filterPagesList()
      return
    }
    if (favs.length >= 3) {
      this.message.info('Only three pages can be added to your bookmarks.')
      return
    }
    const items = [...favs]
    items.push(item)
    store.set('app.topbar.favs', items)
    this.favs = items
    this.filterPagesList()
  }
}
