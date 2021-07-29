export class AddonModule {
  Id: number;
  Price: number;
  TakeawayPrice: number;
  name: number;
  //StatusId: number;

  constructor(obj: any) { }
}

export class AddonGroupModule {
  Id: number;
  name: string;
  Addon: Array<AddonModule>;
  constructor(obj: any) { }
}

export class VariantModule {
  Id: number;
  Price: number;
  TakeawayPrice: number;
  name: string;
  constructor(obj) { }
}

export class VariantGroupModule {
  Key: string;
  Id: number;
  name: string;
  Variant: Array<VariantModule>;
  constructor(obj: any) { }
}

export class OptionGroupModule {
  Id: number;
  Name: string;
  Option: Array<OptionModule>;
  OptionGroupType: number;
  selected: number;
  constructor(obj: any) { }
}

export class OptionModule {
  Id: number;
  Price: number;
  TakeawayPrice: number;
  DeliveryPrice: number;
  Name: string;
  selected: number;
  orderitemrefid: string;
  constructor(obj) { }
}

export class OrderItemModule {
  id: number;
  Key: string;
  operationFlag: number;
  ProductId: string;
  Product: string;
  Quantity: number;
  Price: number;
  isTaxDiscIncl: boolean;
  StatusId: number;
  KOTId: number = 2;
  DiscType: number = 1;
  DiscPercent: number;
  DiscAmount: number = 0;
  Discount: number = 0;
  TotalPrice: number = 0;
  VariantGroup: Array<VariantGroupModule>;
  AddonGroup: Array<AddonGroupModule>;
  OptionGroup: Array<OptionGroupModule>;
  ValData: any = { Variant: 0, Quantity: 0 };
  KOTNo: number;
  KOTGroupId: number;
  ComplementryQty: number;
  MinimumQty: number;
  FreeQtyPercentage: number;
  TaxGroupId: number;
  TotalAmount: number = 0;
  Tax1: number;
  Tax2: number;
  Tax3: number;
  Note: string;
  ItemDiscount: number;
  OrderDiscount: number;
  TaxItemDiscount: number;
  TaxOrderDiscount: number;
  Extra: number = 0;
  Message: string;
  ProductTypeId: number;
  kotrefid: string;
  refid: string;
  constructor(ProductObj: any, qty: number) { }
}
export class SplitPaymentModule {
  Amount: number;
  PaymentId: number;
  constructor(obj: any) { }
}
export class AdditionalChargeModule {
  ChargeType: number;
  ChargeValue: number;
  ChargeAmount: number;
  Description: string;
  Id: number;
  TaxGroupId: number;
  constructor(obj: any) { }
}
export class KOTModule {
  Id: number;
  KOTNo: number;
  KotStatusId: number;
  item: Array<OrderItemModule>;
  KOTGroupId: number;
  dirtystatus: number = 0;
  orderrefid: string;
  refid: string;
  constructor(item) { }
}
export class CustomerModule {
  Id: number;
  Name: string;
  Email: string;
  PhoneNo: string;
  Address: string;
  City: string;
  PostalCode: number;
  googlemapurl: string;
  CompanyId: number;
  StoreId: number;
  Sync: number;
  val: number;
  constructor(compId, strId, val) { }
}
export class OrderModule {
  Id: number;
  OrderId: number;
  OrderTypeId: number = 1;
  OrderedDate: string;
  OrderedDateTime: string;
  DeliveryDate: string;
  DeliveryTime: string;
  DeliveryDateTime: string;
  OrderStatusId: number = 1;
  DiscType: number = 1;
  DiscPercent: number;
  DiscAmount: number = 0;
  OrderDiscount: number = 0;
  OrderTotDisc: number = 0;
  OrderTaxDisc: number = 0;
  ItemDiscount: number = 0;
  AddCharge: number = 0;
  CouponCode: string;
  CouponDiscAmount: number = 0;
  Tax1: number;
  Tax2: number;
  Tax3: number;
  StoreId: number;
  CustomerId: number;
  CustomerNo: number;
  CustomerDetails: CustomerModule;
  CustomerName: string = "";
  CustomerPhoneNo: any = "";
  CustomerEmail: string = "";
  CustomerAddress: string = "";
  CustomerCity: string = "";
  CustomerPostalCode: string = "";
  CompanyId: number = 1;
  BillAmount: number;
  PaidAmount: number;
  BillDateTime: string;
  BillDate: string;
  BillStatusId: number = 20;
  DiningTableId: number = 1;
  SplitTableId: number = 1;
  WaiterId: number = null;
  CashierId: number = JSON.parse(localStorage.getItem("user")).Id;
  Note: string;
  item: Array<OrderItemModule>;
  splitPayment: Array<SplitPaymentModule>;
  CurrentItem: OrderItemModule;
  AdditionalCharge: Array<AdditionalChargeModule>;
  KOT: Array<KOTModule>;
  issync: number;
  islive: number;
  InvoiceNo: string;
  //AddCharge:number
  ValData: Object;
  Cash: number;
  Card: number;
  Credit: number;
  PaymentTypeId: number;
  StorePaymentTypeId: number;
  Discount: number;
  OrderNo: number;
  UserId: number = JSON.parse(localStorage.getItem("user")).Id;
  Taxes: number;
  IsAdvanceOrder: boolean;
  Closed: boolean;
  isTaxDiscIncl: boolean;
  AllItemDisc: number;
  AllItemTaxDisc: number;
  AllItemTotalDisc: number;
  Message: string;
  Hash_Key: string;
  changelevelid: number = 0;
  SourceId = 0;
  kots: any[];
  items: any[];
  options: any[];
  constructor(obj, public taxGroup) { }
}