import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'job-result-step',
  templateUrl: './job-result-step.component.html',
  styleUrls: ['./job-result-step.component.scss']
})
export class JobResultStepComponent implements OnInit {

  @Input()
  step;

  constructor() {}

  ngOnInit() {
  }

}
