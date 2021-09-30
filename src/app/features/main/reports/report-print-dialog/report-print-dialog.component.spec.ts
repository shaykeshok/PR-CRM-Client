import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPrintDialogComponent } from './report-print-dialog.component';

describe('ReportPrintDialogComponent', () => {
  let component: ReportPrintDialogComponent;
  let fixture: ComponentFixture<ReportPrintDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportPrintDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportPrintDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
