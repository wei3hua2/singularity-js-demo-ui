import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'method-request-field',
  templateUrl: './method-request-field.component.html',
  styleUrls: ['./method-request-field.component.scss']
})
export class MethodRequestFieldComponent implements OnInit {

  fieldUI;

  _field;
  @Input('field')
  get field() {
    return this._field;
  }
  set field(field) {
    this._field = field;
    this.mapFieldUI(field);
  }

  // _val;
  // @Input('value')
  // get value() {
  //   return this._val;
  // }
  // set value(val) {
  //   this._val = val;
  // }

  constructor() { }

  ngOnInit() {
  }

  private mapFieldUI(field) {
    const name = field.key;
    const type = field.value.type, required = field.value.required, optional = field.value.optional;
    
    let uiType = 'string';
    if (type === 'float') uiType = 'number'; 

    this.fieldUI = {
      type: uiType
    };
  }
}
