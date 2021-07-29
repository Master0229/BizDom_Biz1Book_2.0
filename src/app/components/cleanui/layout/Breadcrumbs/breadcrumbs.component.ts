import { Component, OnInit } from '@angular/core'
import { Router, NavigationStart } from '@angular/router'
import { Store } from '@ngrx/store'
import { filter } from 'rxjs/operators'
import { reduce } from 'lodash'
import { MenuService } from 'src/app/services/menu'

@Component({
  selector: 'cui-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
})
export class BreadcrumbsComponent implements OnInit {
  menuData: any[]
  breadcrumbs: any[]

  constructor(
    private menuService: MenuService,
    private store: Store<any>,
    private router: Router,
  ) {}

  ngOnInit() {
    this.menuService.getMenuData().subscribe(menuData => (this.menuData = menuData))
    this.generateBreadcrumbs(this.router.url)
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        this.generateBreadcrumbs(event.url ? event.url : null)
      })
  }

  generateBreadcrumbs(event: any) {
    this.breadcrumbs = this.getPath(this.menuData, event).reverse()
  }

  getPath(data: any[], url: string, parents = []) {
    const items = reduce(
      data,
      (result: any, entry: any) => {
        if (result.length) {
          return result
        }
        if (entry.url === url) {
          return [entry].concat(parents)
        }
        if (entry.children) {
          const nested = this.getPath(entry.children, url, [entry].concat(parents))
          return (result || []).concat(nested.filter((e: any) => !!e))
        }
        return result
      },
      [],
    )
    return items.length > 0 ? items : [false]
  }
}
