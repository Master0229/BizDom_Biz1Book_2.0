import { Injectable, Injector } from '@angular/core'
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http'
import { Observable, of, timer } from 'rxjs'
import { switchMap } from 'rxjs/operators'

const fakeJwtToken =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1OTA4Njk0MDEsImV4cCI6MTkwNjQwMjIwMSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.E3kbVuYOL_CVQIDZ25iUXHlyIXTzt2XGO--JkK8LmKY'
const users = [
  {
    id: 1,
    email: 'demo@sellpixels.com',
    password: 'demo123',
    name: 'Tom Jones',
    avatar: '',
    role: 'admin',
    accessToken: fakeJwtToken,
  },
]

@Injectable()
export class MockHttpCallInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.method === 'POST') {
      // login
      if (request.url === '/api/auth/login') {
        const { email, password } = request.body
        const user: any = users.find(item => item.email === email && item.password === password)
        const error = user ? 'Something went wrong.' : 'Login failed, please try again'

        if (user) {
          return timer(500).pipe(switchMap(() => of(new HttpResponse({ status: 200, body: user }))))
        }

        return of(new HttpResponse({ status: 401, body: error }))
      }

      // register
      if (request.url === '/api/auth/register') {
        const { email, password, name } = request.body
        const user = users.find(user => user.email === email)

        if (!user) {
          const user = {
            id: users.length + 1,
            email,
            password,
            name,
            avatar: '',
            role: 'admin',
            accessToken: fakeJwtToken,
          }
          users.push(user)

          return of(new HttpResponse({ status: 200, body: user }))
        }

        return of(new HttpResponse({ status: 401, body: 'This email is already in use.' }))
      }
    }

    if (request.method === 'GET') {
      // load account
      if (request.url === '/api/auth/account') {
        const AccessToken = request.headers.get('AccessToken')
        const user: any = users.find(user => user.accessToken === AccessToken)

        if (user) {
          return timer(500).pipe(switchMap(() => of(new HttpResponse({ status: 200, body: user }))))
        }

        return of(new HttpResponse({ status: 401 }))
      }

      // logout
      if (request.url === '/api/auth/logout') {
        return of(new HttpResponse({ status: 200 }))
      }
    }

    return next.handle(request)
  }
}
