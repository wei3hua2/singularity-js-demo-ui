import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../reducers';

import {LoadOrgs} from '../reducers/org.actions';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent implements OnInit {

  orgs: Observable<any[]>;

  constructor(
    private rtr: Router,
    private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new LoadOrgs);

    this.orgs = this.store.select<any[]>(state => state.organization.orgs);

    this.orgs.subscribe(console.log);
  }

  goToOrg(evt) {
    console.log(evt);
    this.rtr.navigate(['/organization', 'orgId1']);
  }

}
