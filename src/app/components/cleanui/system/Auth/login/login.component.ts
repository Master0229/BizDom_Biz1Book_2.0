import { Component, ElementRef, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { select, Store } from '@ngrx/store'
import * as Reducers from 'src/app/store/reducers'
import * as UserActions from 'src/app/store/user/actions'
import * as SettingsActions from 'src/app/store/settings/actions'
import { AuthService } from 'src/app/auth.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { NzNotificationService } from 'ng-zorro-antd'
import { Router } from '@angular/router'
@Component({
  selector: 'cui-system-login',
  templateUrl: './login.component.html',
  styleUrls: ['../style.component.scss'],
})
export class LoginComponent {
  @ViewChild('storelist', { static: false }) private storelistmodal: ElementRef
  form: FormGroup
  logo: String
  authProvider: string = 'firebase'
  loading: boolean = false
  stores: any = []
  responsedata: any
  constructor(
    private fb: FormBuilder,
    private store: Store<any>,
    private auth: AuthService,
    private modalService: NgbModal,
    private notification: NzNotificationService,
    private router: Router,
  ) {
    var token = localStorage.getItem('token')
    if (token) {
      this.router.navigateByUrl('/auth/lockpage')
    }
    this.form = fb.group({
      email: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required]],
    })
    this.store.pipe(select(Reducers.getSettings)).subscribe(state => {
      this.logo = state.logo
      this.authProvider = state.authProvider
    })
    this.store.pipe(select(Reducers.getUser)).subscribe(state => {
      this.loading = state.loading
    })
  }

  get email() {
    return this.form.controls.email
  }
  get password() {
    return this.form.controls.password
  }

  submitForm(): void {
    this.email.markAsDirty()
    this.email.updateValueAndValidity()
    this.password.markAsDirty()
    this.password.updateValueAndValidity()
    if (this.email.invalid || this.password.invalid) {
      return
    }
    const payload = {
      emailId: this.email.value,
      password: this.password.value,
    }
    this.loading = true
    this.auth.LogIn(payload).subscribe(data => {
      this.loading = false
      console.log(data)
      if (data['status'] == 200) {
        this.stores = data['data']
        this.responsedata = data
        this.modalService.open(this.storelistmodal)
        this.store.dispatch(new UserActions.LoginSuccessful({}))
      } else {
        this.notification.error('Login Failed!', data['msg'])
      }
    })
  }
  oldlogin() {
    const payload = {
      email: 'demo@sellpixels.com',
      password: 'demo123',
    }

    this.store.dispatch(new UserActions.Login(payload))
  }
  storeselect(storeid) {
    this.loading = true
    this.modalService.dismissAll()
    var storedata = {}
    var orderno = this.responsedata.OrderNo.filter(x => x.StoreId == storeid)[0]?.OrderNo
    var kotno = this.responsedata.KotNo.filter(x => x.StoreId == storeid)[0]?.KotNo
    var store = this.stores.filter(x => x.Id == storeid)[0]
    storedata['orderkey'] = {
      orderno: orderno ? +orderno + 1 : 1,
      GSTno: store.GSTno,
      kotno: kotno ? +kotno + 1 : 1,
      timestamp: new Date().getTime(),
    }
    storedata['preferences'] = this.responsedata.preferences.filter(x => x.StoreId == storeid)[0]
    storedata['storeusers'] = store.StoreUsers
    storedata['loginfo'] = {
      StoreId: store.Id,
      Email: this.email.value,
      Store: store.Name,
      OpeningTime: store.OpeningTime,
      ClosingTime: store.ClosingTime,
      CompanyId: store.CompanyId,
      Address: store.Address,
      City: store.City,
      ContactNo: store.ContactNo,
      Company: store.Company,
      AutoAcceptTime: store.AutoAcceptTime,
      FoodPrepTime: store.FoodPrepTime,
      GSTno: store.GSTno
    }
    localStorage.setItem('logInfo', JSON.stringify(storedata['loginfo']))
    localStorage.setItem('token', this.responsedata.token.Value.token.Value)
    this.auth.getStoreData(store.CompanyId, store.Id).subscribe(data => {
      console.log(data)
      console.log(JSON.stringify(Object.keys(data)))
      storedata['product'] = data['Product']
      storedata['category'] = data['Category']
      storedata['customers'] = data['Customers']
      storedata['kotgroups'] = data['KotGroups']
      storedata['diningarea'] = data['DiningArea']
      storedata['diningtable'] = data['DiningTable']
      storedata['paymenttypes'] = data['StorePaymentTypes']
      storedata['discountrule'] = data['DiscountRule']
      storedata['additionalcharges'] = data['AdditionalCharge']
      storedata['stores'] = data['Stores']
      storedata['pendingorders'] = []
      storedata['preorders'] = []
      storedata['orderstatusbtns'] = data['OrderStatusButtons']
      data['PendingOrders'].forEach(oj => {
        if (oj.OrderJson) {
          var json = JSON.parse(oj.OrderJson)
          json.datastatus = ''
          json.status = 'S'
          delete json._id
          storedata['preorders'].push(json)
        }
      })
      this.auth.storeselect(storedata).subscribe(data1 => {
        console.log(data1)
        this.router.navigateByUrl('/auth/lockpage')
      })
      this.auth.getdbdata(['printersettings']).subscribe(data => {
        var printersettings = data['printersettings'][0] ? data['printersettings'][0] : {}
        printersettings.kotgroups = []
        if (storedata['kotgroups']) {
          storedata['kotgroups'].forEach(kotgrp => {
            var obj = kotgrp
            obj.Printers = JSON.parse(kotgrp.Printer)
            delete obj.Printer
            printersettings.kotgroups.push(obj)
          })
        }
        this.auth.updateprintersettings(printersettings).subscribe(data => {})
      })
      // ["<Category>","<TaxGroup>","<Product>","<DiningArea>","<DiningTable>","<DiscountRule>","<AdditionalCharge>",
      // "<OrderType>","<Customers>","<PaymentType>","<KotGroups>","PendingOrders","<StorePaymentTypes>",
      // "<OrderStatus>","<ItemStatus>","<KOTStatus>","<PaymentStatus>","<TableStatus>","<TransType>","<Aggregators>"]
    })
  }

  setProvider(authProvider) {
    this.store.dispatch(
      new SettingsActions.SetStateAction({
        authProvider,
      }),
    )
  }
}
