import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodResponseFieldComponent } from './method-response-field.component';

describe('MethodResponseFieldComponent', () => {
  let component: MethodResponseFieldComponent;
  let fixture: ComponentFixture<MethodResponseFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodResponseFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodResponseFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
