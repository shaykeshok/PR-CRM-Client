import { Component, Input, OnInit } from '@angular/core';
import { EventPR } from 'src/app/common/EventPR.model';
export type TAction = 'view' | 'replay' | 'click';

@Component({
  selector: 'app-event-status',
  templateUrl: './event-status.component.html',
  styleUrls: ['./event-status.component.scss']
})
export class EventStatusComponent implements OnInit {
  @Input() event: EventPR;
  actions: TAction[] = [
    'view',
    'replay',
    'click'
  ];

  title = {
    view: 'View',
    replay: 'Replay',
    click: 'Click'
  };
  count = {
    view: 0,
    replay: 0,
    click: 0,
  };
  constructor() { }

  ngOnInit() {
    this.count.view = this.event.view;
    this.count.replay = this.event.replay;
    this.count.click = this.event.click;
  }



}
