import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Organization, Service} from 'singnet-js/dist/models';
import {Observable} from 'rxjs';
import { Store, createSelector, select } from '@ngrx/store';
import * as fromRoot from '../reducers';
import {InitOrg} from '../reducers/org.actions';
import {InitSvc} from '../reducers/svc.actions';
import _ from 'lodash';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  orgId: string;
  org$: Observable<Organization>;
  orgSvcs$: Observable<Service[]>;

  constructor(
    private store: Store<fromRoot.State>, private route: ActivatedRoute, private rtr: Router) {

      this.orgId = this.route.snapshot.paramMap.get('oId');
    }

  ngOnInit() {
    const getOrgs = (state) => _.map(state.organizations, 'org');
    const orgById = createSelector(getOrgs, (orgs, props) => _.find(orgs, ['id', this.orgId]));

    const getServices = (state) => _.map(state.services, 'svc');
    const svcsByOrgId = createSelector(getServices, (svcs, props) => _.filter(svcs, ['organizationId', props.orgId]));

    this.org$ = this.store.pipe(select(orgById, {id: this.orgId}));
    this.orgSvcs$ = this.store.pipe(select(svcsByOrgId, {orgId: this.orgId}));

    this.store.dispatch(new InitOrg(this.orgId));


    const subscription = this.orgSvcs$.subscribe((svcs) => {
      _.forEach(svcs, (svc) => {
        if (!svc.isInit) this.store.dispatch(new InitSvc(svc));
      });

      if (svcs.length > 0 && subscription) subscription.unsubscribe();
    });
  }

  goToService(svc, method?: string) {
    const uri = ['/organization/' + this.orgId + '/service/', svc.serviceId];
    if (method) uri.push({method: method});

    this.rtr.navigate(uri);
  }
}
