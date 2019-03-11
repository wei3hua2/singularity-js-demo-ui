import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import * as svc from './svc.actions';
import {SnetService} from '../snet.service';
import {Service} from 'singnet-js/dist/models';

@Injectable()
export class SvcEffects {

  constructor(
    private store: Store<fromRoot.State>,
    private snetSvc: SnetService,
    private actions$: Actions) {}

    @Effect()
    svcDetail$: Observable<Action> = this.actions$.pipe(
      ofType(svc.SvcActionTypes.InitSvc),
      switchMap((action) => {
        const payload: any = action['payload'];

        return this.snetSvc.initService(payload).pipe(
          map((s) => {
            return new svc.InitSvcSuccess(s);
          })
        );
      })
    )

    @Effect()
    svcChannels$: Observable<Action> = this.actions$.pipe(
      ofType(svc.SvcActionTypes.LoadSvcChannels),
      switchMap((action) => {
        const s: any = action['payload'];
        console.log(this.snetSvc);

        return this.snetSvc.getServiceChannels(s).pipe(
          map((channels) => new svc.LoadSvcChannelsSuccess([s, channels])) );
      })
    )

    @Effect()
    svcRunJob$: Observable<Action> = this.actions$.pipe(
      ofType(svc.SvcActionTypes.RunSvcJob),
      switchMap((action) => {
        const service: any = action['payload'][0], method = action['payload'][1],
          request = action['payload'][2], opts = action['payload'][3];
        const serviceId = service.serviceId, orgId = service.organizationId;
        
        const job: any = this.snetSvc.runJob(service, method, request, opts);

        job.on('available_channels', (val) => this.store.dispatch(
          new svc.RunSvcJobStatusChange([orgId, serviceId, 'available_channels', val])));
        job.on('selected_channel', (val) => this.store.dispatch(
          new svc.RunSvcJobStatusChange([orgId, serviceId, 'selected_channel', val])));
        job.on('service_created', (val) => this.store.dispatch(
          new svc.RunSvcJobStatusChange([orgId, serviceId, 'service_created', val])));
        job.on('before_execution', (val) => this.store.dispatch(
          new svc.RunSvcJobStatusChange([orgId, serviceId, 'before_execution', val])));
        job.on('get_channel_state', (val) => this.store.dispatch(
          new svc.RunSvcJobStatusChange([orgId, serviceId, 'get_channel_state', val])));
        job.on('sign_channel_opts', (val) => this.store.dispatch(
          new svc.RunSvcJobStatusChange([orgId, serviceId, 'sign_channel_opts', val])));
        job.on('signed_channel', (val) => this.store.dispatch(
          new svc.RunSvcJobStatusChange([orgId, serviceId, 'signed_channel', val])));
        job.on('channel_state', (val) => this.store.dispatch(
          new svc.RunSvcJobStatusChange([orgId, serviceId, 'channel_state', val])));
          
          
        job.catch((err) => this.store.dispatch(new svc.RunSvcJobFailure([orgId, serviceId, err])));

        return from(job).pipe(map((response) => 
          new svc.RunSvcJobSuccess([orgId, serviceId, response])));
      })
    )
}
