import { Component } from '@angular/core'

@Component({
  selector: 'kit-antd-list-example',
  templateUrl: './list.component.html',
})
export class KitAntdListExampleComponent {
  loading = false
  data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ]

  data2 = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ]

  change(): void {
    this.loading = true
    if (this.data.length > 0) {
      setTimeout(() => {
        this.data = []
        this.loading = false
      }, 1000)
    } else {
      setTimeout(() => {
        this.data = [
          {
            title: 'Ant Design Title 1',
          },
          {
            title: 'Ant Design Title 2',
          },
          {
            title: 'Ant Design Title 3',
          },
          {
            title: 'Ant Design Title 4',
          },
        ]
        this.loading = false
      }, 1000)
    }
  }
}
