import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobInputDetailComponent } from './job-input-detail.component';

describe('JobInputDetailComponent', () => {
  let component: JobInputDetailComponent;
  let fixture: ComponentFixture<JobInputDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobInputDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobInputDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
