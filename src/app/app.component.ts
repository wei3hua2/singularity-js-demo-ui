import { Component } from '@angular/core';
import {SnetService} from './snet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'singularity-js-demo-ui';

  constructor(snet: SnetService) {
    // console.log(snet);
  }
}
