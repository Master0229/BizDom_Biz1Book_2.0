import { Component, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core'
import { NzFormatEmitEvent, NzTreeNodeOptions, NzTreeComponent } from 'ng-zorro-antd/tree'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from 'src/app/auth.service'
import { ActivatedRoute } from '@angular/router'
import { UrbanPipeService } from 'src/assets/dist/services/urban-pipe.service'

@Component({
  selector: 'app-urbanpiper',
  templateUrl: './urbanpiper.component.html',
  styleUrls: ['./urbanpiper.component.scss'],
})
export class UrbanpiperComponent implements OnInit {
  // Serach Filter Icon
  size = 'large'
  // TABS
  activeKey = 0

  // OLD POS

  data: any
  cat: any
  CompanyId = 0
  // StoreId: any;
  term
  p
  productType = [
    { Id: 1, Name: 'Veg' },
    { Id: 2, Name: 'Non-Veg' },
  ]
  OptionPrice = []
  ProductPrice = []
  op_loading: boolean = false
  pd_loading: boolean = false
  sync_loading: boolean = false
  loading: boolean = false
  catObj: {
    ref_id: any
    name: any
    description: string
    sort_order: number
    active: boolean
    translations: []
  }
  itemObj: {
    ref_id: string
    title: string
    available: boolean
    description: string
    price: number
    current_stock: number
    recommended: boolean
    food_type: number
    category_ref_ids: any[]
    img_url: string
    tags: object
    included_platforms: any
    translations: object[]
  }
  Option_groups: {
    ref_id: any
    title: string
    min_selectable: number
    max_selectable: number
    active: true
    item_ref_ids: any
  }
  response: any
  responsecode: any
  actionresponsemessage: Object
  stores: any
  upstoredata: any
  StoreId: any
  show: boolean = false
  errors: Array<any> = []
  Data
  qwerty = false
  BrandProducts = []
  Products = []
  searchterm
  tempstore

  @HostListener('document:click', ['$event']) ClickOutsideDirective($event) {
    var Id = $event.path[0].id
    var element = document.getElementById(Id)
    if (element != null) {
      element.focus()
    }
  }

  @ViewChild('nzTreeComponent') nzTreeComponent: NzTreeComponent
  @ViewChild('content') modal: TemplateRef<any>
  defaultCheckedKeys = ['10020']
  defaultSelectedKeys = ['10010']
  defaultExpandedKeys = ['100', '1001']

  nodes: NzTreeNodeOptions[] = [
    {
      title: 'Cakes 1 Kg + 1/2 Kg Extra Free',
      key: '100',
      children: [
        {
          title: 'Fresh Cream Cakes 1 Kg + (1/2 Kg Free)',
          key: '1001',
          children: [
            {
              title: 'Vanilla 1 KG + (1/2 KG Free)',

              icon: '<fa fa-dot-circle-o />',
              key: '10010',
              isLeaf: true,
            },

            {
              title: ' Black Forest 1 KG + (1/2 KG Free)',
              key: '10011',
              isLeaf: true,
            },
          ],
        },
      ],
    },
  ]
  inputValue: string
  options: string[] = []

  inputValueCustom: string
  optionsCustom: string[] = []

  onInput(value: string): void {
    this.options = value ? [value, value + value, value + value + value] : []
  }

  nzClick(event: NzFormatEmitEvent): void {
    console.log(event)
  }

  nzCheck(event: NzFormatEmitEvent): void {
    console.log(event)
  }

  constructor(
    private Auth: AuthService,
    private _avRoute: ActivatedRoute,
    private modalService: NgbModal,
    private ups: UrbanPipeService,
  ) {
    var logInfo = JSON.parse(localStorage.getItem("logInfo"));
    this.CompanyId = logInfo.CompanyId
    this.StoreId = logInfo.StoreId
    // this.ItemId = logInfo.StoreId;
  }

  // nzSelectedKeys change
  nzSelect(keys: string[]): void {
    console.log(keys, this.nzTreeComponent.getSelectedNodeList())
  }

  ngOnInit() {
    // this.loadScripts();
    // setHeightWidth();
    // this.GetUPProducts();
    this.GetProd()
    this.GetUPStores()
    this.upstoredetails()
    let element = document.getElementById('itemstab') as HTMLElement
    if (element != undefined) {
      element.click()
    }
  }

  // ngAfterViewInit(): void {
  //   // get node by key: '10011'
  //   // console.log(this.nzTreeComponent.getTreeNodeByKey('10011'))
  //   // use tree methods
  //   console.log(
  //     // this.nzTreeComponent.getTreeNodes(),
  //     this.nzTreeComponent.getCheckedNodeList(),
  //     this.nzTreeComponent.getSelectedNodeList(),
  //     this.nzTreeComponent.getExpandedNodeList(),
  //   )
  // }

  // OLD POS
  upstoredetails() {
    this.Auth.upstoredetails(this.StoreId, this.CompanyId).subscribe(data => {
      this.upstoredata = data
      // console.log(this.upstoredata);
      this.upstoredata.forEach(element => {
        if (element.BrandId == null) {
          element.BrandId = 0
        }
      })
      if (this.upstoredata == null) {
        this.show = false
      } else {
        this.show = true
        this.GetUPProducts()
      }
    })
  }

  GetUPProducts() {
    this.Auth.GetUPProducts(this.StoreId, this.CompanyId).subscribe(data => {
      console.log(data)
      var response: any = data
      var brands = []
      var proddata = []
      this.BrandProducts = []
      this.Products = response.Products
      response.Products.forEach(element => {
        if (brands.some(x => x.Id == element.BrandId)) {
          brands.filter(x => x.Id == element.BrandId)[0].products.push(element)
        } else {
          brands.push({ Id: element.BrandId, Name: element.Brand, products: [] })
          brands.filter(x => x.Id == element.BrandId)[0].products.push(element)
        }
      })
      console.log(brands)
      var categories = response.Categories.filter(
        x => x.ParentCategoryId == null && x.IsUPCategory == true,
      )
      categories.forEach(element => {
        element.show = true
        element.subcategories = response.Categories.filter(
          x => x.ParentCategoryId == element.Id && x.IsUPCategory == true,
        )
        element.subcategories.forEach(x => {
          x.show = true
        })
      })
      if (brands.length > 0) {
        brands.forEach(brand => {
          var obj = {
            BrandId: brand.Id,
            BrandName: brand.Name,
            categories: Object.assign([], categories),
          }
          //
          console.log(obj)
          this.BrandProducts.push(Object.assign({}, obj))
          console.log(document.getElementsByClassName('subcategory'))
        })
        var bp = this.BrandProducts.sort((a, b) => {
          return a.BrandId - b.BrandId
        })
        this.BrandProducts = bp
        if (this.tempstore == undefined) {
          this.tempstore = this.upstoredata.filter(
            x => x.BrandId == this.BrandProducts[0].BrandId,
          )[0]
        } else {
          this.tempstore = this.upstoredata.filter(x => x.BrandId == this.tempstore.BrandId)[0]
        }
        console.log(this.tempstore)
      }
      // console.log(JSON.stringify(this.BrandProducts));
      // console.log(JSON.stringify(response.Products));
    })
  }
  Headselect(value, catId, brandId) {
    this.BrandProducts.filter(x => x.BrandId == brandId)[0]
      .categories.filter(x => x.Id == catId)[0]
      .subcategories.forEach(element => {
        element.selected = value
        this.selectdeselect(value, element.Id, brandId)
      })
  }
  parentcatvisibility(parentcat, brandid) {
    var count = 0
    parentcat.subcategories.forEach(element => {
      count =
        count + this.Products.filter(x => x.CategoryId == element.Id && x.BrandId == brandid).length
    })
    return count
  }
  selectdeselect(value, catId, brandId) {
    console.log(value, catId, brandId)
    this.Products.filter(x => x.CategoryId == catId && x.BrandId == brandId).forEach(
      x => (x.selected = value),
    )
  }
  getproducts(categoryId, brandId) {
    var obj = []
    if (this.Products.length > 0) {
      obj = this.Products.filter(x => x.CategoryId == categoryId && x.BrandId == brandId)
    }
    return obj
  }
  getproductsbybrand(brandId) {
    var obj = []
    if (this.Products.length > 0) {
      obj = this.Products.filter(x => x.BrandId == brandId)
    }
    return obj
  }
  GetProd() {
    this.Auth.Getitem(this.StoreId, this.CompanyId).subscribe(data => {
      this.data = data
      // console.log(this.data);
      this.data.Products.forEach(element => {
        element.selected = false
        // element.UPPrice =false;
      })
      this.Data = this.data.Categories.filter(
        x => x.ParentCategoryId == null && x.IsUPCategory == true,
      )
      this.Data.forEach(element => {
        element.show = false
        element.subcategories = this.data.Categories.filter(x => x.ParentCategoryId == element.Id)
        element.subcategories.forEach(subcat => {
          subcat.products = this.data.Products.filter(x => x.CategoryId == subcat.Id)
          subcat.show = false
        })
      })
      console.log(this.Data)
      this.cat = this.data.Categories.filter(x => x.ParentCategoryId != null)
      this.data.Charges.forEach(element => {
        element.selected = false
      })
    })
  }
  GetUPStores() {
    this.Auth.urbandata(this.CompanyId).subscribe(data => {
      this.stores = data
    })
  }
  select(check) {
    if (check) {
      this.data.Products.forEach(element => {
        element.selected = true
      })
    } else {
      this.data.Products.forEach(element => {
        element.selected = false
      })
    }
  }
  selectCharge(check) {
    if (check) {
      this.data.Charges.forEach(element => {
        element.selected = true
      })
    } else {
      this.data.Charges.forEach(element => {
        element.selected = false
      })
    }
  }
  UpdateProdPrice() {
    if (this.ProductPrice.length > 0) {
      this.pd_loading = true
      this.Auth.UpdateProductUPPrice({ ProductData: JSON.stringify(this.ProductPrice) }).subscribe(
        data => {
          var response: any = data
          this.GetProd()
          this.ProductPrice = []
          this.pd_loading = false
          // (response.status == 200) ? toast(response.msg) : dangertoast(response.msg);
        },
      )
    } else {
      alert('No product price changed')
    }
  }
  UpdateOptionPrice() {
    if (this.OptionPrice.length > 0) {
      this.op_loading = true
      this.Auth.UpdateOptionUPPrice({ OptionData: JSON.stringify(this.OptionPrice) }).subscribe(
        data => {
          var response: any = data
          this.GetProd()
          this.OptionPrice = []
          this.op_loading = false
          // (response.status == 200) ? toast(response.msg) : dangertoast(response.msg);
        },
      )
    } else {
      alert('No option price is changed')
    }
  }
  optionGroup() {
    var array = []
    var optionGroups = []
    var obj = {
      ref_id: '',
      title: '',
      min_selectable: 0,
      max_selectable: 0,
      active: true,
      item_ref_ids: [],
    }
    // this.data.OptionGroups.forEach(element => {
    //   if (this.data.Products.some(x => x.ProductId === element.ProductId)) {
    //     obj = { ref_id: element.OptionGroupId.toString(), title: element.Name, min_selectable: element.MinimumSelectable, max_selectable: element.MaximumSelectable, active: true, item_ref_ids: [element.ProductId.toString()] };
    //     array.push(obj);
    //   }
    // });
    this.data.OptionGroups.forEach(element => {
      if (!array.some(x => x.ref_id === element.OptionGroupId.toString())) {
        obj = {
          ref_id: element.OptionGroupId.toString(),
          title: element.Name,
          min_selectable: element.MinimumSelectable,
          max_selectable: element.MaximumSelectable,
          active: true,
          item_ref_ids: [],
        }
        array.push(obj)
      }
      if (this.data.Products.some(x => x.ProductId === element.ProductId)) {
        array
          .filter(x => x.ref_id == element.OptionGroupId.toString())[0]
          .item_ref_ids.push(element.ProductId.toString())
      }
    })
    array.forEach(element => {
      if (element.item_ref_ids.length > 0) {
        optionGroups.push(element)
      }
    })
    return optionGroups
  }
  option() {
    var options = []
    // console.log(this.data.Options);
    var obj = {
      ref_id: '',
      title: '',
      description: '',
      Weight: 0,
      available: true,
      price: 0,
      food_type: 1,
      sold_at_store: true,
      opt_grp_ref_ids: [],
    }
    this.data.Options.forEach(element => {
      if (this.optionGroup().some(x => x.ref_id === element.OptionGroupId.toString())) {
        obj = {
          ref_id: element.OptionId.toString(),
          title: element.Name,
          description: '',
          Weight: 0,
          food_type: 1,
          sold_at_store: true,
          available: true,
          price: element.UPPrice,
          opt_grp_ref_ids: [element.OptionGroupId.toString()],
        }
        options.push(obj)
      }
    })
    return options
  }
  // Charges()
  // {
  //   var charges =[];
  //   var obj =
  //   this.data.Charges.forEach(element => {
  //     obj ={ref_id:element.Id.toString(),title:element.Description,description:"",active: true,
  //     structure: { type: "percentage", applicable_on: "item.quantity", value: "" },}
  //   });
  // }
  tax() {
    var taxes = []
    this.data.TaxGroups.forEach(element => {
      var products = this.data.Products.filter(x => x.TaxGroupId == element.Id)
      if (products.length > 0) {
        var prodIds = []
        products.forEach(element => {
          prodIds.push(element.ProductId)
        })
        var obj1 = {
          ref_id: this.StoreId + '-CGST-' + element.Tax1,
          title: 'CGST-' + element.Tax1,
          description: element.Tax1 + '% CGST on all items',
          active: true,
          structure: { type: 'percentage', applicable_on: 'item.price', value: element.Tax1 },
          item_ref_ids: prodIds,
        }
        taxes.push(obj1)
        var obj2 = {
          ref_id: this.StoreId + '-SGST-' + element.Tax1,
          title: 'SGST-' + element.Tax1,
          description: element.Tax2 + '% CGST on all items',
          active: true,
          structure: { type: 'percentage', applicable_on: 'item.price', value: element.Tax2 },
          item_ref_ids: prodIds,
        }
        taxes.push(obj2)
      }
    })
    return taxes
  }
  // syncHighlight() {
  //   // var catObj = {ref_id:"",name:"",description:"",sort_order:1,active:true}
  //   var category = [];
  //   var items = [];
  //   // var optiongp = [];
  //   this.data.Products.forEach(element => {
  //     if (!element.IsSynced) {
  //       if (!category.some(x => x.ref_id === element.CategoryId)) {
  //         this.catObj = { ref_id: element.CategoryId, name: element.Category, description: element.Category + "is a good category", sort_order: 1, active: true };
  //         category.push(this.catObj);
  //       }
  //       this.itemObj = { ref_id: element.ProductId, title: element.Description, available: true, description: element.Description + " is healthy", price: element.UPPrice, current_stock: -1, recommended: true, food_type: element.ProductTypeId, category_ref_ids: [element.CategoryId.toString()] };
  //       items.push(this.itemObj);
  //     }
  //   });
  //   var data = { categories: category, items: items, option_groups: this.optionGroup(), options: this.option(), taxes: this.tax(), charges: this.charge() };
  //   // console.log(data);
  //   this.Auth.catalogue({ catalogue: JSON.stringify(data) }, this.StoreId).subscribe(data => {
  //     alert(JSON.stringify(data));
  //   });
  // }
  charge() {
    var charges = []
    this.data.Charges.forEach(element => {
      var obj = {
        ref_id: this.StoreId + '-' + element.Description.match(/\b(\w)/g).join('') + '-' + 1,
        title: element.Description,
        description: element.Description,
        active: true,
        structure: {
          type: 'fixed',
          applicable_on: 'item.quantity',
          value: element.ChargeValue,
        },
        fulfillment_modes: element.Description.includes('Delivery')
          ? ['delivery']
          : ['delivery', 'pickup'],
        excluded_platforms: [],
        item_ref_ids: [],
      }
      this.data.Products.forEach(element => {
        obj.item_ref_ids.push(element.ProductId)
      })
      charges.push(obj)
    })
    return charges
  }
  syncCharge() {
    this.data.Charges.foreach(element => {})
  }
  selectval() {
    if (this.data.Products.some(x => x.selected == true)) {
      return true
    } else {
      return false
    }
  }
  includedplatforms() {
    var platforms = []
    var obj = this.stores.filter(x => x.StoreId == this.StoreId)[0]
    for (var o in obj) {
      if (obj[o] == true && !o.includes('Is')) {
        platforms.push(o.toLowerCase())
      }
    }
    return platforms
  }
  sync() {
    var category = []
    var items = []
    // var optiongp = [];
    this.sync_loading = true
    this.data.Products.forEach(element => {
      // console.log("hi")
      if (element.UPenabled) {
        if (!category.some(x => x.ref_id === element.CategoryId.toString())) {
          var subcategory = this.data.Categories.filter(x => x.Id == element.CategoryId)[0]
          var parentcategory = this.data.Categories.filter(
            x => x.Id == subcategory.ParentCategoryId,
          )[0]
          var catObj = {
            ref_id: element.CategoryId.toString(),
            name: element.Category.replace('**', ''),
            description: element.Category.replace('**', ''),
            sort_order: 1,
            active: true,
            translations: [],
            parent_ref_id: subcategory.ParentCategoryId.toString(),
          }
          var parentcatobj = {
            ref_id: parentcategory.Id.toString(),
            name: parentcategory.Description.replace('**', ''),
            description: parentcategory.Description.replace('**', ''),
            sort_order: -1,
            active: true,
            translations: [],
          }
          category.push(catObj)
          if (!category.some(x => x.ref_id === parentcatobj.ref_id)) {
            category.push(parentcatobj)
          }
        }
        this.itemObj = {
          ref_id: element.ProductId,
          title: element.Name.replace('**', ''),
          available: element.Available,
          description: element.Description.replace('**', ''),
          price: element.UPPrice,
          current_stock: -1,
          recommended: element.ImgUrl != null || element.ImgUrl != '' ? true : false,
          food_type: element.ProductTypeId,
          category_ref_ids: [element.CategoryId.toString()],
          img_url: element.ImgUrl,
          tags: {},
          included_platforms: this.includedplatforms(),
          translations: [],
        }
        if (this.itemObj.img_url == null || this.itemObj.img_url == '') {
          delete this.itemObj['img_url']
        }
        items.push(this.itemObj)
      }
    })
    var data = {
      categories: category,
      flush_items: true,
      items: items,
      flush_option_groups: true,
      option_groups: this.optionGroup(),
      flush_options: true,
      options: this.option(),
      taxes: this.tax(),
    }
    // console.log(JSON.stringify(data));
    // return;
    // this.loading = true;
    this.Auth.catalogue({ catalogue: JSON.stringify(data) }, this.StoreId).subscribe(
      data => {
        // alert(JSON.stringify(data));
        var response: any = data
        this.sync_loading = false
        var button = document.createElement('button')
        button.setAttribute('data-toggle', 'modal')
        button.setAttribute('data-target', '#message')
        button.setAttribute('data-backdrop', 'static')
        button.hidden = true
        document.body.appendChild(button)
        button.click()
        this.response = response.message
        this.responsecode = response.StatusCode
        this.loading = false
      },
      error => {
        // console.log(error);
        this.loading = false
      },
    )
  }
  stockData() {
    var items = []
    if (!this.data.Products.some(x => x.selected === true)) {
      var button = document.createElement('button')
      button.setAttribute('data-toggle', 'modal')
      button.setAttribute('data-target', '#error')
      button.setAttribute('data-backdrop', 'static')
      button.hidden = true
      document.body.appendChild(button)
      button.click()
      return
    }
    this.data.Products.forEach(element => {
      if (element.selected == true) {
        items.push(element.ProductId)
      }
    })
    var data = { location_ref_id: this.StoreId.toString(), item_ref_ids: items, action: '' }
    return data
  }
  enable_disable(action) {
    var data = { action: action, products: [] }
    if (!this.data.Products.some(x => x.selected === true)) {
      var button = document.createElement('button')
      button.setAttribute('data-toggle', 'modal')
      button.setAttribute('data-target', '#error')
      button.setAttribute('data-backdrop', 'static')
      button.hidden = true
      document.body.appendChild(button)
      button.click()
      return
    }
    this.data.Products.forEach(element => {
      if (element.selected == true) {
        data.products.push(element.Id)
      }
    })
    this.Auth.storeitemaction({ pddata: JSON.stringify(data) }).subscribe(data => {
      this.GetProd()
      // toast(`Item(s) ${action}ed`)
    })
  }
  outStock() {
    var data = this.stockData()
    // this.loading = true;
    data.action = 'disable'
    // console.log(data);
    this.Auth.items({ stock: JSON.stringify(data) }, this.CompanyId).subscribe(
      data => {
        var button = document.createElement('button')
        button.setAttribute('data-toggle', 'modal')
        button.setAttribute('data-target', '#actionresponse')
        button.setAttribute('data-backdrop', 'static')
        button.hidden = true
        document.body.appendChild(button)
        button.click()
        this.actionresponsemessage = data['message']
        this.GetProd()
        this.loading = false
      },
      error => {
        // console.log(error);
        this.loading = false
      },
    )
  }
  inStock() {
    var data = this.stockData()
    // this.loading = true;
    data.action = 'enable'
    // console.log(data);
    this.Auth.items({ stock: JSON.stringify(data) }, this.CompanyId).subscribe(
      data => {
        var button = document.createElement('button')
        button.setAttribute('data-toggle', 'modal')
        button.setAttribute('data-target', '#actionresponse')
        button.setAttribute('data-backdrop', 'static')
        button.hidden = true
        document.body.appendChild(button)
        button.click()
        this.actionresponsemessage = data['message']
        this.GetProd()
        this.loading = false
      },
      error => {
        // console.log(error);
        this.loading = false
      },
    )
  }
  openDetailpopup(contentDetail) {
    const modalRef = this.modalService
      .open(contentDetail, {
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
      })
      .result.then(
        result => {
          //this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },
      )
    //var userid = this.userid;
  }
  OptionArray(Id, Price) {
    this.OptionPrice.push({ Id: Id, Price })
  }
  ProductArray(Id, Price) {
    this.ProductPrice.push({ Id: Id, Price })
  }
  storeaction(brandid, platform, bool) {
    // console.log(platform, action);
    var action = bool ? 'enable' : 'disable'
    this.errors = []
    var payload = [
      {
        location_ref_id: brandid != 0 ? brandid + '-' + this.StoreId : this.StoreId,
        platforms: [platform],
        action: action,
      },
    ]
    this.Auth.storeAction({ value: JSON.stringify(payload) }).subscribe(data => {
      var response: any = data
      response.forEach(element => {
        if (element.status == 'error') {
          element.message = element.message.replace(
            /Location/gi,
            this.upstoredata.filter(x => x.BrandId == brandid)[0].LocationName + ' is',
          )
          // dangertoast(element.message)
          // console.log(element);
          // this.errors.push(element);
        } else {
          element.message = `Action for the store '${
            this.upstoredata.filter(x => x.BrandId == brandid)[0].LocationName
          }' is completed successfully!`
          // toast(element.message)
          // console.log(element);
          // this.errors.push(element);
        }
      })
      // console.log(this.errors);
      this.upstoredetails()
      // if (this.errors.length > 0) {
      //   var button = document.createElement('button');
      //   button.setAttribute('data-toggle', 'modal');
      //   button.setAttribute('data-target', '#errors1');
      //   button.setAttribute('data-backdrop', 'static');
      //   button.hidden = true;
      //   document.body.appendChild(button);
      //   button.click();
      // }
    })
  }
  toggle(category) {
    console.log(category)
    if (category.show) {
      category.show = false
    } else {
      category.show = true
    }
  }
  toggleSubcat(category) {
    console.log(category)
    if (category.show) {
      category.show = false
    } else {
      category.show = true
    }
  }
  payload(action, brandid) {
    if (!this.Products.some(x => x.selected === true && x.BrandId == brandid)) {
      var button = document.createElement('button')
      button.setAttribute('data-toggle', 'modal')
      button.setAttribute('data-target', '#error')
      button.setAttribute('data-backdrop', 'static')
      button.hidden = true
      document.body.appendChild(button)
      button.click()
      return
    }
    var storeId = this.StoreId.toString()
    if (brandid > 0) {
      storeId = brandid + '-' + this.StoreId
    }
    var data = { location_ref_id: storeId, item_ref_ids: [], action: action }
    this.Products.forEach(element => {
      if (element.selected == true && element.BrandId == brandid) {
        data.item_ref_ids.push(element.ProductId)
      }
    })
    return data
  }
  itemactionresponse
  enabledisable(action, brandid) {
    var data = this.payload(action, brandid)
    console.log(data)
    if (data != undefined) {
      this.Auth.items({ stock: JSON.stringify(data) }, this.CompanyId).subscribe(
        data => {
          // var button = document.createElement('button')
          // button.setAttribute('data-toggle', 'modal')
          // button.setAttribute('data-target', '#actionresponse')
          // button.setAttribute('data-backdrop', 'static')
          // button.hidden = true
          // document.body.appendChild(button)
          // button.click()
          this.itemactionresponse = JSON.parse(data['message'])
          this.responsecode = data["status"]
          this.actionresponsemessage = data['message']
          console.log(this.actionresponsemessage)
          this.GetUPProducts()
          this.loading = false
          this.modalService.open(this.modal)
        },
        error => {
          // console.log(error);
          this.loading = false
        },
      )
    }
  }
  indeterminate(catid, pcatid, brandid) {
    var obj = this.Products.filter(x => x.CategoryId == catid && x.BrandId == brandid)
    console.log(obj)
    var every = obj.every(x => x.selected == true)
    var some = obj.some(x => x.selected == true)
    if (!every && some) {
      document.getElementById('sub-' + catid + '-' + brandid)['indeterminate'] = true
      document.getElementById('sub-' + catid + '-' + brandid)['checked'] = false
    }
    if (every) {
      document.getElementById('sub-' + catid + '-' + brandid)['checked'] = true
      document.getElementById('sub-' + catid + '-' + brandid)['indeterminate'] = false
    }
    if (!some) {
      document.getElementById('sub-' + catid + '-' + brandid)['checked'] = false
      document.getElementById('sub-' + catid + '-' + brandid)['indeterminate'] = false
    }
  }
  search(text, brandid) {
    this.Products.forEach(product => {
      if (
        product.Description.toLowerCase().includes(text.toLowerCase()) &&
        product.BrandId == brandid
      ) {
        console.log(product.Description)
        this.BrandProducts.forEach(x => {
          if (x.BrandId == brandid) {
            x.categories.forEach(element => {
              element.show = false
              element.subcategories.forEach(sub => {
                sub.show = false
                if (sub.Id == product.CategoryId) {
                  sub.show = true
                  element.show = true
                }
              })
            })
          }
        })
      }
    })
  }
  contains(product) {
    console.log(this.searchterm)
    if (
      product.toLowerCase().includes(this.searchterm.toLowerCase()) &&
      this.searchterm != ('' && undefined && null)
    ) {
      return true
    } else {
      return false
    }
  }
  // loadScripts() {
  //   const dynamicScripts = [
  //     // "../../../assets/dist/js/dropdown-bootstrap-extended.js"//src\assets\dist\js\dropdown-bootstrap-extended.js
  //   ];
  //   for (let i = 0; i < dynamicScripts.length; i++) {
  //     const node = document.createElement("script");
  //     node.src = dynamicScripts[i];
  //     node.type = "text/javascript";
  //     node.async = false;
  //     node.charset = "utf-8";
  //     document.getElementsByTagName("head")[0].appendChild(node);
  //   }
  // }
  console(e) {
    // console.log(this.BrandProducts[e.index])
    console.log(e)

    this.tempstore = this.upstoredata.filter(x => x.BrandId == this.BrandProducts[e].BrandId)[0]
    console.log(this.tempstore)
  }

  // TABS

  changeKey(key) {
    this.activeKey = key
  }
}
