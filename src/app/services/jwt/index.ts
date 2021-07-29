import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import store from 'store'

@Injectable()
export class jwtAuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post('/api/auth/login', { email, password })
  }

  register(email: string, password: string, name: string): Observable<any> {
    return this.http.post('/api/auth/register', { email, password, name })
  }

  currentAccount(): Observable<any> {
    const accessToken = store.get('accessToken')
    const params = accessToken
      ? {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            AccessToken: accessToken,
          },
        }
      : {}

    return this.http.get('/api/auth/account', params)
  }

  logout(): Observable<any> {
    return this.http.get('/api/auth/logout')
  }
}
