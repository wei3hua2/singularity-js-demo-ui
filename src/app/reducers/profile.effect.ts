import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import * as profile from './profile.actions';
import {SnetService} from '../snet.service';
import _ from 'lodash';

@Injectable()
export class ProfileEffects {
  // actions$: Actions;
  // snetSvc: SnetService;
  // store: Store<fromRoot.State>;

  constructor(
    private store: Store<fromRoot.State>,
    private snetSvc: SnetService,
    private actions$: Actions) {
    }

    @Effect()
    loadNetwork$(): Observable<Action> {
      return this.actions$.pipe(
        ofType(profile.ProfileActionTypes.LoadNetwork),
        switchMap(() => {
          return this.snetSvc.getNetwork().pipe(map( (nw) => new profile.LoadNetworkSuccess(nw)))
        })
      );
    }

    @Effect()
    loadAgiAmount$(): Observable<Action> {
      return this.actions$.pipe(
        ofType(profile.ProfileActionTypes.LoadAgiAmount),
        switchMap(() => 
          this.snetSvc.getAgiInCogs().pipe(map( (nw) => new profile.LoadAgiAmountSuccess(nw)))
        )
      );
    }

    @Effect()
    loadEscrowBalance$(): Observable<Action> {
      return this.actions$.pipe(
        ofType(profile.ProfileActionTypes.LoadEscrowBalance),
        switchMap(() => 
          this.snetSvc.getEscrowBalance().pipe(map( (nw) => new profile.LoadEscrowBalanceSuccess(nw)))
        )
      );
    }

    @Effect()
    getChannels$(): Observable<Action> {
      return this.actions$.pipe(
        ofType(profile.ProfileActionTypes.GetChannels),
        switchMap((filter) => 
          this.snetSvc.getChannels(filter).pipe(
            map( (cs) => new profile.GetChannelsSuccess(cs)))
        )
      );
    }

}
