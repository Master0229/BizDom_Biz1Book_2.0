import { Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild } from '@angular/core'
import {
  OrderModule,
  OrderItemModule,
  CurrentItemModule,
  KOTModule,
  Transaction,
  AdditionalCharge,
} from './order.module'
import {
  NgbModal,
  ModalDismissReasons,
  NgbTypeahead,
  NgbDate,
  NgbCalendar,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap'
import { AuthService } from '../../../auth.service'
import { NzModalService } from 'ng-zorro-antd/modal'
import * as _ from 'lodash'
import { ElectronService } from 'ngx-electron'
import { SignalRService } from '../../../services/signal-r/signal-r.service'
import { fromEvent, merge, Observable, Observer, Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators'
import { PrintService } from 'src/app/services/print/print.service'
import * as moment from 'moment'
import { SyncService } from 'src/app/services/sync/sync.service'
import { timer } from 'rxjs'
import { NotificationService } from 'src/app/services/notification/notification.service'
import { EventService } from 'src/app/services/event/event.service'
import { io } from 'socket.io-client';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  // Autocomplete
  @ViewChild('quantityref', { static: false }) private QuantityRef: ElementRef
  @ViewChild('instance', { static: true }) instance: NgbTypeahead
  @ViewChild('au', { static: true }) autocompleteref: ElementRef
  @ViewChild('viewordermodal', { static: true }) viewordermodal: ElementRef
  @ViewChild('split_payment_modal', { static: true }) split_payment_modal: ElementRef
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == "F9") {
      var order = JSON.parse(localStorage.getItem('lastorder'))
      if (order && order.InvoiceNo)
        this.printreceiptbyorder(order)
    }
  }
  focus$ = new Subject<string>()
  click$ = new Subject<string>()
  // Take Away Filter
  takawayinput: string
  // Date Picker Take Away
  dateRange = []
  stores = []
  // Drawer Take Away
  visible = false

  // Auto complete+
  inputValue: string
  options: string[] = []
  // Modal for Order edit
  isVisible = false
  // Dine In Select Table
  listOfOption: Array<{ label: string; value: string }> = []
  size = 'default'
  selectedValue = 'gf'
  // OLD POS Auto Complete
  autocompletevalidation: boolean = true
  typeheadSelected: any
  public model: any = ''
  // OLD POS ITEM
  item: any = []
  // OLD POS
  KOTNo: any
  locKOTNo: any
  paymentTypes: any = []
  order: OrderModule
  categories: any = []
  parentcategories = []
  childcategories = []
  nodesFiles = [
    {
      title: 'All',
      key: '100',
      expanded: false,
    },
  ]
  onlinestatusid = [-1]
  activeKey = 0
  products: any = []
  selectedcategoryid = 0
  public show: boolean = false
  public buttonName: any = 'Back'
  autocompleteproducts = []
  hide = true
  cards = [
    { name: 'Quick Order', ordertypeid: 5, class: 'bg-success', icon: 'fe fe-zap' },
    { name: 'Dine In', ordertypeid: 1, class: 'bg-primary', icon: 'fa fa-cutlery' },
    { name: 'Take Away', ordertypeid: 2, class: 'bg-warning', icon: 'fe fe-briefcase' },
    { name: 'Delivery', ordertypeid: 3, class: 'bg-gray-6', icon: 'fa fa-send-o' },
    { name: 'Pick Up', ordertypeid: 4, class: 'bg-red', icon: 'fa fa-truck' },
    { name: 'Online Orders', ordertypeid: 6, class: 'bg-dark', icon: 'fe fe-globe' },
  ]
  orderpageid = 0
  sectionid = 0
  orderkey = { orderno: 1, kotno: 1, timestamp: 0, GSTno: '' }
  preorders: any = []
  deliveryorders = []
  pickuporders = []
  // Online Orders
  onlineorders: any = []
  onlineorderscount = {
    placed: 0,
    inprogress: 0,
    completed: 0,
    cancelled: 0,
  }
  cancellationmessage = ''
  cancelreasons = [
    { id: 1, message: 'item_out_of_stock' },
    { id: 2, message: 'store_closed' },
    { id: 3, message: 'store_busy' },
    { id: 4, message: 'rider_not_available' },
    { id: 5, message: 'out_of_delivery_radius' },
    { id: 6, message: 'connectivity_issue' },
    { id: 7, message: 'total_missmatch' },
    { id: 8, message: 'invalid_item' },
    { id: 9, message: 'option_out_of_stock' },
    { id: 10, message: 'invalid_option' },
    { id: 11, message: 'unspecified' },
  ]
  cancelreason = { id: 1, message: 'item_out_of_stock' }
  tempkotobj = null
  charges = []
  diningareas = []
  diningtables = []
  loginfo
  deliverydate
  deliverytime
  socket: any;
  printersettings = { receiptprinter: '', kotprinter: '' }
  printhtmlstyle = `
  <style>
    #printelement {
      width: 270px;
    }
    .header {
        text-align: center;
    }
    .item-table {
        width: 100%;
    }
    .text-right {
      text-align: right!important;
    }
    .text-left {
      text-align: left!important;
    }
    .text-center {
      text-align: center!important;
    }
    tr.nb, thead.nb {
        border-top: 0px;
        border-bottom: 0px;
    }
    table, p, h3 {
      empty-cells: inherit;
      font-family: Helvetica;
      font-size: small;
      width: 290px;
      padding-left: 0px;
      border-collapse: collapse;
    }
    table, tr, td {
      border-bottom: 0;
    }
    hr {
      border-top: 1px dashed black;
    }
    tr.bt {
      border-top: 1px dashed black;
      border-bottom: 0px;
    }
    tr {
      padding-top: -5px;
    }
  </style>`
  orderstatus = {
    '-1': { name: 'Cancelled' },
    '0': { name: 'Placed' },
    '1': { name: 'Accepted' },
    '2': { name: 'Preparing' },
    '3': { name: 'Food Ready' },
    '4': { name: 'Dispatched' },
    '5': { name: 'Delivered' },
  }
  user: any
  tableorders: Array<OrderModule> = []
  isOnlineserv: Observable<boolean>
  isOnline: boolean
  ////////////////DATE RANGE PICKER///////////////
  hoveredDate: NgbDate | null = null
  fromDate: NgbDate | null = null
  toDate: NgbDate | null = null
  daterangeshow: string = ''
  datefilterfield = ''
  ordercount = {
    '2': { '-5': 0, '5': 0, '-1': 0, '-2': 0 },
    '3': { '-5': 0, '5': 0, '-1': 0, '-2': 0 },
    '4': { '-5': 0, '5': 0, '-1': 0, '-2': 0 },
  }
  transactionlist: Array<Transaction> = null
  issplitpayment: boolean = false
  splitpaymenttotal = 0
  customerdetaildrawer = false
  printcount = 1
  closeorder: boolean = false
  sortstatus = {
    OrderNo: 0,
    customer: 0,
    OrderedDateTime: 0,
    DeliveryDateTime: 0,
    BillAmount: 0,
    OrderStatusId: 0
  }
  refreshlist = true
  constructor(
    private modalService: NgbModal,
    private auth: AuthService,
    private modalService1: NzModalService, // private electronservice: ElectronService,
    private signal_r: SignalRService,
    private printservice: PrintService,
    private sync: SyncService,
    private notification: NotificationService,
    private event: EventService,
    private calendar: NgbCalendar,
    public dFormatter: NgbDateParserFormatter,
  ) {
    // this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    var obj = JSON.parse(localStorage.getItem('logInfo'))
    this.StoreId = obj.StoreId
    this.CompanyId = obj.CompanyId
    this.isOnlineserv = merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine)
        sub.complete()
      }),
    )
  }
  currentDiningArea = { Id: 0, DiningArea: 'Loading...' }
  tablefilterid = -1
  currenttimestamp: number = new Date().getTime()
  orderstatusfilterid: number = -5
  ordersearchterm: string = ''
  statusbtns = []
  ngOnInit(): void {
    this.isOnlineserv.subscribe(data => {
      console.log(data)
      this.isOnline = data
      this.event.emitNotif({ networkstatus: this.isOnline })
    })
    this.event.notify().subscribe(data => {
      console.log('PREORDER UPDATE EVENT EMIT', data)
      if (data.hasOwnProperty('newerrororder')) {
        this.getpreorders()
      }
    })
    // console.log(this.currenttimestamp)
    const numbers = timer(3000, 1000)
    numbers.subscribe(x => {
      this.currenttimestamp = new Date().getTime()
      // // console.log()
    })
    // this.getcategories()
    // this.getproducts()
    // this.getPaymentTypes()
    // // console.log("TEST MOMENT",moment(23808892).format('mm:ss A'))
    this.getdata()
    this.setsignalrconfig()
    this.sync.sync()
    // this.socketConfig()
  }
  socketConfig() {
    var socketserverurl = "http://192.168.1.6:5000"
    var socket = io(socketserverurl)
    socket.on('connect', () => {
      socket.emit('join', { usertype: 'exe' });
    })

    socket.on('new_order', data => {
      if (data == 1) {
        this.gettblorders()
      }
    })
  }
  changeKey(key) {
    this.activeKey = key
  }
  preptimecheck = 0
  sortpreorders(field) {
    Object.keys(this.sortstatus).forEach(key => {
      if (key == field) {
        this.sortstatus[field] == 0 ? this.sortstatus[field] = 1 : this.sortstatus[field] == 1 ? this.sortstatus[field] = -1 : this.sortstatus[field] = 1
      } else {
        this.sortstatus[key] = 0
      }
    })
    console.log(field, this.sortstatus[field])
    if (this.sortstatus[field] == 1) {
      this.preorders = this.preorders.sort((a, b) => (a[field] > b[field] ? 1 : b[field] > a[field] ? -1 : 0))
    } else if (this.sortstatus[field] == -1) {
      this.preorders = this.preorders.sort((a, b) => (a[field] > b[field] ? -1 : b[field] > a[field] ? 1 : 0))
    }
    this.refreshlist = !this.refreshlist
    console.log(this.preorders[0].OrderNo)
  }
  getdata() {
    this.auth
      .getdbdata([
        'product',
        'category',
        'orderkey',
        'paymenttypes',
        'additionalcharges',
        'loginfo',
        'printersettings',
        'diningarea',
        'diningtable',
        'preorders',
        'user',
        'tableorders',
        'stores',
        'orderstatusbtns',
      ])
      .subscribe(data => {
        // console.log(data)
        this.paymentTypes = data['paymenttypes']
        this.products = data['product']
        this.categories = data['category']
        this.charges = data['additionalcharges']
        this.loginfo = data['loginfo'][0]
        this.orderkey = data['orderkey'][0]
        this.printersettings = data['printersettings'][0]
        this.diningareas = data['diningarea']
        this.diningtables = data['diningtable']
        this.preorders = data['preorders']
        this.user = data['user']
        this.statusbtns = data['orderstatusbtns']
        this.stores = data['stores'].sort((a, b) => (a.Name > b.Name ? 1 : -1))
        this.diningareas = this.diningareas.sort((a, b) => (a.Id > b.Id ? 1 : b.Id > a.Id ? -1 : 0))
        this.diningtables = this.diningtables.sort((a, b) =>
          a.TableKey > b.TableKey ? 1 : b.TableKey > a.TableKey ? -1 : 0,
        )
        this.currentDiningArea = this.diningareas[0]
        this.tableorders = data['tableorders']
        this.diningtables.forEach(tbl => {
          if (this.tableorders.some(x => x.diningtablekey == tbl.TableKey)) {
            // console.log(tbl.TableName)
            tbl.TableStatusId = 1
          } else {
            tbl.TableStatusId = 0
          }
        })
        this.preptimecheck = 1 / (this.loginfo.FoodPrepTime * 10)
        // this.currentfloor.name = this.diningareas[0].DiningArea
        // this.currentfloor.id = this.diningareas[0].Id
        var todate = new Date().getDate()
        var orderkeydate = new Date(this.orderkey.timestamp).getDate()
        if (orderkeydate != todate) {
          // console.log("new day!")
          this.orderkey.kotno = 1
          this.orderkey.orderno = 1
          this.orderkey.timestamp = new Date().getTime()
          this.auth.updateorderkey(this.orderkey).subscribe(d => { })
        }
        this.ordercount = {
          '2': { '-5': 0, '5': 0, '-1': 0, '-2': 0 },
          '3': { '-5': 0, '5': 0, '-1': 0, '-2': 0 },
          '4': { '-5': 0, '5': 0, '-1': 0, '-2': 0 },
        }
        this.preorders.forEach(order => {
          order.status_name = this.orderstatus[order.OrderStatusId].name
          order.deliverytimestamp = order.DeliveryDateTime
            ? new Date(order.DeliveryDateTime).getTime()
            : 0
          if (
            order.OrderStatusId == 5 &&
            (!order.DeliveryStoreId || order.StoreId == order.DeliveryStoreId)
          )
            this.ordercount[order.OrderTypeId.toString()]['5']++
          else if (
            order.OrderStatusId == -1 &&
            (!order.DeliveryStoreId || order.StoreId == order.DeliveryStoreId)
          )
            this.ordercount[order.OrderTypeId.toString()]['-1']++
          else if (!order.DeliveryStoreId || order.StoreId == order.DeliveryStoreId)
            this.ordercount[order.OrderTypeId.toString()]['-5']++
          else if (order.DeliveryStoreId && order.StoreId != order.DeliveryStoreId)
            this.ordercount[order.OrderTypeId.toString()]['-2']++
          // console.log(this.orderstatus[order.OrderStatusId].name)
        })
        this.preorders.sort((a, b) => {
          return new Date(a.DeliveryDateTime).getTime() - new Date(b.DeliveryDateTime).getTime()
        })
        this.parentcategories = this.categories.filter(x => x.ParentId == 0)
        this.childcategories = this.categories.filter(x => x.ParentId != 0)
      })
  }
  setpayment(paymenttypeid) {
    this.order.StorePaymentTypeId = paymenttypeid
    this.order.PaidAmount = this.order.BillAmount
    // console.log(this.deliverydate, this.deliverytime)
    // console.log(moment(this.deliverydate + ' ' + this.deliverytime).format('YYYY-MM-DD HH:MM A'))
  }
  //Hide and Show toggle
  getcategories() {
    // this.categories = JSON.parse(localStorage.getItem('Category'))
    this.auth.getcategories().subscribe(data => {
      this.categories = data
      this.parentcategories = this.categories.filter(x => x.ParentId == 0)
      this.childcategories = this.categories.filter(x => x.ParentId != 0)
    })
  }
  getproducts() {
    // this.products = JSON.parse(localStorage.getItem('Product'))

    this.auth.getproducts().subscribe(data => {
      this.products = data
    })
  }
  toggle() {
    this.show = !this.show
    if (this.show) this.buttonName = 'Back'
    else this.buttonName = 'Back'
  }
  orderlogging(eventname) {
    var logdata = {
      event: eventname,
      orderjson: JSON.stringify(this.order),
      ordertypeid: this.order.OrderTypeId,
      orderno: this.orderkey.orderno,
      kotno: this.orderkey.kotno,
      timestamp: new Date().getTime(),
    }
    this.auth.logorderevent(logdata).subscribe(data => { })
  }
  createorder(ordertypeid) {
    this.order = new OrderModule(ordertypeid)
    this.order.createdtimestamp = new Date().getTime()
    this.charges.forEach(charge => {
      this.order.additionalchargearray.push(new AdditionalCharge(charge))
    })
    if (![2, 3, 4].includes(this.order.OrderTypeId)) {
      this.order.additionalchargearray.forEach(charge => {
        charge.selected = false
      })
    }
    this.order.StoreId = this.loginfo.StoreId
    // this.order.DeliveryStoreId = this.loginfo.StoreId
    this.orderlogging('create_order')
    this.show = false
    this.sectionid = 2
    if (this.order.IsAdvanceOrder || this.order.OrderTypeId == 2) {
      this.deliverydate = moment().format('YYYY-MM-DD')
      this.deliverytime = moment().format('HH:MM')
    }
  }
  editorder(order: OrderModule) {
    this.order = new OrderModule(order.OrderTypeId)
    for (var k in order) this.order[k] = order[k]
    this.orderlogging('edit_order')
    this.auth.getpreorderby_id(order['_id']).subscribe(data => {
      this.order.OrderId = data['OrderId']
      this.show = false
      this.sectionid = 2
      // console.log(this.order)
    })
  }
  createtableorder(tableid, tablekey) {
    this.order = new OrderModule(1)
    if (this.tableorders.some(x => x.diningtablekey == tablekey)) {
      this.orderlogging('edit_table_order')
      var tableorder = this.tableorders.filter(x => x.diningtablekey == tablekey)[0]
      for (var k in tableorder) this.order[k] = tableorder[k]
    } else {
      this.orderlogging('create_table_order')
      this.order.OrderName =
        `DI/${this.currentDiningArea.DiningArea}/` +
        this.diningtables.filter(x => x.TableKey == tablekey)[0].TableName
      this.order.DiningTableId = tableid
      this.order.diningtablekey = tablekey
      this.savetblorder()
    }
    this.show = false
    this.sectionid = 2
  }
  splittable(tableid) {
    var lastsplittableid = +this.getavailablesplitid(tableid)
    var parentTable = this.diningtables.filter(x => x.Id == tableid)[0]
    var table = {
      Id: parentTable.Id,
      DiningAreaId: parentTable.DiningAreaId,
      TableKey: parentTable.TableKey + '_' + (lastsplittableid + 1),
      TableName: '',
      TableStatusId: 0,
    }
    table.TableName = parentTable.TableName + '/' + String.fromCharCode(65 + lastsplittableid)
    parentTable.LastSplitTableId = lastsplittableid + 1
    this.auth.splitTable({ parenttable: parentTable, splittable: table }).subscribe(data => {
      this.gettables()
    })
  }
  getavailablesplitid(tableid) {
    var availablesplitid = 0
    var result = this.diningtables
      .filter(x => x.TableKey.includes('_') && x.TableKey.includes(tableid.toString()))
      .map(function (a) {
        return +a.TableKey.split('_')[1]
      })
    var missedarr = []
    if (result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        if (result[i + 1] - result[i] > 1) {
          for (let j = 1; j < result[i + 1] - result[i]; j++) {
            missedarr.push(result[i] + j)
          }
        }
      }
      if (missedarr.length > 0) {
        availablesplitid = missedarr[0] - 1
      } else {
        availablesplitid = result[result.length - 1]
      }
    }
    return +availablesplitid
    // this.diningtables.filter(x => x.TableKey.includes('_') && x.TableKey.includes(tableid.toString()))
  }
  removeplittable(splitetablekey) {
    var parentTable = this.diningtables.filter(x => x.Id == +splitetablekey.split('_')[0])[0]
    parentTable.LastSplitTableId -= 1
    this.auth.deletesplittable(splitetablekey).subscribe(data => {
      this.gettables()
    })
  }
  gettables() {
    this.auth.getdbdata(['diningtable', 'tableorders']).subscribe(data => {
      this.diningtables = data['diningtable']
      this.diningtables = this.diningtables.sort((a, b) =>
        a.TableKey > b.TableKey ? 1 : b.TableKey > a.TableKey ? -1 : 0,
      )
      this.tableorders = data['tableorders']
      this.diningtables.forEach(tbl => {
        if (this.tableorders.some(x => x.diningtablekey == tbl.TableKey)) {
          // console.log(tbl.TableName)
          tbl.TableStatusId = 1
        } else {
          tbl.TableStatusId = 0
        }
      })
    })
  }
  savetblorder() {
    if (this.order.OrderTypeId == 1) {
      this.auth.savetblorder(this.order).subscribe(data => {
        this.gettblorders()
      })
    }
  }
  gettblorders() {
    this.auth.getdbdata(['tableorders']).subscribe(data => {
      this.tableorders = data['tableorders']
      this.diningtables.forEach(tbl => {
        if (this.tableorders.some(x => x.diningtablekey == tbl.TableKey)) {
          tbl.TableStatusId = 1
        } else {
          tbl.TableStatusId = 0
        }
      })
    })
  }
  showcopiedmsg: boolean = false;
  // Option Group payment_modal
  @ViewChild('prod_details', { static: false }) public prod_detail_modal: TemplateRef<any>
  @ViewChild('cancelreason_modal', { static: false }) public cancelreason_modal: TemplateRef<any>
  @ViewChild('viewonlineorder_modal', { static: false }) public viewonlineorder_modal: TemplateRef<any>
  @ViewChild('payment_modal', { static: false }) public payment_modal: TemplateRef<any>

  currentitem: OrderItemModule = null
  addProduct(product) {
    var options = {
      quantity: 1,
      key: '',
    }
    if (product.OptionGroup && product.OptionGroup.length > 0) {
      this.currentitem = new CurrentItemModule(product)
      this.modalService.open(this.prod_detail_modal, {
        windowClass: 'modal-holder',
        centered: true,
      })
      this.orderlogging('item_with_option_add')
    } else {
      this.order.additem(product, options)
      this.model = ''
      this.QuantityRef['nativeElement'].value = ''
      this.instance['_elementRef']['nativeElement'].focus()
      this.orderlogging('item_add')
    }
    if (this.order.OrderTypeId == 1) {
      this.savetblorder()
    }
  }
  addcurrentitem() {
    var options = {
      quantity: this.currentitem.Quantity,
      key: '',
    }
    this.order.additem(this.currentitem, options)
    this.model = ''
    this.QuantityRef['nativeElement'].value = ''
    this.instance['_elementRef']['nativeElement'].focus()
    this.modalService.dismissAll()
    this.orderlogging('current_item_add_save')
    if (this.order.OrderTypeId == 1) {
      this.savetblorder()
    }
  }
  console(data) {
    // console.log(data)
  }
  itemdetails(product) {
    this.currentitem = new CurrentItemModule(JSON.parse(JSON.stringify(product)))
    this.modalService.open(this.prod_detail_modal, { centered: true })
  }

  setvariantvalue(OptionGroup, Option) {
    OptionGroup.Option.forEach(element => {
      element.selected = false
    })
    if (OptionGroup.selected != Option.Id) {
      OptionGroup.selected = Option.Id
      Option.selected = true
    } else {
      OptionGroup.selected = false
      Option.selected = false
    }
    this.setcurrentitemprice()
  }
  setcurrentitemprice() {
    console.log(this.order.Items)
    this.currentitem.TotalAmount = 0
    this.currentitem.OptionGroup.forEach(opg => {
      if (opg.selected) {
        opg.Option.forEach(option => {
          if (option.selected) {
            this.currentitem.TotalAmount += option.Price
          }
        })
      }
    })
    this.currentitem.TotalAmount += this.currentitem.Price
    this.currentitem.TotalAmount *= this.currentitem.Quantity
    if (this.currentitem.DiscType == 1) {
      this.currentitem.TotalAmount -= this.currentitem.DiscAmount
    } else if (this.currentitem.DiscType == 2) {
      this.currentitem.TotalAmount -=
        (this.currentitem.TotalAmount * this.currentitem.DiscPercent) / 100
    }
  }
  SetAddonValue(OptionGroup, Option, check) {
    if (check) {
      Option.selected = true
    } else {
      Option.selected = false
    }
    if (OptionGroup.Option.some(x => x.selected == true)) {
      OptionGroup.selected = true
    } else {
      OptionGroup.selected = false
    }
    this.setcurrentitemprice()
  }
  nzClick(event) {
    // console.log(event)
  }
  openCustomClass(content) {
    this.modalService.open(content, { centered: true, windowClass: 'modal-holder' })
  }

  // Auto Compelete

  onInput(value: string): void {
    this.autocompleteproducts = value
      ? this.products.filter(x => x.Product.toLowerCase().includes(value.toLowerCase()))
      : []
  }

  addItem(contentDetail, productObj, qty: number) {
    // mintos();
    // this.getPaymentTypes();
    if (this.order.OrderTypeId == 5) {
      this.order.PaidAmount = 0
    }
    productObj.KOTNo = this.KOTNo
  }
  fieldselect(event) {
    // alert('hi');
    // console.log(event)
    // console.log(event.element.nativeElement.id)
    var product = this.products.filter(x => x.Id == +event.element.nativeElement.id)[0]
  }
  getPaymentTypes() {
    // // console.log("getpaymanet");
    // this.paymentType = JSON.parse(localStorage.getItem("PaymentType"));
    // this.paymentType.forEach(element => {
    //   element.Price = 0;
    // });
    // this.IDB.IDBGetStoreObser("PaymentType").subscribe(data => {
    //   this.paymentType = data;
    //   this.paymentType.forEach(element => {
    //     element.Price = 0;
    //   });
    // });
  }

  // Modal for Edit Order
  // Bootstrap
  open(content) {
    this.modalService.open(content)
  }
  currstsbtns = []
  customstsbtn = false
  vieworderlist(type) {
    this.customstsbtn = this.statusbtns.filter(x => x.OrderTypeId == type)[0]?.iscustomisable
    this.currstsbtns = this.statusbtns.filter(x => x.OrderTypeId == type)[0].StatusButtons
    var lastenabledsts = 1
    this.currstsbtns.forEach(btn => {
      if (btn.OrderStatusId > 1 && btn.Enabled) {
        console.log(btn.Name)
        btn.showonstatusid = lastenabledsts
        lastenabledsts = btn.OrderStatusId
        btn.class = [2, 3].includes(btn.OrderStatusId) ? 'btn-warning' : btn.OrderStatusId == 4 ? 'btn-purple' : btn.OrderStatusId == 5 ? 'btn-success' : ''
      }
    })
    this.preorders.filter(x => x.OrderTypeId == type).forEach(y => {
      y.statusbtns = this.currstsbtns.filter(x => x.OrderStatusId > y.OrderStatusId && x.Enabled)
    });
    console.log(this.currstsbtns)
    this.sectionid = 1
    this.orderpageid = type
    if (type == 6) {
      this.getstoreuporders()
    }
  }
  preventobjcpy(obj) {
    return JSON.parse(JSON.stringify(obj))
  }
  vieworder(order) {
    this.temporder = this.preventobjcpy(order)
    this.deliverydate = this.temporder.DeliveryDateTime.split(' ')[0]
    this.deliverytime = this.temporder.DeliveryDateTime.split(' ')[1]
    this.modalService.open(this.viewordermodal, { size: 'xl', backdrop: 'static' })
  }
  syncorderbyid() {
    if (this.temporder.OrderId > 0) {
      this.temporder["loading"] = true
      this.preorders.filter(x => x.InvoiceNo == this.temporder.InvoiceNo && x.createdtimestamp == this.temporder.createdtimestamp)[0]['loading'] = true
    }
    this.modalService.dismissAll()
  }
  updateorderno() {
    this.orderkey.orderno++
    this.auth.updateorderkey(this.orderkey).subscribe(data => { })
  }
  updatekotno() {
    this.orderkey.kotno++
    this.auth.updateorderkey(this.orderkey).subscribe(data => { })
  }
  addfreequantity(key) {
    this.order.Items.forEach(item => {
      if (item.ProductKey == key) {
        if (item.Quantity > 0) {
          item.Quantity--
          item.ComplementryQty++
        }
      }
    })
    this.orderlogging('freequantity_add')
    this.order.setbillamount()
  }
  cleardiscount() {
    this.order.DiscAmount = 0
    this.order.DiscAmount = 0
    this.order.Items.forEach(item => {
      item.DiscAmount = 0
      item.DiscPercent = 0
    })
    this.order.setbillamount()
    this.orderlogging('discount_clear')
    this.savetblorder()
  }
  onLongPress() {
    // console.log("long press")
  }
  onLongPressing() {
    // console.log("long press ing")
  }
  generatekot() {
    var groupeditems = _.mapValues(
      _.groupBy(
        this.order.Items.filter(x => x.Quantity + x.ComplementryQty - x.kotquantity != 0),
        'KOTGroupId',
      ),
    )
    // // console.log(groupeditems)
    Object.keys(groupeditems).forEach(key => {
      this.order.addkot(groupeditems[key], this.orderkey.kotno)
      this.updatekotno()
    })
    if (this.order.OrderNo == 0) {
      this.order.OrderNo = this.orderkey.orderno
      this.order.InvoiceNo =
        this.loginfo.StoreId + moment().format('YYYYMMDD') + '/' + this.order.OrderNo
      this.updateorderno()
    } else {
      if (!this.order.changeditems.includes('kot')) this.order.changeditems.push('kot')
    }
    this.order.Items = this.order.Items.filter(x => x.Quantity + x.ComplementryQty != 0)
    // localStorage.setItem("testorder", JSON.stringify(this.order))
    this.order.KOTS.forEach(kot => {
      kot.CreatedDate = moment().format('YYYY-MM-DD hh:mm A')
      kot.ModifiedDate = moment().format('YYYY-MM-DD hh:mm A')
      if (!kot.isprinted) {
        // console.log("new kot")
        this.orderlogging('new_kot')
        kot.isprinted = true
        if (this.order.OrderTypeId != 5)
          this.printkot(kot)
      }
    })
    this.order.setkotquantity()
    if (this.order.OrderTypeId == 1) {
      this.savetblorder()
    }
    console.log(this.order.KOTS)
  }
  printkot(kot: KOTModule) {
    // // console.log(moment().format('DD-MM-YYYY hh:mm A'))
    // // console.log(moment(kot.ModifiedDate).format('DD-MM-YYYY hh:mm A'))
    // console.log(this.order.OrderName)
    var kottemplate = `
    <div id="printelement">
      <div class="header">
          <h3>ORDER TICKET #${kot.KOTNo}</h3>
          <table class="item-table">
              <tbody>
                  <tr class="nb">
                      <td class="text-left">${this.order.InvoiceNo}</td>
                      <td class="text-right">${this.order.OrderName}</td>
                  </tr>
                  <tr class="nb">
                      <td class="text-left">Date/Time</td>
                      <td class="text-right">${moment(kot.ModifiedDate).format(
      'DD-MM-YYYY / hh:mm A',
    )}</td>
                  </tr>
              </tbody>
          </table>
      </div>
      <hr>`
    if (kot.added.length > 0) {
      kottemplate += `
      <div class="text-center">ADDED ITEMS</div>
      <table class="item-table">
          <thead class="nb">
              <th class="text-left">ITEM</th>
              <th class="text-right">QTY</th>
          </thead>
          <tbody>
      `
      kot.added.forEach(ai => {
        // // console.log('ADDED ITEMS',ai.Quantity,ai.showname)
        kottemplate += `
        <tr class="nb">
            <td class="text-left">${ai.showname}</td>
            <td class="text-right">+${ai.Quantity}</td>
        </tr>
      `
      })
      kottemplate += `
        </tbody>
      </table>
      <hr>
      `
    }
    if (kot.removed.length > 0) {
      kottemplate += `
      <div class="text-center">REMOVED ITEMS</div>
      <table class="item-table">
          <thead class="nb">
              <th class="text-left">ITEM</th>
              <th class="text-right">QTY</th>
          </thead>
          <tbody>
      `
      kot.removed.forEach(ri => {
        // // console.log('REMOV ITEMS',ri.Quantity,ri.showname)
        kottemplate += `
        <tr class="nb">
            <td class="text-left">${ri.showname}</td>
            <td class="text-right">(${ri.Quantity})</td>
        </tr>
      `
      })
      kottemplate += `
        </tbody>
      </table>
      <hr>
      `
    }
    kottemplate += `
      <hr ${this.order.Note ? '' : 'hidden'}>
      <div class="text-center" ${this.order.Note ? '' : 'hidden'}>
          <p>Note: ${this.order.Note}</p>
      </div>
    `
    kottemplate += `
      <div class="text-center">
          <p>Powered By Biz1Book.</p>
      </div>
    </div>
    `
    kottemplate += this.printhtmlstyle
    // // console.log(kottemplate)
    var printers = []
    if (this.printersettings) {
      if (this.printersettings['kotgroups'].some(x => x.KOTGroupId == kot.KOTGroupId)) {
        printers = this.printersettings['kotgroups'].filter(x => x.KOTGroupId == kot.KOTGroupId)[0]
          .Printers
      } else {
        printers = [this.printersettings.kotprinter]
      }
      this.printservice.print(kottemplate, printers)
    }
  }
  receivetableorder() {
    this.generatekot()
    this.printreceipt()
  }
  // Take Away Button Text CHange Function
  users: Array<any> = [
    {
      active: false,
    },
  ]

  click(user) {
    user.active = !user.active
  }
  getcustomerhtml() {
    var html = ''
    // // console.log(this.order.CustomerDetails.PhoneNo ? true : false)
    // // console.log(this.order.CustomerDetails.Name ? true : false)
    // // console.log(this.order.CustomerDetails.Address ? true : false)
    // // console.log(this.order.CustomerDetails.City ? true : false)
    if (this.order.CustomerDetails.PhoneNo) {
      html = `<div ${this.order.CustomerDetails.PhoneNo ? '' : 'hidden'} class="header">
          <h3 ${this.order.CustomerDetails.Name ? '' : 'hidden'}>${this.order.CustomerDetails.Name
        }</h3>
          <p>${this.order.CustomerDetails.Address ? this.order.CustomerDetails.Address + '<br>' : ''
        }${this.order.CustomerDetails.City ? this.order.CustomerDetails.City + ',' : ''}${this.order.CustomerDetails.PhoneNo
        }</p>
      </div>
      <hr>`
    }
    return html
  }
  printreceipt() {
    // console.log(this.order.AllItemDisc, this.order.AllItemTaxDisc, this.order.AllItemTotalDisc)
    // console.log(this.order.OrderDiscount, this.order.OrderTaxDisc, this.order.OrderTotDisc)
    this.orderlogging('receipt_print')
    var printtemplate = `
    <div id="printelement">
    <div class="header">
        <h3>${this.loginfo.Company}</h3>
        <p>
            ${this.loginfo.Store}, ${this.loginfo.Address}<br>
            ${this.loginfo.City}, ${this.loginfo.ContactNo}
            GSTIN:${this.orderkey.GSTno}<br>
            Receipt: ${this.order.InvoiceNo}<br>
            ${moment(this.order.OrderedDateTime).format('LLL')}
        </p>
    </div>
    <hr>
    ${this.getcustomerhtml()}
    <table class="item-table">
        <thead class="nb">
            <th class="text-left" style="width: 100px;">ITEM</th>
            <th class="text-right">PRICE</th>
            <th class="text-right">QTY</th>
            <th class="text-right">AMOUNT</th>
        </thead>
        <tbody>`
    var extra = 0
    this.order.Items.forEach(item => {
      printtemplate += `
      <tr class="nb">
          <td class="text-left">${item.showname}</td>
          <td class="text-right">${item.baseprice.toFixed(2)}</td>
          <td class="text-right">${item.Quantity}${item.ComplementryQty > 0 ? '(' + item.ComplementryQty + ')' : ''
        }</td>
          <td class="text-right">${item.TotalAmount.toFixed(2)}</td>
      </tr>`
      extra += item.Extra
    })
    printtemplate += `
    <tr class="bt">
        <td class="text-left"><strong>Sub Total</strong></td>
        <td colspan="2"></td>
        <td class="text-right">${this.order.subtotal.toFixed(2)}</td>
    </tr>
    <tr class="nb" ${this.order.OrderTotDisc + this.order.AllItemTotalDisc == 0 ? 'hidden' : ''}>
        <td class="text-left"><strong>Discount</strong></td>
        <td colspan="2"></td>
        <td class="text-right">${(+(this.order.OrderTotDisc + this.order.AllItemTotalDisc).toFixed(
      0,
    )).toFixed(2)}</td>
    </tr>
    <tr class="nb" ${this.order.Tax1 == 0 ? 'hidden' : ''}>
        <td class="text-left"><strong>CGST</strong></td>
        <td colspan="2"></td>
        <td class="text-right">${(
        this.order.Tax1 +
        +((this.order.OrderTotDisc + this.order.AllItemTotalDisc) / 2).toFixed(0)
      ).toFixed(2)}</td>
    </tr>
    <tr class="nb" ${this.order.Tax2 == 0 ? 'hidden' : ''}>
        <td class="text-left"><strong>SGST</strong></td>
        <td colspan="2"></td>
        <td class="text-right">${(
        this.order.Tax2 +
        +((this.order.OrderTotDisc + this.order.AllItemTotalDisc) / 2).toFixed(0)
      ).toFixed(2)}</td>
    </tr>`
    this.order.additionalchargearray.forEach(charge => {
      if (charge.selected) {
        printtemplate += `
        <tr class="nb">
            <td class="text-left"><strong>${charge.Description}</strong></td>
            <td colspan="2"></td>
            <td class="text-right">${charge.ChargeValue}</td>
        </tr>`
      }
    })
    printtemplate += `
          <tr class="nb" ${extra > 0 ? '' : 'hidden'}>
              <td class="text-left"><strong>Extra</strong></td>
              <td colspan="2"></td>
              <td class="text-right">${extra.toFixed(2)}</td>
          </tr>
          <tr class="nb">
              <td class="text-left"><strong>Paid</strong></td>
              <td colspan="2"></td>
              <td class="text-right">${this.order.PaidAmount.toFixed(2)}</td>
          </tr>
          <tr class="nb">
              <td class="text-left"><strong>Total</strong></td>
              <td colspan="2"></td>
              <td class="text-right">${this.order.BillAmount.toFixed(2)}</td>
          </tr>
          <tr class="nb" ${(this.order.BillAmount - this.order.PaidAmount) > 0 ? '' : 'hidden'}>
              <td class="text-left"><strong>Balance</strong></td>
              <td colspan="2"></td>
              <td class="text-right">${(this.order.BillAmount - this.order.PaidAmount).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <hr>
      <div class="text-center">
        <p>Powered By Biz1Book.</p>
      </div>
    </div>`
    printtemplate += this.printhtmlstyle
    // console.log(printtemplate)
    // var printhtml = document.getElementById("rprintelcontainer").innerHTML
    // printhtml += this.printhtmlstyle
    // // console.log(printhtml)
    // // console.log(printtemplate)
    if (this.printersettings) {
      this.printservice.print(printtemplate, [this.printersettings.receiptprinter])
    }
  }
  printreceiptbyorder(order) {
    // console.log(order.AllItemDisc, order.AllItemTaxDisc, order.AllItemTotalDisc)
    // console.log(order.OrderDiscount, order.OrderTaxDisc, order.OrderTotDisc)
    // this.orderlogging('receipt_print_by_order')
    var printtemplate = `
    <div id="printelement">
    <div class="header">
        <h3>${this.loginfo.Company}</h3>
        <p>
            ${this.loginfo.Store}, ${this.loginfo.Address}<br>
            ${this.loginfo.City}, ${this.loginfo.ContactNo}
            GSTIN:${this.orderkey.GSTno}<br>
            Receipt: ${order.InvoiceNo}<br>
            ${moment(order.OrderedDateTime).format('LLL')}
        </p>
    </div>
    <hr ${order.CustomerDetails.PhoneNo ? '' : 'hidden'}>
    <div ${order.CustomerDetails.PhoneNo ? '' : 'hidden'} class="header">
        <h3 ${order.CustomerDetails.Name ? '' : 'hidden'}>${order.CustomerDetails.Name}</h3>
        <p>${order.CustomerDetails.Address ? order.CustomerDetails.Address + '<br>' : ''}${order.CustomerDetails.City ? order.CustomerDetails.City + ',' : ''
      }${order.CustomerDetails.PhoneNo}</p>
    </div>
    <hr>
    <table class="item-table">
        <thead class="nb">
            <th class="text-left" style="width: 100px;">ITEM</th>
            <th class="text-right">PRICE</th>
            <th class="text-right">QTY</th>
            <th class="text-right">AMOUNT</th>
        </thead>
        <tbody>`
    var extra = 0
    order.Items.forEach(item => {
      printtemplate += `
      <tr class="nb">
          <td class="text-left">${item.showname}</td>
          <td class="text-right">${item.baseprice.toFixed(2)}</td>
          <td class="text-right">${item.Quantity}${item.ComplementryQty > 0 ? '(' + item.ComplementryQty + ')' : ''
        }</td>
          <td class="text-right">${item.TotalAmount.toFixed(2)}</td>
      </tr>`
      extra += item.Extra
    })
    printtemplate += `
    <tr class="bt">
        <td class="text-left"><strong>Sub Total</strong></td>
        <td colspan="2"></td>
        <td class="text-right">${order.subtotal.toFixed(2)}</td>
    </tr>
    <tr class="nb" ${order.OrderTotDisc + order.AllItemTotalDisc == 0 ? 'hidden' : ''}>
        <td class="text-left"><strong>Discount</strong></td>
        <td colspan="2"></td>
        <td class="text-right">${(+(order.OrderTotDisc + order.AllItemTotalDisc).toFixed(
      0,
    )).toFixed(2)}</td>
    </tr>
    <tr class="nb" ${order.Tax1 == 0 ? 'hidden' : ''}>
        <td class="text-left"><strong>CGST</strong></td>
        <td colspan="2"></td>
        <td class="text-right">${(
        order.Tax1 + +((order.OrderTotDisc + order.AllItemTotalDisc) / 2).toFixed(0)
      ).toFixed(2)}</td>
    </tr>
    <tr class="nb" ${order.Tax2 == 0 ? 'hidden' : ''}>
        <td class="text-left"><strong>SGST</strong></td>
        <td colspan="2"></td>
        <td class="text-right">${(
        order.Tax2 + +((order.OrderTotDisc + order.AllItemTotalDisc) / 2).toFixed(0)
      ).toFixed(2)}</td>
    </tr>`
    order.additionalchargearray.forEach(charge => {
      if (charge.selected) {
        printtemplate += `
          <tr class="nb">
              <td class="text-left"><strong>${charge.Description}</strong></td>
              <td colspan="2"></td>
              <td class="text-right">${charge.ChargeValue}</td>
          </tr>`
      }
    })
    printtemplate += `
          <tr class="nb" ${extra > 0 ? '' : 'hidden'}>
              <td class="text-left"><strong>Extra</strong></td>
              <td colspan="2"></td>
              <td class="text-right">${extra.toFixed(2)}</td>
          </tr>
          <tr class="nb">
              <td class="text-left"><strong>Paid</strong></td>
              <td colspan="2"></td>
              <td class="text-right">${order.PaidAmount.toFixed(2)}</td>
          </tr>
          <tr class="nb">
              <td class="text-left"><strong>Total</strong></td>
              <td colspan="2"></td>
              <td class="text-right">${order.BillAmount.toFixed(2)}</td>
          </tr>
          <tr class="nb" ${(order.BillAmount - order.PaidAmount) > 0 ? '' : 'hidden'}>
              <td class="text-left"><strong>Balance</strong></td>
              <td colspan="2"></td>
              <td class="text-right">${(order.BillAmount - order.PaidAmount).toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
      <hr>
      <div class="text-center">
        <p>Powered By Biz1Book.</p>
      </div>
    </div>`
    printtemplate += this.printhtmlstyle
    console.log(printtemplate)
    if (this.printersettings) {
      this.printservice.print(printtemplate, [this.printersettings.receiptprinter])
    }
  }
  advanceordervalidate() {
    var valid = true
    if (!this.order.CustomerDetails.PhoneNo) valid = false
    if (!this.deliverydate || !this.deliverytime) valid = false
    return valid
  }
  placeorderclicked = false
  updateorder() {
    this.generatekot()
    this.order.status = 'P'
    this.order.datastatus = 'edit_order'
    this.order.setrefid()
    this.auth.updatepreorders(this.order).subscribe(data => {
      this.sync.sync()
      this.clearorder(this.order.OrderTypeId)
    })
  }
  saveorder() {
    this.placeorderclicked = true
    // console.log(this.advanceordervalidate())
    if (this.order.IsAdvanceOrder) {
      if (!this.advanceordervalidate()) return
    }
    this.generatekot()
    this.order.BillDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
    this.order.BillDate = moment().format('YYYY-MM-DD')
    this.order.OrderedDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
    this.order.OrderedDate = moment().format('YYYY-MM-DD')
    this.order.UserId = this.user.UserId
    this.order.StoreId = this.loginfo.StoreId
    this.order.CompanyId = this.loginfo.CompanyId
    this.order.OrderStatusId = 5
    this.order.InvoiceNo =
      this.loginfo.StoreId + moment().format('YYYYMMDD') + '/' + this.order.OrderNo
    this.order.CustomerDetails.CompanyId = this.loginfo.CompanyId
    this.order.CustomerDetails.StoreId = this.loginfo.StoreId
    this.printreceipt()
    this.order.setrefid()
    this.transaction = null
    this.order.Transactions = []
    // this.order.createdtimestamp = new Date().getTime()
    this.order.deliverytimestamp = this.order.DeliveryDateTime
      ? new Date(this.order.DeliveryDateTime).getTime()
      : 0
    if (this.order.PaidAmount > 0) {
      if (this.order.StorePaymentTypeId != -1) {
        var transaction = new Transaction()
        // transaction.Id = this.loginfo.CompanyId
        transaction.Amount = this.order.PaidAmount
        transaction.OrderId = this.order.OrderId
        transaction.CustomerId = this.order.CustomerDetails.Id
        // transaction.PaymentTypeId = this.
        transaction.StorePaymentTypeId = this.order.StorePaymentTypeId
        transaction.TranstypeId = 1
        transaction.PaymentStatusId = 0
        transaction.TransDateTime = moment().format('YYYY-MM-DD HH:mm:ss')
        transaction.TransDate = moment().format('YYYY-MM-DD')
        transaction.UserId = this.order.UserId
        transaction.CompanyId = this.loginfo.CompanyId
        transaction.StoreId = this.loginfo.StoreId
        transaction.Notes = null
        transaction.InvoiceNo = this.order.InvoiceNo
        transaction.saved = true
        this.transaction = transaction
        this.order.Transactions.push(this.transaction)
      } else if (this.order.StorePaymentTypeId == -1) {
        this.transactionlist = this.transactionlist.filter(x => x.Amount > 0)
        this.transactionlist.forEach(trxn => {
          trxn.InvoiceNo = this.order.InvoiceNo
          trxn.CompanyId = this.order.CompanyId
          trxn.StoreId = this.loginfo.StoreId
          trxn.saved = true
          this.order.Transactions.push(trxn)
        })
      }
      // this.auth.savetransactiontonedb(this.order.Transactions).subscribe(dd => { })
      // transaction.Remaining = 0
      // if (!this.temporder.Transactions) this.temporder.Transactions = []
      // this.order.Transactions.push(transaction)
    }
    this.order.alltransactions = [...this.order.alltransactions, ...this.order.Transactions]
    if (this.order.IsAdvanceOrder || this.order.OrderTypeId == 2) {
      // if (!this.advanceordervalidate()) return
      this.order.isordersaved = true
      this.order.events.push({ name: 'order_placed', time: new Date().getTime() })
      this.order.OrderStatusId = 1
      this.order.DeliveryDateTime = moment(this.deliverydate + ' ' + this.deliverytime).format(
        'YYYY-MM-DD HH:mm',
      )
      // if (this.transaction || (this.transactionlist && this.transactionlist.length)) {
      //   this.auth.savetransactiontonedb(this.transaction || this.transactionlist).subscribe(trdt => {
      //     this.auth.savepreorders(this.order).subscribe(data => {
      //       // console.log(data)
      //       this.sync.sync()
      //       // console.log(this.order)
      //       this.getpreorders()
      //       this.clearorder(this.order.OrderTypeId)
      //     })
      //   })
      // } else {
      localStorage.setItem("lastorder", JSON.stringify(this.order))
      this.auth.savepreorders(this.order).subscribe(data => {
        // console.log(data)
        this.sync.sync()
        // console.log(this.order)
        this.getpreorders()
        this.clearorder(this.order.OrderTypeId)
      })
      // }
    } else {
      this.orderlogging('saving_order')
      // if (this.transaction || (this.transactionlist && this.transactionlist.length)) {
      //   this.auth.savetransactiontonedb(this.transaction || this.transactionlist).subscribe(trdt => {
      //     this.auth.saveordertonedb(this.order).subscribe(data => {
      //       // console.log(data)
      //       this.sync.sync()
      //       // console.log(this.order)
      //       this.clearorder(this.order.OrderTypeId)
      //     })
      //   })
      // } else {

      localStorage.setItem("lastorder", JSON.stringify(this.order))
      this.auth.saveordertonedb(this.order).subscribe(data => {
        // console.log(data)
        this.sync.sync()
        // console.log(this.order)
        this.clearorder(this.order.OrderTypeId)
      })
      // }
    }
  }
  savetemporder() {
    this.temporder.status = 'P'
    this.temporder.datastatus = 'edit_order'
    this.temporder.DeliveryDateTime = moment(this.deliverydate + ' ' + this.deliverytime).format(
      'YYYY-MM-DD HH:mm',
    )
    this.deliverydate = ''
    this.deliverytime = ''
    this.auth.updatepreorders(this.temporder).subscribe(data => {
      this.sync.sync()
      this.getpreorders()
    })
    this.modalService.dismissAll()
  }
  temporder: OrderModule = null
  transaction: Transaction
  openpaymentmodal(order: OrderModule) {
    this.issplitpayment = false
    this.temporder = order
    this.transaction = new Transaction()
    this.transaction.Remaining = this.temporder.BillAmount - this.temporder.PaidAmount
    this.transaction.Amount = this.transaction.Remaining
    this.transaction.OrderId = order.OrderId
    this.transaction.StoreId = this.loginfo.StoreId
    this.transaction.TransDate = moment().format('YYYY-MM-DD')
    this.transaction.TransDateTime = moment().format('YYYY-MM-DD HH:mm')
    this.transaction.TranstypeId = 1
    this.transaction.UserId = order.UserId
    this.transaction.CompanyId = order.CompanyId
    this.transaction.CustomerId = order.CustomerDetails.Id
    // console.log(this.transaction)
    const modalref = this.modalService.open(this.payment_modal, { size: 'xl', backdrop: 'static' })
    modalref.result.then((result) => {
      console.log("result", result)
    }, (reason) => {
      console.log("reason", reason)
      if (reason == 'Back' && order.deliveryclicked && order.OrderTypeId == 4) {
        this.orderstatuschange(order, 5)
      } else if (!order.deliveryclicked && order.OrderTypeId == 4) {
        order.deliveryclicked = false
      }
    })
  }
  openrefundmodal(order: OrderModule) {
    this.issplitpayment = false
    this.temporder = order
    this.transaction = new Transaction()
    this.transaction.Remaining = this.temporder.PaidAmount - this.temporder.BillAmount
    this.transaction.Amount = this.transaction.Remaining
    this.transaction.OrderId = order.OrderId
    this.transaction.StoreId = this.loginfo.StoreId
    this.transaction.TransDate = moment().format('YYYY-MM-DD')
    this.transaction.TransDateTime = moment().format('YYYY-MM-DD HH:mm')
    this.transaction.TranstypeId = 2
    this.transaction.UserId = order.UserId
    this.transaction.CompanyId = order.CompanyId
    this.transaction.CustomerId = order.CustomerDetails.Id
    this.transaction.InvoiceNo = order.InvoiceNo
    // console.log(this.transaction)
    this.modalService.open(this.payment_modal, { size: 'xl', backdrop: 'static' })
  }
  makepayment() {
    console.log(this.temporder)
    if (!this.temporder.Transactions) this.temporder.Transactions = []
    if (this.transaction.TranstypeId == 1) this.temporder.PaidAmount += this.transaction.Amount
    else if (this.transaction.TranstypeId == 2) this.temporder.PaidAmount -= this.transaction.Amount
    // this.temporder.Transactions.push(this.transaction)
    // if (!this.temporder.changeditems.includes('transaction')) {
    //   this.temporder.changeditems.push('transaction')
    // }
    this.temporder.status = 'P'

    // if (this.temporder.PaidAmount == this.temporder.BillAmount && this.temporder.OrderTypeId == 4) this.temporder.OrderStatusId = 3

    if (this.temporder.OrderId > 0) {
      this.temporder.datastatus = 'edit_order'
    } else {
      this.temporder.datastatus = 'new_order'
    }
    this.auth.getpreorderby_id(this.temporder['_id']).subscribe(data => {
      this.temporder.OrderId = data['OrderId']
      if (this.temporder.OrderId > 0) {
        this.temporder.datastatus = 'edit_order'
      } else {
        this.temporder.datastatus = 'new_order'
      }
      this.transaction.OrderId = this.temporder.OrderId
      this.transaction.InvoiceNo = this.temporder.InvoiceNo
      this.auth.savetransactiontonedb(this.transaction).subscribe(trdt => {
        if (this.temporder.deliveryclicked && this.temporder.OrderTypeId == 4) {
          this.orderstatuschange(this.temporder, 5)
        } else {
          this.auth.updatepreorders(this.temporder).subscribe(data => {
            this.getpreorders()
            this.sync.sync()
          })
        }
      })
    })
    this.modalService.dismissAll()
  }
  splitpayment() {
    this.transactionlist = []
    this.issplitpayment = true
    this.paymentTypes.forEach(pt => {
      var transaction = new Transaction()
      transaction = new Transaction()
      transaction.Remaining = this.temporder.BillAmount - this.temporder.PaidAmount
      transaction.Amount = 0
      transaction.OrderId = this.temporder.OrderId
      transaction.StoreId = this.loginfo.StoreId
      transaction.TransDate = moment().format('YYYY-MM-DD')
      transaction.TransDateTime = moment().format('YYYY-MM-DD HH:mm')
      transaction.TranstypeId = 1
      transaction.UserId = this.temporder.UserId
      transaction.CompanyId = this.temporder.CompanyId
      transaction.CustomerId = this.temporder.CustomerDetails.Id
      transaction.StorePaymentTypeName = pt.Description
      transaction.StorePaymentTypeId = pt.Id
      this.transactionlist.push(transaction)
    })
  }
  calculatesplitpaymenttotal() {
    this.splitpaymenttotal = 0
    this.transactionlist.forEach(tr => {
      this.splitpaymenttotal += tr.Amount
    })
  }
  makesplitpayment() {
    var transactionarray = this.transactionlist.filter(x => x.Amount > 0)
    this.auth.getpreorderby_id(this.temporder['_id']).subscribe(data => {
      this.temporder.status = 'P'
      this.temporder.OrderId = data['OrderId']
      if (this.temporder.OrderId > 0) {
        this.temporder.datastatus = 'edit_order'
      } else {
        this.temporder.datastatus = 'new_order'
      }
      transactionarray.forEach(tr => {
        if (tr.TranstypeId == 1) this.temporder.PaidAmount += tr.Amount
        else if (tr.TranstypeId == 2) this.temporder.PaidAmount -= tr.Amount
        tr.OrderId = this.temporder.OrderId
        tr.InvoiceNo = this.temporder.InvoiceNo
      })

      if (this.temporder.PaidAmount == this.temporder.BillAmount && this.temporder.OrderTypeId == 4) this.temporder.OrderStatusId = 4

      this.auth.savetransactiontonedb(transactionarray).subscribe(trdt => {
        if (this.temporder.deliveryclicked && this.temporder.OrderTypeId == 4) {
          this.orderstatuschange(this.temporder, 5)
        } else {
          this.auth.updatepreorders(this.temporder).subscribe(data => {
            this.getpreorders()
            this.sync.sync()
          })
        }
      })
      this.modalService.dismissAll()
    })
  }
  issplitpaymentdrawer: boolean = false
  opensplitpaymentmodal() {
    this.issplitpaymentdrawer = true
    if (this.order.StorePaymentTypeId != -1) {
      this.order.StorePaymentTypeId = -1
      this.resetsplitpayment()
    }
    // this.modalService.open(this.split_payment_modal, { centered: true, size: 'lg', backdrop: 'static' })
  }
  resetsplitpayment() {
    this.transactionlist = []
    this.paymentTypes.forEach(pt => {
      var transaction = new Transaction()
      transaction = new Transaction()
      transaction.Remaining = this.order.BillAmount
      transaction.Amount = 0
      transaction.OrderId = this.order.OrderId
      transaction.StoreId = this.loginfo.StoreId
      transaction.TransDate = moment().format('YYYY-MM-DD')
      transaction.TransDateTime = moment().format('YYYY-MM-DD HH:mm')
      transaction.TranstypeId = 1
      transaction.UserId = this.order.UserId
      transaction.CompanyId = this.order.CompanyId
      transaction.CustomerId = this.order.CustomerDetails.Id
      transaction.StorePaymentTypeName = pt.Description
      transaction.StorePaymentTypeId = pt.Id
      this.transactionlist.push(transaction)
    })
  }
  cancelsplitpayment() {
    this.order.PaidAmount = 0
    this.order.StorePaymentTypeId = 0
    this.transactionlist = []
    this.issplitpaymentdrawer = false
    this.calculatesplitpaymenttotal()
  }
  confirmsplitpayment() {
    this.order.PaidAmount = this.splitpaymenttotal
    this.issplitpaymentdrawer = false
  }
  orderstatuschange(order, statusid) {
    // console.log(order)
    if (order.PaidAmount != order.BillAmount && !order.deliveryclicked) {
      order.deliveryclicked = true
      var diff = order.BillAmount - order.PaidAmount
      if (diff > 0) {
        this.openpaymentmodal(order)
      } else {
        this.openrefundmodal(order)
      }
      return
    }
    var obj = { name: '', time: new Date().getTime() }
    if (statusid == 1) obj.name = 'accepted'
    if (statusid == 3) obj.name = 'food_ready'
    if (statusid == 4) obj.name = 'dispatched'
    if (statusid == 5) obj.name = 'delivered'
    if (statusid == -1) obj.name = 'cancelled'
    order.OrderStatusId = statusid
    order.status = 'P'
    if (!order.changeditems) order.changeditems = []
    if (!order.changeditems.includes('orderstatus')) {
      order.changeditems.push('orderstatus')
    }
    if (order.events) order.events.push(obj)
    else {
      order.events = []
      order.events.push(obj)
    }
    this.auth.getpreorderby_id(order._id).subscribe(data => {
      order.OrderId = data['OrderId']
      if (order.OrderId > 0) {
        order.datastatus = 'edit_order'
      } else {
        order.datastatus = 'new_order'
      }
      this.auth.updatepreorders(order).subscribe(data => {
        this.sync.sync()
        this.getpreorders()
      })
    })
  }
  getUnfinishedOrders() {
    this.auth.getUnfinishedOrders(this.StoreId).subscribe(data => {
      console.log(data)
      var storedata = { preorders: [] }
      data["forEach"]((oj, index) => {
        // console.log(oj.Id,index, oj.OrderNo)
        if (oj.OrderJson) {
          var json = JSON.parse(oj.OrderJson)
          console.log(json.InvoiceNo, oj.OrderNo)
          json.datastatus = ''
          json.status = 'S'
          delete json._id
          storedata['preorders'].push(json)
        } else {
          // console.log(oj.OrderJson)
        }
      })

      this.auth.storeselect(storedata).subscribe(data1 => {
        this.getpreorders()
      })

    })
  }
  getOrderById(order) {
    order.loading = true
    this.auth.getOrderById(order.OrderId).subscribe(data => {
      // console.log(data, JSON.parse(data["OrderJson"]))
      var orderjson = JSON.parse(data["OrderJson"])
      orderjson._id = order._id
      orderjson.status = 'S'
      this.auth.updatepreorders(orderjson).subscribe(ldata => {
        this.getpreorders()
      })
    })
  }
  deletepreorder(order) {
    this.auth.deletepreorders(order._id).subscribe(data => {
      this.getpreorders()
    })
  }
  getpreorders() {
    this.auth.getdbdata(['preorders']).subscribe(dbdata => {
      this.preorders = dbdata['preorders']
      this.ordercount = {
        '2': { '-5': 0, '5': 0, '-1': 0, '-2': 0 },
        '3': { '-5': 0, '5': 0, '-1': 0, '-2': 0 },
        '4': { '-5': 0, '5': 0, '-1': 0, '-2': 0 },
      }
      this.preorders.forEach(order => {
        order.status_name = this.orderstatus[order.OrderStatusId].name
        order.deliverytimestamp = order.DeliveryDateTime
          ? new Date(order.DeliveryDateTime).getTime()
          : 0
        if (
          order.OrderStatusId == 5 &&
          (!order.DeliveryStoreId || order.StoreId == order.DeliveryStoreId)
        )
          this.ordercount[order.OrderTypeId.toString()]['5']++
        else if (
          order.OrderStatusId == -1 &&
          (!order.DeliveryStoreId || order.StoreId == order.DeliveryStoreId)
        )
          this.ordercount[order.OrderTypeId.toString()]['-1']++
        else if (!order.DeliveryStoreId || order.StoreId == order.DeliveryStoreId)
          this.ordercount[order.OrderTypeId.toString()]['-5']++
        else if (order.DeliveryStoreId && order.StoreId != order.DeliveryStoreId)
          this.ordercount[order.OrderTypeId.toString()]['-2']++
        // console.log(this.orderstatus[order.OrderStatusId].name)
      })
      this.preorders.sort((a, b) => {
        return new Date(a.DeliveryDateTime).getTime() - new Date(b.DeliveryDateTime).getTime()
      })
      if (this.orderpageid != 0)
        this.vieworderlist(this.orderpageid)
    })
  }
  print() {
    var printhtml = document.getElementById('kprintelcontainer').innerHTML
    // console.log(printhtml)
  }
  grouparray(id) {
    // console.log("qwerty")
    this.viewonlineorder(id)
    // var grouped = _.mapValues(_.groupBy(this.cars, 'make'))

    // // console.log(grouped)
  }
  clearorder(typeid) {
    this.orderlogging('clearing_order')
    this.visible = false
    this.placeorderclicked = false
    console.log(typeid)
    if (typeid == 5) {
      this.order = null
      this.createorder(typeid)
    } else if (typeid == 1) {
      this.auth.deletetblorder(this.order.diningtablekey).subscribe(data => {
        this.gettblorders()
      })
      this.order = null
      this.sectionid = 1
      this.orderpageid = typeid
    } else {
      this.order = null
      this.sectionid = 1
      this.orderpageid = typeid
    }
  }
  modalclose() {
    this.modalService.dismissAll()
  }

  // Online Order page BUtton text change function
  onlineusers: Array<any> = [
    {
      onlineactive: false,
    },
  ]

  onlineclick(onlineuser) {
    // var qq: string = 'ggg'
    // qq.startsWith()
    onlineuser.onlineactive = !onlineuser.onlineactive
  }

  // Autocomplete
  ////////////////////////typehead search////////////////////////
  acselectedpd: any
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => {
        if (term == '') return []
        if (term.includes('*')) {
          term = term.replace('*', '')
          return this.products.filter(x => x.ProductCode?.toLowerCase() == term.toLowerCase() && term != '')
        }
        if (term.includes(' ')) {
          var subterms = term.split(' ').filter(st => st != '')
          return this.products.filter(x => {
            var name_substring = x.Product.split(' ').filter(st => st != '')
            var match = true
            if (subterms.length > name_substring.length) match = false
            name_substring.forEach((ns, i) => {
              if (match && i < subterms.length)
                if (!ns.toLowerCase().startsWith(subterms[i].toLowerCase())) match = false
            })
            return match
          })
        } else {
          return this.products.filter(v => v.Product.toLowerCase().indexOf(term.toLowerCase()) > -1)
        }
      }),
    )

  formatter = (x: { Product: string }) => x.Product
  selectedItem(item) {
    // console.log(item)
    if (item.hasOwnProperty('OptionGroup')) {
      this.addProduct(item)
    } else {
      this.acselectedpd = item
      this.QuantityRef['nativeElement'].focus()
    }
  }
  addproductbyautocomplete() {
    if (this.QuantityRef['nativeElement'].value) {
      var options = {
        quantity: +this.QuantityRef['nativeElement'].value,
        key: '',
      }
      this.order.additem(this.acselectedpd, options)
      this.model = ''
      this.QuantityRef['nativeElement'].value = ''
      this.instance['_elementRef']['nativeElement'].focus()
    }
  }
  getprintersetting() {
    this.auth.getdbdata(['printersettings']).subscribe(data => {
      this.printersettings = data['printersettings'][0] ? data['printersettings'][0] : {}
    })
  }

  // Online Order modal
  // @ViewChild('cancelreason_modal', { static: false }) public cancelreason_modal: TemplateRef<any>
  // @ViewChild('viewonlineorder_modal', { static: false }) public viewonlineorder_modal: TemplateRef<
  //   any
  // >
  getcustomer() {
    this.auth.getCustomerByPhone(this.order.CustomerDetails.PhoneNo).subscribe(data => {
      // console.log(data)
      var customer: any = data[0]
      if (customer) {
        for (var key in this.order.CustomerDetails) this.order.CustomerDetails[key] = customer[key]
        this.savetblorder()
      }
    })
  }
  paidamountinputevent() {
    if (!this.order.PaidAmount) {
      this.order.PaidAmount = 0
      this.order.StorePaymentTypeId = 0
    }
  }
  //////////////////////////////////////Signal-R//////////////////////////////////////
  getstoreuporders() {
    this.auth.getstoreuporders(this.StoreId).subscribe(data => {
      var orders = []
      var newordercount = 0
      data['orders'].forEach(element => {
        var obj = {}

        Object.keys(element).forEach(key => {
          obj[key.charAt(0).toLowerCase() + key.slice(1)] = element[key]
        })
        orders.push(obj)
      })
      orders.forEach((element, index) => {
        if (element.orderStatusId == 0) newordercount++

        if (typeof element.json == 'string') {
          element.json = JSON.parse(element.json)
        }

        if (
          element.riderDetails != null &&
          element.riderDetails != '' &&
          typeof element.riderDetails == 'string'
        ) {
          element.riderDetails = JSON.parse(element.riderDetails)
        }
      })
      this.signal_r.startBot(data['orders'])
      this.onlineorders = orders
      // console.log(this.onlineorders)
      if (this.onlineorders.some(x => x.orderStatusId == 0)) {
        this.notification.startnotificationsound()
      }
      // if (this.onlineorders.some(x => x.orderStatusId == 0)) {
      this.onlinestatusid = [0]
      this.event.emitNotif({ newordercount: newordercount })
      // }
      this.filteronlineorders()
    })
  }
  // private hubRoom: string = '4/3'
  private StoreId: number = 0
  private CompanyId: number = 0
  private filteredonlineorders: any = []
  setsignalrconfig() {
    try {
      // console.log('configuiring signaLR')
      this.signal_r.hubconnection.onreconnected(connectionid => {
        // console.log(connectionid)
        this.getstoreuporders()
      })
      this.signal_r.hubconnection.on('NewOrder', (platform, id, storeid) => {
        // console.log(platform, id, storeid, this.StoreId)
        if (storeid == this.StoreId) {
          // console.log("NEW ORDER")
          this.getstoreuporders()
        }
      })
      this.signal_r.hubconnection.on('orderupdate', (orderid, storeid) => {
        // console.log("UPDATE ORDER", orderid, storeid)
        if (storeid == this.StoreId) {
          this.getstoreuporders()
        }
      })

      this.signal_r.hubconnection.on('DeliveryOrderUpdate', (fromstoreid, tostoreid, invoiceno) => {
        console.log('DeliveryOrderUpdate', fromstoreid, tostoreid, invoiceno)
        // if (tostoreid == this.StoreId) {
        //   this.auth.getorderbyinvoice(invoiceno).subscribe(data => {
        //     var order = JSON.parse(data["OrderJson"])
        //     this.auth.updatepreorderbyinvoice(order).subscribe(data => {
        //       this.getpreorders()
        //     })
        //   })
        // } else {
        //   if(this.preorders.some(x => x.InvoiceNo == invoiceno)) {
        //     this.auth.deletepreorderbyinvoice(invoiceno).subscribe(data => {
        //       this.getpreorders()
        //     })
        //   }
        // }
      })
    } catch (error) {
      // console.log(error)
    }
  }
  // getonlineorders() {
  //   // console.log(this.signal_r.isconnected, 'invoking order event')
  //   this.getstoreuporders()
  //   // if (this.signal_r.isconnected) {
  //   //   this.signal_r.hubConnection.invoke('GetStoreOrders', this.hubRoom, this.StoreId)
  //   // }
  // }
  filteronlineorders() {
    this.onlineorderscount = {
      placed: 0,
      inprogress: 0,
      completed: 0,
      cancelled: 0,
    }
    this.onlineorders.forEach((order, index) => {
      // order.json = JSON.parse(order.json)
      // order.rider_details = JSON.parse(order.riderDetails)
      // order.status_details = JSON.parse(order.acceptedTimeStamp)
      if (order.orderStatusId == 0) this.onlineorderscount.placed++
      if ([1, 3, 4].includes(order.orderStatusId)) this.onlineorderscount.inprogress++
      if (order.orderStatusId == 5) this.onlineorderscount.completed++
      if (order.orderStatusId == -1) this.onlineorderscount.cancelled++
    })
    this.filteredonlineorders = this.onlineorders.filter(x =>
      this.onlinestatusid.includes(x.orderStatusId),
    )
  }

  onlineorderstatuschange(orderid, statusid) {
    var statusdata = {
      new_status: '',
      message: '',
    }
    if (statusid == 1) {
      statusdata.new_status = 'Acknowledged'
      statusdata.message = 'Order Accepted from restaurant'
    } else if (statusid == 3) {
      statusdata.new_status = 'Food Ready'
      statusdata.message = 'Food prepared @Restaurant'
    } else if (statusid == 4) {
      statusdata.new_status = 'Dispatched'
      statusdata.message = 'Driver picked up the order'
    } else if (statusid == 5) {
      statusdata.new_status = 'Completed'
      statusdata.message = 'Order delivered to customer'
    } else if (statusid == -1) {
      statusdata.new_status = 'Cancelled'
      statusdata.message = this.cancelreason.message
    }
    if (statusid == 1) {
      this.temponlineorder = this.onlineorders.filter(x => x.uPOrderId == orderid)[0]
      this.temponlineorder.invoiceno =
        this.temponlineorder.json.order.details.channel.charAt(0).toUpperCase() +
        this.temponlineorder.json.order.details.ext_platforms[0].id
      this.temponlineorder.json.order.items.forEach(item => {
        item.baseprice = item.price
        item.showname = item.title
        item.options_to_add.forEach(option => {
          item.baseprice += option.price
          item.showname += '/' + option.title
        })
      })
      this.printonlineorderreceipt()
      this.printonlineorderkot()
    }

    this.auth
      .UPOrderStatusChange(
        orderid,
        JSON.stringify(statusdata),
        statusid,
        this.StoreId,
        this.CompanyId,
      )
      .subscribe(data => {
        // console.log(data)
        this.getstoreuporders()
        this.onlineorders.filter(x => x.uPOrderId == orderid)[0].orderStatusId = statusid
        this.filteronlineorders()
      })
  }
  temponlineorder
  cancelonlineorder(orderid) {
    this.temponlineorder = this.onlineorders.filter(x => x.uPOrderId == orderid)[0]
    this.modalService.open(this.cancelreason_modal, { centered: true })
  }
  viewonlineorder(orderid) {
    // console.log(orderid)
    this.temponlineorder = this.onlineorders.filter(x => x.uPOrderId == orderid)[0]
    this.temponlineorder.invoiceno =
      this.temponlineorder.json.order.details.channel.charAt(0).toUpperCase() +
      this.temponlineorder.json.order.details.ext_platforms[0].id
    this.temponlineorder.json.order.items.forEach(item => {
      item.baseprice = item.price
      item.showname = item.title
      item.options_to_add.forEach(option => {
        item.baseprice += option.price
        item.showname += '/' + option.title
      })
    })

    this.modalService.open(this.viewonlineorder_modal, { centered: true, size: 'xl' })
    localStorage.setItem('testonlineorder', JSON.stringify(this.temponlineorder))
  }
  deleteAggOrder(uporderid) {
    // console.log(uporderid)
    this.auth.deleteAggOrder(uporderid).subscribe(data => {
      this.getstoreuporders()
    })
  }
  printoonlineorder(type) {
    if (type == 'r') {
      var printhtml = document.getElementById('onlineorderreceipt').innerHTML
      printhtml += this.printhtmlstyle
      // console.log(printhtml)
      if (this.printersettings)
        this.printservice.print(printhtml, [this.printersettings.receiptprinter])
    }
  }
  printonlineorderkot() {
    var kottemplate = `
    <div id="printelement">
      <div class="header">
          <h3>ORDER TICKET #${this.temponlineorder.invoiceno}</h3>
          <table class="item-table">
              <tbody>
                  <tr class="nb">
                      <td class="text-left">${this.temponlineorder.json.order.details.channel}</td>
                      <td class="text-right">${this.temponlineorder.invoiceno}</td>
                  </tr>
                  <tr class="nb">
                      <td class="text-left">Time</td>
                      <td class="text-right">${moment(
      this.temponlineorder.json.order.details.created,
    ).format('LLL')}</td>
                  </tr>
              </tbody>
          </table>
      </div>
      <hr>`
    kottemplate += `
      <div class="text-center">ADDED ITEMS</div>
      <table class="item-table">
          <thead class="nb">
              <th class="text-left">ITEM</th>
              <th class="text-right">QTY</th>
          </thead>
          <tbody>
      `
    this.temponlineorder.json.order.items.forEach(ai => {
      kottemplate += `
        <tr class="nb">
            <td class="text-left">${ai.showname}</td>
            <td class="text-right">+${ai.quantity}</td>
        </tr>`
    })
    kottemplate += `
        </tbody>
      </table>
      <hr>
      `
    if (this.temponlineorder.json.order.details.instructions) {
      kottemplate += `
      <div>
          <p>${this.temponlineorder.json.order.details.instructions}</p>
      </div>
      <hr>
      `
    }
    kottemplate += `
      <div class="text-center">
          <p>Powered By Biz1Book.</p>
      </div>
    </div>
    `
    kottemplate += this.printhtmlstyle
    console.log(kottemplate)
    if (this.printersettings)
      this.printservice.print(kottemplate, [this.printersettings.kotprinter])
  }
  printonlineorderreceipt() {
    var printtemplate = `
    <div id="printelement">
    <div class="header">
        <h3>${this.loginfo.Company}</h3>
        <p>
            ${this.loginfo.Store}, ${this.loginfo.Address}<br>
            ${this.loginfo.City}, ${this.loginfo.ContactNo}
            GSTIN:${this.orderkey.GSTno}<br>
            Receipt: ${this.temponlineorder.invoiceno}<br>
            ${moment(this.temponlineorder.json.order.details.created).format('LLL')}
        </p>
    </div>
    <hr>
    <table class="item-table">
        <thead class="nb">
            <th class="text-left" style="width: 100px;">ITEM</th>
            <th>PRICE</th>
            <th>QTY</th>
            <th class="text-right">AMOUNT</th>
        </thead>
        <tbody>`
    this.temponlineorder.json.order.items.forEach(item => {
      printtemplate += `
      <tr class="nb">
          <td class="text-left">${item.showname}</td>
          <td class="text-right">${item.baseprice}</td>
          <td class="text-right">${item.quantity}</td>
          <td class="text-right">${item.total}</td>
      </tr>`
    })
    printtemplate += `
    <tr class="bt">
        <td class="text-left"><strong>Sub Total</strong></td>
        <td colspan="2"></td>
        <td class="text-right">${this.temponlineorder.json.order.details.order_subtotal}</td>
    </tr>
    <tr class="nb" ${this.temponlineorder.json.order.details.total_external_discount == 0 ? 'hidden' : ''
      }>
        <td class="text-left"><strong>Discount</strong></td>
        <td colspan="2"></td>
        <td class="text-right">${this.temponlineorder.json.order.details.total_external_discount
      }</td>
    </tr>
    <tr class="nb" ${this.temponlineorder.json.order.details.total_taxes == 0 ? 'hidden' : ''}>
        <td class="text-left"><strong>CGST</strong></td>
        <td colspan="2"></td>
        <td class="text-right">${this.temponlineorder.json.order.details.total_taxes / 2}</td>
    </tr>
    <tr class="nb" ${this.temponlineorder.json.order.details.total_taxes == 0 ? 'hidden' : ''}>
        <td class="text-left"><strong>SGST</strong></td>
        <td colspan="2"></td>
        <td class="text-right">${this.temponlineorder.json.order.details.total_taxes / 2}</td>
    </tr>`
    this.temponlineorder.json.order.details.charges.forEach(charge => {
      printtemplate += `
          <tr class="nb">
              <td class="text-left"><strong>${charge.title}</strong></td>
              <td colspan="2"></td>
              <td class="text-right">${charge.value}</td>
          </tr>`
    })
    printtemplate += `
          <tr class="nb">
              <td class="text-left"><strong>Total</strong></td>
              <td colspan="2"></td>
              <td class="text-right">${this.temponlineorder.json.order.details.order_total}</td>
          </tr>
        </tbody>
      </table>
      <hr>
      <div class="text-center">
        <p>Powered By Biz1Book.</p>
      </div>
    </div>`
    printtemplate += this.printhtmlstyle
    // console.log(printtemplate)
    if (this.printersettings)
      this.printservice.print(printtemplate, [this.printersettings.receiptprinter])
  }
  // startTimer() {
  //   var interval: NodeJS.Timeout = setInterval(() => {
  //     if(this.timeLeft > 0) {
  //       this.timeLeft--;
  //     } else {
  //       this.timeLeft = 60;
  //     }     s   a  n  t   h  o  s   h
  //   },1000) ari ka to chi ri mo ari ri
  // }
  timer(timestamp) { }

  /////////////////////////DATERANGEPICKER/////////////////////////
  onDateSelection(date: NgbDate, datepopup) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date
    } else if (
      this.fromDate &&
      !this.toDate &&
      (date == this.fromDate || date.after(this.fromDate))
    ) {
      this.toDate = date
      datepopup.toggle()
    } else {
      this.toDate = null
      this.fromDate = date
    }
    this.daterangeshow = ''
    if (this.fromDate)
      this.daterangeshow =
        moment(`${this.fromDate.year}-${this.fromDate.month}-${this.fromDate.day}`).format(
          'Do MMM YYYY',
        ) + ' - '
    if (this.toDate)
      this.daterangeshow += moment(
        `${this.toDate.year}-${this.toDate.month}-${this.toDate.day}`,
      ).format('Do MMM YYYY')
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    )
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate)
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    )
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.dFormatter.parse(input)
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue
  }

  cleardatefilter(e) {
    this.datefilterfield = ''
    this.fromDate = null
    this.toDate = null
    this.daterangeshow = ''
  }
  errorlo_g(num) {
    var numbr: number = 0
    numbr = 8 / num
  }
}

//////////////////////////////////////GROUP AN OBJECT ARRAY BY A KEY//////////////////////////////////////
// var grouped = _.mapValues(_.groupBy(this.cars, 'make'),
// clist => clist.map(car => _.omit(car, 'make')));
