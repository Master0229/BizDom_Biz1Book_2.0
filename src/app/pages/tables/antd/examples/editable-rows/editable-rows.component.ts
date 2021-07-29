import { Component, OnInit } from '@angular/core'
import { AuthService } from "src/app/auth.service";

@Component({
  selector: 'kit-antd-table-editable-rows',
  templateUrl: './editable-rows.component.html',
  styles: [
    `
      .editable-row-operations a {
        margin-right: 8px;
      }
    `,
  ],
})
export class KitAntdTableEditableRowsComponent implements OnInit {
  editCache: { [key: string]: any } = {}
  listOfData: any[] = []

  startEdit(id: string): void {
    this.editCache[id].edit = true
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id)
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false,
    }
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id)
    Object.assign(this.listOfData[index], this.editCache[id].data)
    this.editCache[id].edit = false
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      }
    })
  }

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.listOfData.push({
        id: `${i}`,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      })
    }
    this.updateEditCache()
  }
}
