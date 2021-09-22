import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Templates } from 'src/app/common/interfaces.interface';
import { ActivityService } from 'src/app/service/activity.service';



@Component({
  selector: 'app-templates-dialog',
  templateUrl: './templates-dialog.component.html',
  styleUrls: ['./templates-dialog.component.scss']
})
export class TemplatesDialogComponent implements OnInit {
  Templates$: Observable<Templates[]>;


  constructor(
    public dialogRef: MatDialogRef<TemplatesDialogComponent>,
    public activityService: ActivityService
  ) { }

  ngOnInit() {
    this.Templates$ = this.activityService.getTemplates();
  }

  chooseRow(templateId: number) {
    console.log(templateId);
    this.dialogRef.close(templateId);
  }

  skip() {
    console.log('skip');
    this.dialogRef.close(0);
  }

}
