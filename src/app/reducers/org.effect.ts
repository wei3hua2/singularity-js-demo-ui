import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import * as org from './org.actions';
import * as svc from './svc.actions';
import {SnetService} from '../snet.service';
import _ from 'lodash';

@Injectable()
export class OrgEffects {

  constructor(
    private store: Store<fromRoot.State>,
    private snetSvc: SnetService,
    private actions$: Actions) {}

    @Effect()
    loadOrgs$: Observable<Action> = this.actions$.pipe(
      ofType(org.OrgActionTypes.LoadOrgs),
      switchMap(() => {
        return this.snetSvc.listOrganizations().pipe(
          map( (orgs) => 
            new org.LoadOrgsSuccess(_.mapValues(_.keyBy(orgs, 'id'), (o) => o)) )
        );
      })
    );

    @Effect()
    orgDetail$: Observable<Action> = this.actions$.pipe(
      ofType(org.OrgActionTypes.InitOrg),
      switchMap((action) => {
        const payload: any = action['payload'];

        return this.snetSvc.initOrganization(payload).pipe(  
          map((oR) => {
            const act = new org.InitOrgSuccess(oR);
            this.store.dispatch(act);
            return act;
          }),
          switchMap((orgSuccessAction) => {
            const o = orgSuccessAction['payload'];

            return from(o.getServices()).pipe(
              map((svcs: any[]) => new svc.LoadOrgSvcsSuccess(svcs))
            );
          })
        );
      })
    )
}
