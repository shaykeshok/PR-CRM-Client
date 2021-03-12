import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'btn-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent implements OnInit {

  constructor() { }
  @Input() label = '';
  @Input() icon = '';
  @Input() btnStyle = { width: '252px', height: ' 38px' };
  @Input() rippel: '#b3b2b2';
  @Input() path = 'assets/svg/';
  ngOnInit() {
  }

}
