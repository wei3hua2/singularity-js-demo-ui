import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobResultStepComponent } from './job-result-step.component';

describe('JobResultStepComponent', () => {
  let component: JobResultStepComponent;
  let fixture: ComponentFixture<JobResultStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobResultStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobResultStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
