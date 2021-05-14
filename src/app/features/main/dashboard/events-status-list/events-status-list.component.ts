import { Component, OnInit } from '@angular/core';
const EVENTS = [
  {name:'event1', publishDate:'15/01/21', view:12, replay:5, click:4 },
  {name:'event2', publishDate:'21/02/21', view:9, replay:8, click:7 },
  {name:'event3', publishDate:'10/03/21', view:20, replay:10, click:6 },
]
@Component({
  selector: 'app-events-status-list',
  templateUrl: './events-status-list.component.html',
  styleUrls: ['./events-status-list.component.scss']
})
export class EventsStatusListComponent implements OnInit {
  events = EVENTS;
  constructor() { }

  ngOnInit() {
  }

}
