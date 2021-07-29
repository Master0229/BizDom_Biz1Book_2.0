import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, LOCALE_ID, ErrorHandler } from '@angular/core'
import { TranslateModule } from '@ngx-translate/core'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { NgProgressModule } from '@ngx-progressbar/core'
import { NgProgressRouterModule } from '@ngx-progressbar/router'
import { NgProgressHttpModule } from '@ngx-progressbar/http'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { reducers, metaReducers } from './store/reducers'
import { UserEffects } from './store/user/effects'
import { firebaseConfig, firebaseAuthService } from './services/firebase'
import { jwtAuthService } from './services/jwt'
import { MockHttpCallInterceptor } from './services/fakeApi'

// Electron
import { ElectronService, NgxElectronModule } from 'ngx-electron'

// Pipe
// import { FilterPipe, CategoryPipe, MultiFilterPipe, ExcludeFilterPipe } from './shared/order.filter.pipe';
// import { MomentPipe } from './shared/moment.pipe';

// locale resistration
import { registerLocaleData } from '@angular/common'
import { default as localeEn } from '@angular/common/locales/en'
import { NZ_I18N, en_US as localeZorro } from 'ng-zorro-antd'
import { JwtInterceptor } from './services/interceptors/jwt.interceptor'
import { ErrorLogger } from './services/errorlogger/errologger'
const LOCALE_PROVIDERS = [
  { provide: LOCALE_ID, useValue: 'en' },
  { provide: NZ_I18N, useValue: localeZorro },
]
registerLocaleData(localeEn, 'en')

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    NgxElectronModule,

    // translate
    TranslateModule.forRoot(),

    // ngrx
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([UserEffects]),
    StoreRouterConnectingModule.forRoot(),

    // nprogress
    NgProgressModule.withConfig({
      thick: true,
      spinner: false,
      color: '#0190fe',
    }),
    NgProgressRouterModule,
    NgProgressHttpModule,

    // init firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  providers: [
    // auth services
    firebaseAuthService,
    jwtAuthService,
    ElectronService,

    // fake http interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockHttpCallInterceptor,
      multi: true,
    },

    // locale providers
    ...LOCALE_PROVIDERS,

    // firestore settings
    { provide: SETTINGS, useValue: {} },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: ErrorHandler, useClass: ErrorLogger }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
