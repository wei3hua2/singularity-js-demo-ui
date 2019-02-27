import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { ActivatedRoute, Router } from '@angular/router';
import {Service} from 'singnet-js/dist/models';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';
import {InitSvc} from '../reducers/svc.actions';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  orgId: string;
  serviceId: string;
  svc$: Observable<Service>

  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute, private rtr: Router) {
    this.orgId = this.route.snapshot.paramMap.get('oId');
    this.serviceId = this.route.snapshot.paramMap.get('sId');
  }

  ngOnInit() {
    this.svc$ = this.store.select<Service>(state => state.service.svcOrg[this.orgId][this.serviceId]);

    this.svc$.pipe(first())
      .subscribe((s) => this.store.dispatch(new InitSvc(s)));

    this.svc$.subscribe(console.log);
  }


}
