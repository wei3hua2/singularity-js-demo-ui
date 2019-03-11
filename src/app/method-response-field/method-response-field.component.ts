import { Input, Component, OnInit } from '@angular/core';

@Component({
  selector: 'method-response-field',
  templateUrl: './method-response-field.component.html',
  styleUrls: ['./method-response-field.component.scss']
})
export class MethodResponseFieldComponent implements OnInit {

  @Input()
  field;

  constructor() { }

  ngOnInit() {
  }

}
