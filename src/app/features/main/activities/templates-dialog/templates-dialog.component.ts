import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';

interface Templates {
  TemplateId: number;
  Issue: string;
}
const DATA: Templates[] = [{
  TemplateId: 1,
  Issue: 'Templates1',
}, {
  TemplateId: 2,
  Issue: 'Templates2',
}
  , {
  TemplateId: 3,
  Issue: 'Templates3',
}
  , {
  TemplateId: 4,
  Issue: 'Templates4',
}
  , {
  TemplateId: 5,
  Issue: 'Templates5',
}
  , {
  TemplateId: 6,
  Issue: 'Templates6',
}
  , {
  TemplateId: 7,
  Issue: 'Templates7',
}];

@Component({
  selector: 'app-templates-dialog',
  templateUrl: './templates-dialog.component.html',
  styleUrls: ['./templates-dialog.component.scss']
})
export class TemplatesDialogComponent implements OnInit {
  displayedColumns: string[] = ['No', 'Issue'];
  data: Templates[] = DATA;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<TemplatesDialogComponent>,) { }

  ngOnInit() {
  }

  chooseRow(row) {
    console.log(row);
    this.dialogRef.close(row.TemplateId);
  }

  skip() {
    console.log('skip');
    this.dialogRef.close(0);
  }

}
