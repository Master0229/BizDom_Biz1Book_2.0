import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'kit-antd-transfer-example',
  templateUrl: './transfer.component.html',
})
export class KitAntdTransferExampleComponent implements OnInit {
  list: any[] = []
  disabled = false
  items = [2, 3]
  ngOnInit(): void {
    for (let i = 0; i < 20; i++) {
      this.list.push({
        key: i.toString(),
        title: `content${i + 1}`,
        disabled: i % 3 < 1,
      })
    }

    this.items.forEach(idx => (this.list[idx].direction = 'right'))
  }

  select(ret: {}): void {
    console.log('nzSelectChange', ret)
  }

  change(ret: {}): void {
    console.log('nzChange', ret)
  }
}
