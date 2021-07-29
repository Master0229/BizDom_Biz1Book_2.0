import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-helpdesk-dashboard',
  templateUrl: './helpdesk-dashboard.component.html',
})
export class HelpdeskDashboardComponent implements OnInit {
  requests = data
  options: any = {}
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.listen(this.el.nativeElement, 'listUpdated', e => {
      this.checklist = e.detail.checklist
    })
  }

  checklist = [
    { name: 'IT Manager', checked: true },
    {
      name: 'Regional Managers',
      expanded: true,
      children: [
        { name: 'Branch Manager', checked: true },
        { name: 'QA Engineer', checked: true },
        { name: 'Network Administrator', checked: false },
        { name: 'Project Manager', checked: false },
        { name: 'Team Leader', checked: true },
      ],
    },
  ]
  ngOnInit() {}
}
