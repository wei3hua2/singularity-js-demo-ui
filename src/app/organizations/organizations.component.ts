import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../reducers';
import _ from 'lodash';
import {LoadOrgs} from '../reducers/org.actions';

import {Organization} from 'singnet-js/dist/models';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {

  orgs: Observable<{[id: string]: Organization}>;

  loading: boolean;

  constructor(
    private rtr: Router,
    private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.loading = true;
    this.store.dispatch(new LoadOrgs);

    this.orgs = this.store.select<Organization[]>((state) => _.map(state.organizations, 'org'));

    this.orgs.subscribe((o) => {
      if (o.length > 0) this.loading = false;
      else this.loading = true;
    });
  }

  goToOrg(org) {
    this.rtr.navigate(['/organization', org.id]);
  }

}
