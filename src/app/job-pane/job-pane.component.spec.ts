import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPaneComponent } from './job-pane.component';

describe('JobPaneComponent', () => {
  let component: JobPaneComponent;
  let fixture: ComponentFixture<JobPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPaneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
