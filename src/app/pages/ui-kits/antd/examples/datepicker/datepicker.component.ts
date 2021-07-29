import { Component } from '@angular/core'
import { getISOWeek } from 'date-fns'
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd/i18n'

@Component({
  selector: 'kit-antd-datepicker-example',
  templateUrl: './datepicker.component.html',
})
export class KitAntdDatePickerExampleComponent {
  date = null // new Date();
  dateRange = [] // [ new Date(), addDays(new Date(), 3) ];

  constructor(private i18n: NzI18nService) {}

  onChange(result: Date): void {
    console.log('onChange: ', result)
  }

  getWeek(result: Date): void {
    console.log('week: ', getISOWeek(result))
  }
}
