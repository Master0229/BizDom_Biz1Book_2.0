import { Component, ElementRef, Renderer2, OnInit } from '@angular/core'

@Component({
  selector: 'app-todoist-list',
  templateUrl: './todoist-list.component.html',
  styleUrls: ['./todoist-list.component.scss'],
})
export class TodoistListComponent implements OnInit {
  options: any = {}
  showInput = false
  current = [
    {
      name: 'Level 1',
      expanded: true,
      children: [
        {
          name: 'Level 2',
          expanded: true,
        },
      ],
    },
    {
      name: 'Level 1',
      expanded: true,
      children: [{ name: 'Level 2' }, { name: 'Level 2' }, { name: 'Level 2' }],
    },
  ]

  completed = [
    { name: 'Level 0', checked: true },
    { name: 'Level 0', checked: true },
    { name: 'Level 0', checked: true },
  ]

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.listen(this.el.nativeElement, 'listUpdated', e => {
      this.current = e.detail.current
    })
  }

  ngOnInit() {}

  toggleInput() {
    this.showInput = !this.showInput
  }

  addTask(value: string) {
    if (value.trim() !== '') {
      this.current.push({ name: value, children: [], expanded: true })
      this.current = [...this.current]
    }
  }
}
