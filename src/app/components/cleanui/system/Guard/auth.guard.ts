import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { environment } from 'src/environments/environment'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  authorized: boolean

  constructor(private store: Store<any>, public router: Router) {
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.authorized = state.authorized
    })
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (environment.authenticated) {
      // skip guard checking on demo environment serve/build, remove it in your app
      return true
    }

    if (this.authorized) {
      return true
    }

    this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } })
    return false
  }
}
