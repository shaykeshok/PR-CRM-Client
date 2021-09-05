import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Ilist } from '../common.model';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss']
})
export class ListContainerComponent implements OnInit {





  // inputs:
  @Input() icon: string;
  @Input() data: Ilist[];
  @Input() withChangeOrder: boolean;
  @Input() maxHeight: number;

  // outputs:
  @Output() action: EventEmitter<any> = new EventEmitter();
  @Output() orderChange: EventEmitter<any> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }


  // functions:
  toggle(event) {
    this.action.emit(event);
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
    this.orderChange.emit(this.data);
  }

}
