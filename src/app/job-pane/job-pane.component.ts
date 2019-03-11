import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'job-pane',
  templateUrl: './job-pane.component.html',
  styleUrls: ['./job-pane.component.scss']
})
export class JobPaneComponent implements OnInit {

  expanded: boolean;

  @Input()
  method;

  @Input()
  service;

  @Input()
  channels;

  @Output()
  runJob: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.expanded = false;
  }

  exeRunJob(evt) {
    this.expanded = !this.expanded;
    this.runJob.emit(evt);
  }

}
