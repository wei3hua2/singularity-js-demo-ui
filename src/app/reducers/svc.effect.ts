import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import * as svc from './svc.actions';
import {SnetService} from '../snet.service';
import {Service} from 'singnet-js/dist/models';

@Injectable()
export class SvcEffects {

  constructor(
    private snetSvc: SnetService,
    private actions$: Actions) {}

    @Effect()
    svcDetail$: Observable<Action> = this.actions$.pipe(
      ofType(svc.SvcActionTypes.InitSvc),
      switchMap((action) => {
        const payload: any = action['payload'];
        let serv: Service;

        return this.snetSvc.initService(payload).pipe(
          switchMap((s) => {
            serv = s;
            return this.snetSvc.getServiceInfo(payload);
          }),
          map((info) => {
            serv.info = info;
            return new svc.InitSvcSuccess(serv);
          })
        );
      })
    )
}
