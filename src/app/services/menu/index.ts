import { Injectable } from '@angular/core'
import { Observable, of } from 'rxjs'
import { getMenuData } from './config'

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor() {}

  getMenuData(): Observable<any[]> {
    return of(getMenuData)
  }
}
