import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'job-input',
  templateUrl: './job-input.component.html',
  styleUrls: ['./job-input.component.scss']
})
export class JobInputComponent implements OnInit {

  @Input()
  expanded: boolean;

  @Input()
  request;

  @Input()
  channels;

  @Output()
  runJob: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
