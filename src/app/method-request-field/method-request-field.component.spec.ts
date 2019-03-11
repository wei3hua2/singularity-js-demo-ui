import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodRequestFieldComponent } from './method-request-field.component';

describe('MethodRequestFieldComponent', () => {
  let component: MethodRequestFieldComponent;
  let fixture: ComponentFixture<MethodRequestFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodRequestFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodRequestFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
