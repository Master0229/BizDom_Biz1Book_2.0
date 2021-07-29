import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'parentcategory',
})
export class ParentcategoryfilterPipe implements PipeTransform {
  transform(childcategories: any[], parentcategoryid: number): any[] {
    if (!childcategories) return []

    return childcategories.filter(x => x.ParentId == parentcategoryid)
  }
}

@Pipe({
  name: 'productfilter',
})
export class ProductfilterPipe implements PipeTransform {
  transform(products: any[], categoryid: number): any[] {
    if (!products) return []

    if (categoryid == 0) return products

    return products.filter(x => x.ParentCategoryId == categoryid || x.CategoryId == categoryid)
  }
}

@Pipe({
  name: 'ordertype',
})
export class OrderTypePipe implements PipeTransform {
  transform(
    orders: any[],
    ordertypeid: number,
    orderstatusfilterid: number,
    searchterm: string,
    from: any,
    to: any,
    datefilterfiled: string,
    refreshlist: boolean
  ): any[] {
    var _lTerm: string = searchterm.toLowerCase()
    var _filteredorders = []
    if (!orders) return []
    console.log(orders[0].OrderNo)
    if (orderstatusfilterid != -2) {
      _filteredorders = orders.filter(
        x =>
          (x.StoreId == x.DeliveryStoreId || !x.DeliveryStoreId) &&
          x.OrderTypeId == ordertypeid &&
          this.datefilter(from, to, x[datefilterfiled]) &&
          (x.OrderStatusId == orderstatusfilterid ||
            orderstatusfilterid == 0 ||
            (orderstatusfilterid == -5 && [1, 2, 3, 4].includes(x.OrderStatusId))),
      )
    } else {
      _filteredorders = orders.filter(x => x.DeliveryStoreId && x.StoreId != x.DeliveryStoreId)
    }
    return _filteredorders.filter(
      x =>
        x.InvoiceNo.toLowerCase().includes(_lTerm) ||
        x.CustomerDetails.Name.toLowerCase().includes(_lTerm) ||
        x.CustomerDetails.PhoneNo.toLowerCase().includes(_lTerm) ||
        !_lTerm,
    )
  }

  datefilter(from, to, checkdate) {
    var fromstamp = from ? new Date(`${from.year}-${from.month}-${from.day}`).getTime() : null
    var tostamp = to
      ? new Date(`${to.year}-${to.month}-${to.day}`).getTime() + 86400000
      : from
      ? new Date(`${from.year}-${from.month}-${from.day}`).getTime() + 86400000
      : null
    var orderedstamp = new Date(checkdate).getTime()
    var isvalid = false
    if (
      (orderedstamp >= fromstamp || fromstamp == null) &&
      (orderedstamp <= tostamp || tostamp == null)
    ) {
      isvalid = true
    }
    return isvalid
  }
}

@Pipe({
  name: 'diningtable',
})
export class DiningTablePipe implements PipeTransform {
  transform(tables: any[], diningareaid: number, tablestatusid: number): any[] {
    if (!tables) return []

    return tables.filter(
      x =>
        x.DiningAreaId == diningareaid && (x.TableStatusId == tablestatusid || tablestatusid == -1),
    )
  }
}

@Pipe({
  name: 'preptime',
})
export class PrepTimePipe implements PipeTransform {
  transform(elspsedmilliseconds: number, prepmins: number): string {
    var time: string = '00:00'
    var currentseconds = prepmins - +(elspsedmilliseconds / 1000).toFixed(0)
    if (currentseconds > 0) {
      var seconds = currentseconds % 60
      var minutes = (currentseconds - seconds) / 60
      time =
        (minutes.toString().length == 1 ? '0' : '') +
        minutes +
        ':' +
        (seconds.toString().length == 1 ? '0' : '') +
        seconds
    }
    return time
  }
}

@Pipe({
  name: 'stamp',
})
export class StampPipe implements PipeTransform {
  transform(stamp: number): string {
    var parsedStamp: string = ''
    var totalseconds: number = +(stamp / 1000).toFixed(0)
    var seconds: number = 0
    var minutes: number = 0
    var hours: number = 0
    seconds = totalseconds % 60
    var totalminutes = totalseconds > 60 ? +(totalseconds / 60).toFixed(0) : 0
    minutes = totalminutes % 60
    var totalhours = totalminutes > 60 ? +(totalminutes / 60).toFixed(0) : 0
    hours = totalhours % 24
    var days = totalhours > 24 ? +(totalhours / 24).toFixed(0) : 0
    parsedStamp += `${days} D ${hours}:${minutes}:${seconds}`
    return parsedStamp
  }
}
