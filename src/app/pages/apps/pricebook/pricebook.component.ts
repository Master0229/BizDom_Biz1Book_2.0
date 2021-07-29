import { Component, OnInit, HostListener } from '@angular/core';
import { AuthService } from '../../../auth.service';


@Component({
  selector: 'app-pricebook',
  templateUrl: './pricebook.component.html',
  styleUrls: ['./pricebook.component.scss']
})
export class PricebookComponent implements OnInit {

  activeKey = 0
  StoreId: any;
  Pricedata: any;
  show = false;
  CompanyId: any;
  p;
  p1;
  term: string;
  datachange: boolean = false;
  products = [];
  masterdata = [];
  options = [];
  @HostListener('document:click', ['$event']) ClickOutsideDirective($event) {
    var Id = $event.path[0].Id
    var element = document.getElementById(Id);
    if (element != null) {
      element.focus();
    }
  }
  editCache: { [key: string]: any } = {}


  startEdit(id: string): void {
    this.editCache[id].edit = true
  }

  cancelEdit(id: string): void {
    const index = this.products.findIndex(item => item.Id === id)
    this.editCache[id] = {
      data: { ...this.products[index] },
      edit: false,
    }
  }

  saveEdit(id: string): void {
    const index = this.products.findIndex(item => item.Id === id)
    Object.assign(this.products[index], this.editCache[id].data)
    var postdata = { data: JSON.stringify(this.products.filter(item => item.Id === id)) };
    this.Auth.Updatepricebook(postdata).subscribe(data => {
      this.editCache[id].edit = false
      var response: any = data;
      this.GetPrice();
    });
  }

  constructor(private Auth: AuthService) {
    var logInfo = JSON.parse(localStorage.getItem("logInfo"));
    this.CompanyId = logInfo.CompanyId;
    this.StoreId = logInfo.StoreId;
  }
  canDeactivate(): boolean {
    return !this.datachange;
  }
  ngOnInit() {

    this.GetPrice();
  }
  GetPrice() {
    this.Auth.GetPrice(this.StoreId).subscribe(data => {
      this.Pricedata = data;
      console.log(this.Pricedata);
      this.Pricedata.streprd.forEach(element => {
        element.priceE = false;
        element.delpriceE = false;
        element.takpriceE = false;
        element.Changed = false;
      });
      this.products = this.Pricedata.streprd;
      this.masterdata = this.Pricedata.streprd;
      this.options = this.Pricedata.streopt;
      this.updateEditCache(0)
      console.log(this.Pricedata);
    })
  }
  SavePrd() {
    var arr = this.Pricedata.streprd.filter(x => x.Changed == true)
    var postdata = { data: JSON.stringify(arr) };
    this.Auth.Updatepricebook(postdata).subscribe(data => {
      var response: any = data;
      this.GetPrice();
      if (response.status == 200) {
        //   console.log(toast(response.msg));
        // } else if (response.status == 0) {
        //   console.log(dangertoast(response.msg));
      }
      this.datachange = false;
    });
  }
  // savePrice(item)
  // {
  //   console.log(item);
  //   var postdata = { data: JSON.stringify(item) };
  //   this.Auth.Updatepricebook(postdata).subscribe(data=>{})
  // }
  saveOpt() {
    var arr = this.Pricedata.streopt.filter(x => x.Changed == true)
    var postdata = { data: JSON.stringify(arr) };
    this.Auth.Updateoptionbook(postdata).subscribe(data => {
      var response: any = data;
      if (response.status == 200) {
        // console.log(toast(response.msg));
        // } else if (response.status == 0) {
        // console.log(dangertoast(response.msg));
      }
    });
  }
  focus() {
    // var Id = price+id;
    console.log(document.getElementById('myTabContent'));
    document.getElementById("Price1056").focus();
  }
  changeKey(key) {
    this.updateEditCache(key);
    this.activeKey = key
  }
  updateEditCache(key): void {
    if (key == 0) {
      this.products.forEach(item => {
        this.editCache[item.Id] = {
          edit: false,
          data: { ...item },
        }
      })
    } else if (key == 1) {
      this.options.forEach(item => {
        this.editCache[item.Id] = {
          edit: false,
          data: { ...item },
        }
      })
    }
  }
  timeout: any = null;
  private onKeySearch() {
    clearTimeout(this.timeout);
    var $this = this;
    this.timeout = setTimeout(function () {
      $this.search();
    }, 500);
  }
  search() {
    if (this.term == '' || this.term == null) {
      this.products = this.masterdata
    } else {
      this.products = this.masterdata.filter(x => x.Description.toLowerCase().includes(this.term.toLowerCase()));
    }
  }
}