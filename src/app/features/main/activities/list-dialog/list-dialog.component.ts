import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/common/Customer.model';

@Component({
  selector: 'app-list-dialog',
  templateUrl: './list-dialog.component.html',
  styleUrls: ['./list-dialog.component.scss']
})
export class ListDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public JBIlist: Customer ) { }

  ngOnInit() {
  }

}
