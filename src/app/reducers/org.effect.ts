import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import * as org from './org.actions';

@Injectable()
export class OrgEffects {

  constructor(
    private actions$: Actions) {}

    @Effect()
    loadOrgs$: Observable<Action> = this.actions$.pipe(
      ofType(org.OrgActionTypes.LoadOrgs),
      map(() => new org.LoadOrgsSuccess(['org1', 'org2']))
    );
}
