import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsStatusListComponent } from './events-status-list.component';

describe('EventsStatusListComponent', () => {
  let component: EventsStatusListComponent;
  let fixture: ComponentFixture<EventsStatusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsStatusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
