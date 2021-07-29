import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Route } from '@angular/compiler/src/core'
import { ok } from 'assert'
import * as moment from 'moment'
// import 'rxjs/add/operator/catch'
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedStatus = false
  //base_url = "http://192.168.2.66:8000/";
  base_url1 = 'https://localhost:44383/api/'
  base_url = 'https://biz1pos.azurewebsites.net/api/'
  base_url_ak = 'https://fbakountz.azurewebsites.net/api/'
  dburl = 'http://localhost:8081/'
  //base_url=URL+'att';
  get isLoggedIn() {
    return this.loggedStatus
  }
  constructor(private http: HttpClient) { }
  /* Attedance Service Start */
  setLoggedIn(value: boolean) {
    this.loggedStatus = value
  }

  getUserDetails(username, password) {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    var formURL = this.base_url
    //log-in?user_name=163&password=163
    var formURL = this.base_url + 'att/log-in?user_name=' + username + '&password=' + password
    return this.http.get(formURL)
  }

  toFormData(formValue) {
    const formData = new FormData()

    for (const key of Object.keys(formValue)) {
      const value = formValue[key]
      formData.append(key, value)
    }
    return formData
  }

  Registration(formdata) {
    let body = this.toFormData(formdata)
    return this.http.post(this.base_url + 'Registration/Register', body)
  }
  LogIn(formdata) {
    let body = this.toFormData(formdata)
    return this.http.post(this.base_url + 'LogIn/LogIn', body)
  }
  storeselect(body) {
    return this.http.post(this.dburl + 'storeselect', body)
  }
  unlock(pin) {
    return this.http.get(this.dburl + 'unlock?pin=' + pin)
  }
  saveOrder1(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // // console.log("api");
    return this.http.post(this.base_url + 'POSOrder/CreateOrder', body)
  }
  editOrder(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // // console.log("api");
    return this.http.post(this.base_url + 'POSOrder/UpdateOrder', body)
  }
  getStoreData(compId, storeId) {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    var formURL = this.base_url
    // console.log(storeId);
    //log-in?user_name=163&password=163
    var formURL =
      this.base_url + 'StoreData/Get?compId=' + compId + '&storeId=' + storeId + '&tables=all'
    return this.http.get(formURL)
  }
  getStoreOrder(compId, storeId, start_date) {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    var formURL = this.base_url
    // console.log(compId);
    //log-in?user_name=163&password=163
    var formURL =
      this.base_url +
      'POSOrder/POSOrderData?compId=' +
      compId +
      '&storeId=' +
      storeId +
      '&POSDate=' +
      start_date
    return this.http.get(formURL)
  }
  getDashBoard(startdate, enddate, cmpId, Id) {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    var formURL = this.base_url
    // console.log(startdate)
    // console.log(enddate)
    //log-in?user_name=163&password=163
    var formURL =
      this.base_url +
      'Dashboard/Post?fromDate=' +
      startdate +
      '&toDate=' +
      enddate +
      '&compId=' +
      cmpId +
      '&storeId=' +
      Id
    return this.http.get(formURL)
  }
  GetStoreData() {
    var formURL = this.base_url + 'Dashboard/StoreData'
    return this.http.get(formURL)
  }
  GetStores(CompanyId) {
    var formURL = this.base_url + 'Stores/Get?CompanyId=' + CompanyId
    return this.http.get(formURL)
  }
  AddStoreData1(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    return this.http.post(this.base_url + 'Stores/AddStore', body)
  }
  Editoutlet(Id) {
    return this.http.get(this.base_url + 'Stores/Edit?Id=' + Id)
  }
  Updateoutlet(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'Stores/UpdateData', body)
  }
  DeleteOutlet(Id) {
    return this.http.get(this.base_url + 'Stores/Delete?Id=' + Id)
  }
  getVariant(CompanyId) {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    var formURL = this.base_url
    //log-in?user_name=163&password=163
    var formURL = this.base_url + 'Variant/Get?CompanyId=' + CompanyId
    return this.http.get(formURL)
  }
  GetCatVar(Id) {
    var formURL = this.base_url
    var formURL = this.base_url + 'Category/EditVariant?Id=' + Id
    return this.http.get(formURL)
  }
  getTax(CompanyId) {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    var formURL = this.base_url
    var formURL = this.base_url + 'TaxGroup/Get?CompanyId=' + CompanyId
    return this.http.get(formURL)
  }
  addvariant(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'Variant/CreateVariant', body)
  }
  addTaxgrp(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'TaxGroup/AddTax', body)
  }
  addChargesave(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'AdditionalCharges/Create', body)
  }
  EditVariant(Id) {
    return this.http.get(this.base_url + 'Variant/GetById?Id=' + Id)
  }
  getDiscount(CompanyId) {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    var formURL = this.base_url
    var formURL = this.base_url + 'DiscountRule/Get?CompanyId=' + CompanyId
    return this.http.get(formURL)
  }
  getCustomers(CompanyId) {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    var formURL = this.base_url
    var formURL = this.base_url + 'Customer/GetIndex?CompanyId=' + CompanyId
    return this.http.get(formURL)
  }
  addcustomers(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'Customer/AddCustomer', body)
  }
  ImportData(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'Category/AddCategory', body)
  }
  getcat1(id, CompanyId) {
    var formURL = this.base_url
    var formURL = this.base_url + 'Category/Edit?Id=' + id + '&CompanyId=' + CompanyId
    return this.http.get(formURL)
  }
  getcat(CompanyId) {
    var formURL = this.base_url
    var formURL = this.base_url + 'Category/Index?CompanyId=' + CompanyId
    return this.http.get(formURL)
  }
  savecategory(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'Category/SaveData', body)
  }
  savecategory1(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'Category/Update', body)
  }
  Getcat(Id) {
    // console.log(Id);
    return this.http.get(this.base_url + 'Category/EditVariant?Id=' + Id)
  }
  getoption(CompanyId) {
    var formURL = this.base_url
    var formURL = this.base_url + 'Category/CatOption?CompanyId=' + CompanyId
    return this.http.get(formURL)
  }
  saveExpense(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'Transtype/SaveData', body)
  }
  UpdateExpense(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'Transtype/Update', body)
  }
  getpayment() {
    var formURL = this.base_url
    var formURL = this.base_url + 'Transtype/GetPay'
    return this.http.get(formURL)
  }
  EditType(Id) {
    // console.log(Id);
    return this.http.get(this.base_url + 'Transtype/Edit?Id=' + Id)
  }
  EditCustomers(Id, CompanyId) {
    // console.log(Id);
    return this.http.get(this.base_url + 'Customer/Edit?Id=' + Id + '&companyId=' + CompanyId)
  }
  UpdateCustomer(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'Customer/Update', body)
  }
  Deletecustomer(Id) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/x-www-form-urlencoded')

    let urlSearchParams = new URLSearchParams()
    urlSearchParams.append('Id', Id)
    return this.http.get(this.base_url + 'Customer/Delete?Id=' + Id)
  }
  saveCatgy(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'Category/AddCategory', body)
  }
  getkotgrp(CompanyId) {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    var formURL = this.base_url
    var formURL = this.base_url + 'KOTGroup/GetIndex?CompanyId=' + CompanyId
    return this.http.get(formURL)
  }
  addkotgrp(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'KOTGroup/Create', body)
  }
  Editkotgp(Id, CompanyId) {
    return this.http.get(this.base_url + 'KOTGroup/Edit?Id=' + Id + '&CompanyId=' + CompanyId)
  }
  UpdateKot(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'KOTGroup/Update', body)
  }
  getAddtnchrgs(CompanyId) {
    var formURL = this.base_url + 'AdditionalCharges/Index?CompanyId=' + CompanyId
    return this.http.get(formURL)
  }

  getAddon(CompanyId) {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    var formURL = this.base_url
    var formURL = this.base_url + 'Addon/GetAddOn?CompanyId=' + CompanyId
    return this.http.get(formURL)
  }
  getTaxgp(CompanyId) {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    var formURL = this.base_url
    var formURL = this.base_url + 'AdditionalCharges/GetTax?CompanyId=' + CompanyId
    return this.http.get(formURL)
  }
  getSalesrpt(Id, frmdate, todate, compId) {
    // var body1 = this.toFormData(frmdate);
    // var body2 = this.toFormData(todate);
    // console.log(Id, frmdate, todate)
    var formURL = this.base_url
    var formURL =
      this.base_url +
      'SalesRpt/Get?frmdate=' +
      frmdate +
      '&todate=' +
      todate +
      '&Id=' +
      Id +
      '&compId=' +
      compId
    return this.http.get(formURL)
  }
  GetRpt(Id) {
    return this.http.get(this.base_url + 'SalesRpt/Get?Id=' + Id)
  }
  GetSalesRpt(Id, frmdate, todate, CompanyId) {
    // console.log(CompanyId)
    // console.log(todate)
    var formURL = this.base_url
    var formURL =
      this.base_url +
      'DayWiseSalesRpt/GetRpt?frmdate=' +
      frmdate +
      '&todate=' +
      todate +
      '&Id=' +
      Id +
      '&companyId=' +
      CompanyId
    return this.http.get(formURL)
  }
  GetSalesRpt1(Id, frmdate, todate, compId) {
    // console.log(frmdate)
    // console.log(todate)
    var formURL = this.base_url
    var formURL =
      this.base_url +
      'OrderWise/GetRpt?frmdate=' +
      frmdate +
      '&todate=' +
      todate +
      '&Id=' +
      Id +
      '&compId=' +
      compId
    return this.http.get(formURL)
  }
  GetOrderWiseSalesRpt(Id, frmdate, todate, compId) {
    // console.log(frmdate)
    // console.log(todate)
    var formURL = this.base_url
    var formURL =
      this.base_url +
      'OrderWise/GetRpt?frmdate=' +
      frmdate +
      '&todate=' +
      todate +
      '&Id=' +
      Id +
      '&compId=' +
      compId
    return this.http.get(formURL)
  }
  GetTransactionRpt(Id, frmdate, todate, compId) {
    // console.log(frmdate)
    // console.log(todate)
    var formURL = this.base_url
    var formURL =
      this.base_url +
      'TransactionRpt/GetRpt?frmdate=' +
      frmdate +
      '&todate=' +
      todate +
      '&Id=' +
      Id +
      '&compId=' +
      compId
    return this.http.get(formURL)
  }
  GetproductRpt(Id, frmdate, todate, compId) {
    // console.log(frmdate)
    // console.log(todate)
    var formURL = this.base_url
    var formURL =
      this.base_url +
      'productwise/GetRpt?frmdate=' +
      frmdate +
      '&todate=' +
      todate +
      '&Id=' +
      Id +
      '&compId=' +
      compId
    return this.http.get(formURL)
  }

  GetStoreName(CompanyId) {
    var formURL = this.base_url
    var formURL = this.base_url + 'DayWiseSalesRpt/GetStore?CompanyId=' + CompanyId
    return this.http.get(formURL)
  }
  GetStoreName1(CompanyId) {
    var formURL = this.base_url
    var formURL = this.base_url + 'ProductWise/GetStore?CompanyId=' + CompanyId
    return this.http.get(formURL)
  }
  GetStoreName2(CompanyId) {
    var formURL = this.base_url
    var formURL = this.base_url + 'TransactionRpt/GetStore?CompanyId=' + CompanyId
    return this.http.get(formURL)
  }
  GetStoreName3(CompanyId) {
    var formURL = this.base_url
    var formURL = this.base_url + 'OrderWise/GetStore?CompanyId=' + CompanyId
    return this.http.get(formURL)
  }

  GetRole(CompanyId) {
    var formURL = this.base_url
    var formURL = this.base_url + 'Role/Get?CompanyId=' + CompanyId
    return this.http.get(formURL)
  }
  getUser(CompanyId) {
    var formURL = this.base_url
    var formURL = this.base_url + 'User/Get?CompanyId=' + CompanyId
    return this.http.get(formURL)
  }

  createAddon(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'Addon/Create', body)
  }
  addDiscount(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'DiscountRule/AddDiscount', body)
  }
  EditAddOn(Id) {
    return this.http.get(this.base_url + 'Addon/GetById?Id=' + Id)
  }

  EditTaxGrp(Id, CompanyId) {
    return this.http.get(this.base_url + 'TaxGroup/Edit?Id=' + Id + 'CompanyId=' + CompanyId)
  }
  EditDiscRule(Id) {
    return this.http.get(this.base_url + 'DiscountRule/Edit?Id=' + Id)
  }
  EditAddchrgs(Id, CompanyId) {
    return this.http.get(
      this.base_url + 'AdditionalCharges/Edit?Id=' + Id + '&CompanyId=' + CompanyId,
    )
  }
  UpdateTax(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'TaxGroup/Update', body)
  }
  UpdateDisct(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'DiscountRule/Update', body)
  }
  UpdateAddchrgs(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'AdditionalCharges/Update', body)
  }
  UpdateCat2(formdata, CompanyId) {
    let body = this.toFormData(formdata)
    return this.http.post(this.base_url + 'Category/Update?CompanyId' + CompanyId, body)
  }
  formArray(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'Variant/Update', body)
  }
  formuser(formdata, CompanyId) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'User/Add?CompanyId=' + CompanyId, body)
  }
  UpdateAddon(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'Addon/Update', body)
  }
  Deletecat(Id) {
    return this.http.get(this.base_url + 'Category/Delete?Id=' + Id)
  }
  Delete(Id) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/x-www-form-urlencoded')

    let urlSearchParams = new URLSearchParams()
    urlSearchParams.append('Id', Id)

    // console.log(this.base_url + "Variant/Delete");
    return this.http.get(this.base_url + 'Variant/Delete?Id=' + Id)
  }
  DeleteAddon(Id) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/x-www-form-urlencoded')

    let urlSearchParams = new URLSearchParams()
    urlSearchParams.append('Id', Id)
    // console.log(this.base_url + "Addon/Delete");
    return this.http.get(this.base_url + 'Addon/Delete?Id=' + Id)
  }

  Deletekotgrp(Id) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/x-www-form-urlencoded')

    let urlSearchParams = new URLSearchParams()
    urlSearchParams.append('Id', Id)
    // console.log(this.base_url + "KOTGroup/Delete");
    return this.http.get(this.base_url + 'KOTGroup/Delete?Id=' + Id)
  }
  DeleteAddchrgs(Id) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/x-www-form-urlencoded')
    let urlSearchParams = new URLSearchParams()
    urlSearchParams.append('Id', Id)
    // console.log(this.base_url + "AdditionalCharges/Delete");
    return this.http.get(this.base_url + 'AdditionalCharges/Delete?Id=' + Id)
  }

  DeleteTax(Id) {
    // console.log(this.base_url + "TaxGroup/Delete");
    return this.http.get(this.base_url + 'TaxGroup/Delete?Id=' + Id)
  }
  DeleteDisc(Id) {
    // console.log(this.base_url + "DiscountRule/Delete");
    return this.http.get(this.base_url + 'DiscountRule/Delete?Id=' + Id)
  }
  autoProduct(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'Addon/GetProductlist', body)
  }
  addProd(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'Addon/Create', body)
  }
  // importProduct(formdata)
  // {
  //   // console.log(formdata);
  //   var body = this.toFormData(formdata);
  //   return this.http.post(this.base_url+"Product/ImportProduct",body);
  // }
  DeleteProduct(Id, CompanyId) {
    // // console.log(this.base_url + "VariantGroup/Delete");
    return this.http.get(this.base_url + 'Product/Delete?Id=' + Id + '&CompanyId=' + CompanyId)
  }
  DeleteUser(Id) {
    return this.http.get(this.base_url + 'User/Delete?Id=' + Id)
  }
  EditCat(data) {
    return data
  }
  getStore() {
    return this.http.get('https://localhost:44383/api/Stores/Get')
  }
  getStrePrd(data, id) {
    return this.http.get(
      'https://localhost:44383/api/Stores/GetData?prodId=' + data + '&storeId=' + id,
    )
  }
  savestoreProduct(data) {
    let body = this.toFormData(data)
    // console.log(data);
    // console.log(body);
    return this.http.post(this.base_url + 'Stores/Update', body)
  }
  getSave(CompanyId) {
    var formURL = this.base_url + 'Stores/Get?CompanyId=' + CompanyId
    return this.http.get(formURL)
  }
  saveProduct(formdata, Id, CompanyId) {
    let body = this.toFormData(formdata)
    // console.log(formdata, Id);
    // console.log(body);
    if (Id > 0) {
      return this.http.post(this.base_url + 'Product/Update?CompanyId=' + CompanyId, body)
    } else {
      return this.http.post(this.base_url + 'Product/AddProduct?CompanyId=' + CompanyId, body)
    }
  }
  getProduct(id, compId, storeId) {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    var formURL = this.base_url
    //log-in?user_name=163&password=163
    var formURL =
      this.base_url + 'Product/GetById?id=' + id + '&compId=' + compId + '&storeId=' + storeId
    return this.http.get(formURL)

    //////JWT/////
    var formURL =
      'https://localhost:44383/api/Product/GetById?id=' +
      id +
      '&compId=' +
      compId +
      '&storeId=' +
      storeId
    let token = localStorage.getItem('jwt')
    return this.http.get(formURL, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      }),
    })
  }
  getReceipt(storeId, companyId, startId, Type, dataType, fromdate, todate, invoice) {
    // fromdate = moment('2019/11/14').format("YYYY-MM-DD")
    // todate = moment('2019/11/16').format("YYYY-MM-DD")
    return this.http.get(
      this.base_url +
      'Receipt/Get?StoreId=' +
      storeId +
      '&CompanyId=' +
      companyId +
      '&StartId=' +
      startId +
      '&type=' +
      Type +
      '&dataType=' +
      dataType +
      '&fromdate=' +
      fromdate +
      '&todate=' +
      todate +
      '&invoice=' +
      invoice,
    )
  }
  transact(formdata) {
    let body = this.toFormData(formdata)
    return this.http.post(this.base_url + 'Receipt/Pay', body)
  }
  getExpense() {
    var formURL = this.base_url
    var formURL = this.base_url + 'Transtype/Get'
    return this.http.get(formURL)
  }
  DeleteExpense(Id) {
    // console.log(this.base_url + "Transtype/Delete");
    return this.http.get(this.base_url + 'Transtype/Delete?Id=' + Id)
  }
  getCustomerByPhone(Phone) {
    return this.http.get(this.base_url + 'Customer/GetCustomerByPhone?Phone=' + Phone)
  }
  GetVar() {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    var formURL = this.base_url
    var formURL = this.base_url + 'Category/CatVariant'
    return this.http.get(formURL)
  }
  saveCategory(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'Category/SaveData', body)
  }
  updateCat(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'Category/Update', body)
  }
  importProduct(formdata, Id) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'Product/ImportProduct?companyId=' + Id, body)
  }
  getOption(companyId) {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    var formURL = this.base_url
    var formURL = this.base_url + 'OptionGroup/Get?companyId=' + companyId
    return this.http.get(formURL)
  }
  saveoption(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'OptionGroup/CreateOption', body)
  }
  EditOption(Id) {
    return this.http.get(this.base_url + 'OptionGroup/GetById?Id=' + Id)
  }
  Updateoption(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'OptionGroup/Update', body)
  }
  DeleteOption(Id) {
    return this.http.get(this.base_url + 'OptionGroup/Delete?Id=' + Id)
  }
  getPrinter() {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    var formURL = this.base_url
    var formURL = this.base_url + 'Printer/Get'
    return this.http.get(formURL)
  }
  getUserdata(companyId) {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    var formURL = this.base_url
    var formURL = this.base_url + 'Company/Index?companyId=' + companyId
    return this.http.get(formURL)
  }
  saveCompany(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'Company/SaveData', body)
  }
  AddShift(formdata, openingtime) {
    let body = this.toFormData(formdata)
    return this.http.post(this.base_url + 'ShiftSummary/AddShift?OpeningTime=' + openingtime, body)
  }
  EditShift(Id, ClosBal, closingTIme) {
    return this.http.get(
      this.base_url +
      'ShiftSummary/EditShift?Id=' +
      Id +
      '&ClosingBalanace=' +
      ClosBal +
      '&ClosingTime=' +
      closingTIme,
    )
  }
  GetPrice(StoreId) {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    var formURL = this.base_url
    var formURL = this.base_url + 'StoreData/GetPrice?storeId=' + StoreId
    return this.http.get(formURL)
  }
  Updatepricebook(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'StoreData/Update', body)
  }
  Updateoptionbook(formdata) {
    let body = this.toFormData(formdata)
    // console.log(formdata);
    // console.log(body);
    return this.http.post(this.base_url + 'StoreData/UpdateOption', body)
  }
  editStore(Id) {
    return this.http.get(this.base_url + 'Stores/Edit?Id=' + Id)
  }
  updateStore(formdata) {
    let body = this.toFormData(formdata)
    return this.http.post(this.base_url + 'Stores/UpdateData', body)
  }
  acceptonlineorder(formdata) {
    let body = this.toFormData(formdata)
    return this.http.post(this.base_url + 'POSOrder/AcceptOnlineOrder', body)
  }
  OnlineOrderStatusChange(orderid, statusid) {
    return this.http.get(
      this.base_url +
      'POSOrder/onlineorderstatuschange?orderid=' +
      orderid +
      '&statusid=' +
      statusid,
    )
  }
  ///////URBAN_PIPER////////
  UPOrderStatusChange(orderId, statusdata, orderstatusid, storeid, companyid) {
    return this.http.get(
      this.base_url +
      'UrbanPiper/OrderStatus?orderId=' +
      orderId +
      '&statusdata=' +
      statusdata +
      '&companyId=' +
      companyid +
      '&storeid=' +
      storeid +
      '&orderstatusid=' +
      orderstatusid +
      '&needjwt=1',
    )
  }
  deleteAggOrder(uporderid) {
    return this.http.get(
      this.base_url + 'UrbanPiper/DeleteUPOrder?uporderid=' + uporderid + '&needjwt=1',
    )
  }
  Getitem(storeId, CompanyId) {
    // console.log(storeId);
    var headers = new HttpHeaders().set(
      'authorization',
      'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbmlzdHJhdG9yIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiZnJ1aXRzYW5kYmFrZXNAZ21haWwuY29tIiwiZXhwIjoxNjQzMDg2Mzg2LCJpc3MiOiJCaXoxQm9vayIsImF1ZCI6InJlYWRlcnMifQ.k9Lu7x4b3C6Q0L3nn_ESKJZHZyNm1TNDqw86U_o0UAg',
    )
    return this.http.get(
      this.base_url + 'UrbanPiper/GetPrd?Id=' + storeId + '&compId=' + CompanyId,
      { headers },
    )
  }
  GetUPProducts(storeid, companyid) {
    var headers = new Headers({
      auth:
        'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbmlzdHJhdG9yIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiZnJ1aXRzYW5kYmFrZXNAZ21haWwuY29tIiwiZXhwIjoxNjE0MjQyNDcwLCJpc3MiOiJCaXoxQm9vayIsImF1ZCI6InJlYWRlcnMifQ.PscWl8DU47jisgt7IZ6bxajTwevJ_R-9nxoMMSvK0Uo',
    })
    return this.http.get(
      this.base_url + 'UrbanPiper/GetExeUPProducts?Id=' + storeid + '&compId=' + companyid,
      {
        headers: new HttpHeaders({
          Authorization:
            'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbmlzdHJhdG9yIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiZnJ1aXRzYW5kYmFrZXNAZ21haWwuY29tIiwiZXhwIjoxNjE0MjQyNDcwLCJpc3MiOiJCaXoxQm9vayIsImF1ZCI6InJlYWRlcnMifQ.PscWl8DU47jisgt7IZ6bxajTwevJ_R-9nxoMMSvK0Uo',
          'Content-Type': 'application/json',
        }),
      },
    )
  }
  urbandata(companyId) {
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    var formURL = this.base_url
    var formURL = this.base_url + 'UrbanPiperStores/GetIndex?companyId=' + companyId
    return this.http.get(formURL)
  }

  UpdateProductUPPrice(frormdata) {
    let body = this.toFormData(frormdata)
    return this.http.post(this.base_url + 'UrbanPiperStores/StoreProduct', body)
  }

  UpdateOptionUPPrice(formdata) {
    let body = this.toFormData(formdata)
    return this.http.post(this.base_url + 'UrbanPiperStores/StoreOption', body)
  }

  catalogue(catalogue, storeId) {
    // console.log(catalogue);
    let body = this.toFormData(catalogue)
    var companyid = JSON.parse(localStorage.getItem('logInfo')).CompanyId
    return this.http.post(
      this.base_url + 'UrbanPiper/Catalouge?storeId=' + storeId + '&companyId=' + companyid,
      body,
    )
  }

  storeitemaction(formdata) {
    let body = this.toFormData(formdata)
    return this.http.post(this.base_url + 'Stores/itemaction', body)
  }

  items(item, companyid) {
    // console.log(item)
    let body = this.toFormData(item)
    console.log(body)
    // var companyid = JSON.parse(localStorage.getItem("logInfo")).CompanyId;
    return this.http.post(this.base_url + 'UrbanPiper/ItemAction?companyId=' + companyid, body)
  }

  upstoredetails(storeid, companyId) {
    var headers = new HttpHeaders().set(
      'authorization',
      'Bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbmlzdHJhdG9yIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoiZnJ1aXRzYW5kYmFrZXNAZ21haWwuY29tIiwiZXhwIjoxNjQzMDg2Mzg2LCJpc3MiOiJCaXoxQm9vayIsImF1ZCI6InJlYWRlcnMifQ.k9Lu7x4b3C6Q0L3nn_ESKJZHZyNm1TNDqw86U_o0UAg',
    )
    var formURL = this.base_url
    var formURL =
      this.base_url + `UrbanPiper/GetStoreById?storeid=${storeid}&companyId=${companyId}`
    return this.http.get(formURL, { headers })
  }

  storeAction(jstring) {
    var data =
      '{"stores":[{"city":"Chennai","name":"FBCakes2","min_pickup_time":900,"min_delivery_time":1800,"contact_phone":"98234566222","notification_phones":["+919134345345","98234566778"],"ref_id":"1234567892584","min_order_value":200,"hide_from_ui":false,"address":"60, RGM Complex, OMR Road, Karapakkam","notification_emails":["b1@mail.com","b2@mail.com"],"zip_codes":["560033","560022"],"geo_longitude":80.2291568,"active":true,"geo_latitude":12.9137880,"ordering_enabled":true}],"translations":[{"language":"fr", "name":"c\'est un magasin"}]}'
    let body = this.toFormData(jstring)
    var companyid = JSON.parse(localStorage.getItem('logInfo')).CompanyId
    return this.http.post(this.base_url + 'UrbanPiper/StoreAction?companyId=' + companyid, body)
  }

  updatepreference(preference) {
    let body = this.toFormData(preference)
    return this.http.post(this.base_url + 'Stores/UpdatePreferences', body)
  }

  getorderlogs(storeid, companyid) {
    return this.http.get(
      this.base_url + `POSOrder/getorderlogs?storeid=${storeid}&companyid=${companyid}`,
    )
  }

  getStoreKots(storeid, orderid) {
    return this.http.get(
      this.base_url1 + 'KOT/GetStoreKots?storeId=' + storeid + '&orderid=' + orderid,
    )
  }

  gettransactionsbyinvoice(invoice) {
    return this.http.get(
      this.base_url1 + 'TransactionRpt/gettransactionsbyinvoice?invoiceno=' + invoice,
    )
  }

  edittransaction(body) {
    return this.http.post(this.base_url1 + 'TransactionRpt/EditTransaction', body)
  }

  getproducts() {
    return this.http.get(this.dburl + 'products')
  }

  getcategories() {
    return this.http.get(this.dburl + 'categories')
  }

  print(body) {
    return this.http.post('http://localhost:8000/print', body)
  }
  saveorder(payload) {
    return this.http.post(this.base_url + 'POSOrder/saveorder_3', payload)
  }
  updateorder(payload) {
    return this.http.post(this.base_url + 'POSOrder/updateorder_2', payload)
  }
  orderstatuschange(payload, orderid, statusid) {
    return this.http.post(
      this.base_url + `POSOrder/orderstatuschange?orderid=${orderid}&statusid=${statusid}`,
      payload,
    )
  }
  makepayment(transactions) {
    return this.http.post(this.base_url + `POSOrder/ordertransaction`, transactions)
  }
  getstoreuporders(storeid) {
    return this.http.get(this.base_url + 'UrbanPiper/getstoreuporders?storeid=' + storeid)
  }
  getstorepaymentsbytype(storeid, companyid, from, to) {
    return this.http.get(
      this.base_url +
      `Receipt/storepaymentsbytype?storeid=${storeid}&companyid=${companyid}&from=${from}&to=${to}`,
    )
  }
  gettransactionsbytype(storeid, companyid, from, to, sourceid, ptypeid) {
    return this.http.get(
      this.base_url +
      `Receipt/transactionsbytype?storeid=${storeid}&companyid=${companyid}&from=${from}&to=${to}&sourceid=${sourceid}&ptypeid=${ptypeid}`,
    )
  }
  last10transactions(storeid, companyid, invoiceno) {
    return this.http.get(
      this.base_url + `Receipt/last10transactions?storeid=${storeid}&companyid=${companyid}&invoiceno=${invoiceno}`,
    )
  }
  savetransaction(transaction) {
    return this.http.post(this.base_url + `Receipt/updateTransactions`, transaction)
  }
  dayclosing(companyid, storeid, date, time) {
    return this.http.get(
      this.base_url_ak +
      `DayClosing/TransDetails?posCompId=${companyid}&posStoreId=${storeid}&dateStr=${date}&time=${time}`,
    )
  }
  ordertransaction(transactionlist) {
    return this.http.post(this.base_url + `Receipt/ordertransaction`, transactionlist)
  }
  getorderbyinvoice(invoiceno) {
    return this.http.get(this.base_url + 'POSOrder/getorderbyinvoice?invoiceno=' + invoiceno)
  }
  ////////////////////////////////////NEDB/////////////////////////////
  getdbdata(dbnames) {
    return this.http.post(this.dburl + 'getdbdata', dbnames)
  }
  updateorderkey(orderkey) {
    return this.http.post(this.dburl + 'setorderkey', orderkey)
  }
  updateprintersettings(setting) {
    return this.http.post(this.dburl + 'updateprintersettings', setting)
  }
  //pendingorder
  getorders() {
    return this.http.get(this.dburl + 'getorders')
  }
  saveordertonedb(order) {
    return this.http.post(this.dburl + 'saveorder', order)
  }
  updateordertonedb(order) {
    return this.http.post(this.dburl + 'updateorder', order)
  }
  deleteorderfromnedb(orderid, InvoiceNo) {
    return this.http.get(this.dburl + 'deleteorder?_id=' + orderid + '&invoiceno=' + InvoiceNo)
  }
  //preorder
  getpreorders() {
    return this.http.get(this.dburl + 'getpreorders')
  }
  getpreorderby_id(orderid) {
    return this.http.get(this.dburl + 'getpreorderby_id?_id=' + orderid)
  }
  savepreorders(order) {
    return this.http.post(this.dburl + 'savepreorder', order)
  }
  updatepreorders(order) {
    return this.http.post(this.dburl + 'updatepreorder', order)
  }
  deletepreorders(orderid) {
    return this.http.get(this.dburl + 'deletepreorder?_id=' + orderid)
  }
  updatepreorderbyinvoice(order) {
    return this.http.post(this.dburl + 'updatepreorderbyinvoice?_id=', order)
  }
  deletepreorderbyinvoice(invoiceno) {
    return this.http.get(this.dburl + 'deletepreorderbyinvoice?invoiceno=' + invoiceno)
  }
  checkanddeletepreorder(invoiceno) {
    return this.http.get(this.dburl + 'checkanddeletepreorder?invoiceno=' + invoiceno)
  }
  //tblorder
  savetblorder(order) {
    return this.http.post(this.dburl + 'savetblorder', order)
  }
  deletetblorder(diningtablekey) {
    return this.http.get(this.dburl + 'deletetblorder?diningtablekey=' + diningtablekey)
  }
  splitTable(body) {
    return this.http.post(this.dburl + 'splitTable', body)
  }
  deletesplittable(splittablekey) {
    return this.http.get(this.dburl + 'deletesplittable?splittablekey=' + splittablekey)
  }
  //settings
  updatecharges(charges) {
    return this.http.post(this.dburl + 'updatecharges', charges)
  }
  ///errored orders
  erroredorders() {
    return this.http.get(this.dburl + 'geterroredorders')
  }
  ///TRANSAXNS
  transactionsinvoice(invoiceno) {
    return this.http.get(this.dburl + 'transactionsbyinvoice?InvoiceNo=' + invoiceno)
  }
  savetransactiontonedb(transaction) {
    return this.http.post(this.dburl + 'addtransaction', transaction)
  }
  ///DENOMINATIONS
  fetchDenominationEntries(storeid, date) {
    return this.http.get(this.base_url + `Denomination/getDenomEntry?storeid=${storeid}&date=${date}`)
  }
  denominationTypes() {
    return this.http.get(this.base_url + `Denomination/GetDenominationTypes`)
  }
  addDenomEntry(denomentry) {
    return this.http.post(this.base_url + `Denomination/addDenomEntry`, denomentry)
  }
  getstorecashsales(storeid, companyid, date) {
    return this.http.get(this.base_url + `Receipt/getStoreCashSales?storeid=${storeid}&companyid=${companyid}&date=${date}`)
  }
  getOrderById(orderid) {
    return this.http.get(this.base_url + `POSOrder/getOrderById?orderid=` + orderid)
  }
  getUnfinishedOrders(storeid) {
    return this.http.get(this.base_url + `POSOrder/getUnfinishedOrders?storeid=` + storeid)
  }
  ///logging
  logerror(error) {
    return this.http.post(this.dburl + `logerror`, error)
  }

  logtransactions(transactions) {
    return this.http.post(this.dburl + `logtransactions`, transactions)
  }

  logorderevent(logdata) {
    return this.http.post(this.dburl + 'logorderevent', logdata)
  }

  logordersaveresponse(response_log_data) {
    return this.http.post(this.dburl + 'logorderevent', response_log_data)
  }
}