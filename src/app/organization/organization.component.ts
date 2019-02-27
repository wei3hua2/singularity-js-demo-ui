import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Organization, Service} from 'singnet-js/dist/models';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import {InitOrg} from '../reducers/org.actions';
import {first} from 'rxjs/operators';

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
    this.org$ = this.store.select<Organization>(state => state.organization.orgs[this.orgId]);
    this.orgSvcs$ = this.store.select<Service>(state => state.service.svcOrg[this.orgId]);

    this.org$.pipe(first())
      .subscribe((org) => { this.store.dispatch(new InitOrg(org)); });
    
    this.org$.subscribe(console.log);
    this.orgSvcs$.subscribe(console.log);
  }

  goToService(svc) {
    console.log(svc);
    this.rtr.navigate(['/organization/' + this.orgId + '/service/', svc.serviceId]);
  }
}
