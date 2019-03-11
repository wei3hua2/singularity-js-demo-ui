import { Component, OnInit } from '@angular/core';
import { Store, createSelector, select } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { ActivatedRoute, Router } from '@angular/router';
import {Service, Channel} from 'singnet-js/dist/models';
import {Observable} from 'rxjs';
import {first, take, map, takeUntil} from 'rxjs/operators';
import {InitSvcOrg, InitSvc, RunSvcJob, LoadSvcChannels} from '../reducers/svc.actions';
import _ from 'lodash';
import {ServiceJobState} from '../reducers/index';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  orgId: string;
  serviceId: string;
  method: string;

  svc$: Observable<Service>;
  methods$: Observable<any[]>;
  currentJob$: Observable<any>;
  channels$: Observable<Channel[]>;

  selectedMethod: any;

  constructor(private store: Store<fromRoot.State>, private route: ActivatedRoute, private rtr: Router) {
    this.orgId = this.route.snapshot.paramMap.get('oId');
    this.serviceId = this.route.snapshot.paramMap.get('sId');

    this.method = this.route.snapshot.paramMap.get('method');
  }

  ngOnInit() {
    const getServices = (state) => state.services;
    const svcByOrgSvcId = createSelector(getServices, 
      (svcs, props) => _.find(svcs, {'id': props.serviceId, 'organizationId': props.orgId}));
    const currentJob = createSelector(svcByOrgSvcId, (svc) => svc ? svc.currentJob : svc);

    this.svc$ = this.store.pipe(select(svcByOrgSvcId, {serviceId: this.serviceId, orgId: this.orgId}));
    this.currentJob$ = this.store.pipe(select(currentJob, {serviceId: this.serviceId, orgId: this.orgId}));
    this.methods$ = this.svc$.pipe(map((svc) => svc && svc.info && svc.info.methods  ));
    this.channels$ = this.svc$.pipe(map((svc) => svc && svc.channels  ));

    this.store.dispatch(new InitSvc([this.orgId, this.serviceId]));


    const subscription = this.svc$.subscribe(
      (svc) => {
        if (svc) {
          console.log(svc.svc);
          this.store.dispatch(new LoadSvcChannels(svc.svc));
          subscription.unsubscribe();
        }
      }
    );
    
  }

  selectMethod(method) {
    this.selectedMethod = method;
  }

  runJob(fields) {
    const opts = {use_channel_id: 1228};
    const method = this.selectedMethod.key;
    const request = _.mapValues(fields.fields, 'value');

    this.svc$.pipe( take(1)).subscribe((s) => {
      this.store.dispatch(new RunSvcJob([s.svc, method, request, opts]));
    });
  }

}
