import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core'
import { NzInputDirective } from 'ng-zorro-antd'

@Component({
  selector: 'kit-antd-table-editable-cells',
  templateUrl: './editable-cells.component.html',
  styles: [
    `
      button {
        margin-bottom: 16px;
      }

      .editable-cell {
        position: relative;
      }

      .editable-cell-value-wrap {
        padding: 5px 12px;
        cursor: pointer;
      }

      .editable-row:hover .editable-cell-value-wrap {
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        padding: 4px 11px;
      }
    `,
  ],
})
export class KitAntdTableEditableCellsComponent implements OnInit {
  i = 0
  editId: string | null
  listOfData: any[] = []
  @ViewChild(NzInputDirective, { read: ElementRef }) inputElement: ElementRef

  @HostListener('window:click', ['$event'])
  handleClick(e: MouseEvent): void {
    if (this.editId && this.inputElement && this.inputElement.nativeElement !== e.target) {
      this.editId = null
    }
  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: `${this.i}`,
        name: `Edward King ${this.i}`,
        age: '32',
        address: `London, Park Lane no. ${this.i}`,
      },
    ]
    this.i++
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id)
  }

  startEdit(id: string, event: MouseEvent): void {
    event.preventDefault()
    event.stopPropagation()
    this.editId = id
  }

  ngOnInit(): void {
    this.addRow()
    this.addRow()
  }
}
