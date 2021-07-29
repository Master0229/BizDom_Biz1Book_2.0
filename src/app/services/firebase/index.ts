import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFireDatabase } from '@angular/fire/database'
import { Router, ActivatedRoute } from '@angular/router'
import { NzNotificationService } from 'ng-zorro-antd'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
import * as UserActions from 'src/app/store/user/actions'

interface User {
  uid: string
  email: string
  displayName: string
  photoURL: string
  emailVerified: boolean
  role: string
}

export const firebaseConfig = {
  apiKey: 'AIzaSyBJVhr2WZshEGR7egcxoygQIphKOkKVIYQ',
  authDomain: 'sellpixels-7d5d4.firebaseapp.com',
  databaseURL: 'https://sellpixels-7d5d4.firebaseio.com',
  projectId: 'sellpixels-7d5d4',
  storageBucket: 'cleanui-72a42.appspot.com',
  messagingSenderId: '338219933237',
}

@Injectable({
  providedIn: 'root',
})
export class firebaseAuthService {
  authProvider: string = ''

  constructor(
    public firebaseAuth: AngularFireAuth,
    public firebaseDatabase: AngularFireDatabase,
    public router: Router,
    public route: ActivatedRoute,
    private notification: NzNotificationService,
    private store: Store<any>,
  ) {
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.authProvider = state.authProvider
    })
    this.firebaseAuth.authState.subscribe(user => {
      if (this.authProvider === 'jwt') {
        return
      }
      if (user) {
        // get user fields from database and merge them with user auth data
        firebaseDatabase.database
          .ref('users')
          .child(user.uid)
          .once('value')
          .then(snapshot => {
            const userFields = snapshot.val()
            const userData = {
              id: user.uid,
              name: userFields.name,
              role: userFields.role,
              avatar: user.photoURL,
              email: user.email,
              authorized: true,
              loading: false,
            }
            if (this.route.snapshot.queryParams.returnUrl) {
              this.router.navigate([this.route.snapshot.queryParams.returnUrl]) // // redirect to returnUrl
            } else if (this.router.url.includes('/auth')) {
              this.router.navigate(['/']) // redirect to root route on auth pages
            }
            this.store.dispatch(new UserActions.LoadCurrentAccountSuccessful(userData)) // save userData to store
          })
      }
    })
  }

  async login(email: string, password: string) {
    return this.firebaseAuth.signInWithEmailAndPassword(email, password).then(() => {
      return Promise.resolve(true)
    })
  }

  async register(email: string, password: string, name: string) {
    return this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(response => {
      if (response.user) {
        const { uid } = response.user
        this.firebaseDatabase.database
          .ref('users')
          .child(uid)
          .set({
            role: 'admin',
            name,
          })
      }
      return Promise.resolve()
    })
  }

  async logout() {
    return this.firebaseAuth.signOut()
  }
}
