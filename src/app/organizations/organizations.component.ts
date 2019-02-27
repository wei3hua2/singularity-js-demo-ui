import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../reducers';

import {LoadOrgs} from '../reducers/org.actions';

import {Snet} from 'singnet-js/dist/snet.js';
import {Organization} from 'singnet-js/dist/models';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {

  orgs: Observable<{[id: string]: Organization}>;

  constructor(
    private rtr: Router,
    private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new LoadOrgs);

    this.orgs = this.store.select<{[id: string]: Organization}>(state => state.organization.orgs);
  }

  goToOrg(org) {
    this.rtr.navigate(['/organization', org.id]);
  }

}
