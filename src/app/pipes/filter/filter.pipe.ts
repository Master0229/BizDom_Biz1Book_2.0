import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: any[], searchterm: string): any[] {
    if (!products) return []

    if (searchterm == '' || searchterm == null) return products

    return products.filter(x => x.Description.toLowerCase().includes(searchterm.toLowerCase()));
  }

}
