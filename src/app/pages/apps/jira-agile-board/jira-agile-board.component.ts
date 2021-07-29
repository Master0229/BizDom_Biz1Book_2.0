import { Component, OnInit } from '@angular/core'
import { SortablejsOptions } from 'ngx-sortablejs'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-jira-agile-board',
  templateUrl: './jira-agile-board.component.html',
  styleUrls: ['./jira-agile-board.component.scss'],
})
export class JiraAgileBoardComponent implements OnInit {
  tasks = data
  backlog = this.tasks.backlog
  todo = this.tasks.todo
  progress = this.tasks.progress
  completed = this.tasks.completed

  options: SortablejsOptions = {
    group: 'agile-board',
  }

  constructor() {}
  ngOnInit() {}
}
