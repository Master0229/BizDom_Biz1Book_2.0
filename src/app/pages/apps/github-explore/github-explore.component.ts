import { Component, OnInit } from '@angular/core'
declare var require: any
const data: any = require('./data.json')

@Component({
  selector: 'app-github-explore',
  templateUrl: './github-explore.component.html',
})
export class GithubExploreComponent implements OnInit {
  files = data
  constructor() {}
  ngOnInit() {}
}
