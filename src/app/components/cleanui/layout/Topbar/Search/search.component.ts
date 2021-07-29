import { Component, ViewChild, ElementRef } from '@angular/core'

@Component({
  selector: 'cui-topbar-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class TopbarSearchComponent {
  @ViewChild('liveSearchInput') liveSearchInput: ElementRef

  showSearch: boolean = false
  searchText: string = ''

  constructor() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this), false)
  }

  setVisible() {
    this.showSearch = true
    setTimeout(() => {
      this.liveSearchInput.nativeElement.focus()
    }, 100)
  }

  setHidden() {
    this.showSearch = false
  }

  handleKeyDown(event: any) {
    if (this.showSearch) {
      const key = event.keyCode.toString()
      if (key === '27') {
        this.setHidden()
      }
    }
  }
}
