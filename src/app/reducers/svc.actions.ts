import { Action } from '@ngrx/store';
import {Service, Channel} from 'singnet-js/dist/models';

export enum SvcActionTypes {
  InitSvcOrg = '[Svc] Init Org Svc',
  LoadOrgSvcs = '[Svc] Load Org Svcs',
  LoadOrgSvcsSuccess = '[Svc] Load Org Svcs Success',
  InitSvc = '[Svc] Init Svc',
  InitSvcSuccess = '[Svc] Init Svc Success',
  LoadSvcChannels = '[Svc] Load Svc Channels',
  LoadSvcChannelsSuccess = '[Svc] Load Svc Channels Success',

  RunSvcJob = '[Svc] Run Svc Job',
  RunSvcJobStatusChange = '[Svc] Run Svc Job Status Change',
  RunSvcJobSuccess = '[Svc] Run Svc Job Success',
  RunSvcJobFailure = '[Svc] Run Svc Job Failure'
}

export class InitSvcOrg implements Action {
  readonly type = SvcActionTypes.InitSvcOrg;
  constructor(public payload: [string, string]) {
    this.payload = payload;
  }
}

export class LoadOrgSvcs implements Action {
  readonly type = SvcActionTypes.LoadOrgSvcs;
  constructor(public payload: any) {}
}
export class LoadOrgSvcsSuccess implements Action {
  readonly type = SvcActionTypes.LoadOrgSvcsSuccess;
  constructor(public payload: Service[]) {}
}

export class InitSvc implements Action {
  readonly type = SvcActionTypes.InitSvc;
  constructor(public payload: Service) {
    this.payload = payload;
  }
}
export class InitSvcSuccess implements Action {
  readonly type = SvcActionTypes.InitSvcSuccess;
  constructor(public payload: Service) {}
}

export class RunSvcJob implements Action {
  readonly type = SvcActionTypes.RunSvcJob;
  constructor(public payload: [Service, string, Object, Object]) {
    this.payload = payload;
  }
}
export class RunSvcJobStatusChange implements Action {
  readonly type = SvcActionTypes.RunSvcJobStatusChange;
  constructor(public payload: [string, string, string, any]) {
    this.payload = payload;
  }
}
export class RunSvcJobSuccess implements Action {
  readonly type = SvcActionTypes.RunSvcJobSuccess;
  constructor(public payload: [string, string, any]) {
    this.payload = payload;
  }
}
export class RunSvcJobFailure implements Action {
  readonly type = SvcActionTypes.RunSvcJobFailure;
  constructor(public payload: [string, string, Error]) {
    this.payload = payload;
  }
}

export class LoadSvcChannels implements Action {
  readonly type = SvcActionTypes.LoadSvcChannels;
  constructor(public payload: Service) {
    this.payload = payload;
  }
}
export class LoadSvcChannelsSuccess implements Action {
  readonly type = SvcActionTypes.LoadSvcChannelsSuccess;
  constructor(public payload: [Service, Channel[]]) {
    this.payload = payload;
  }
}


export type SvcActions = InitSvcOrg | LoadOrgSvcs | LoadOrgSvcsSuccess | InitSvc | InitSvcSuccess |
                         RunSvcJob | RunSvcJobSuccess | RunSvcJobFailure | RunSvcJobStatusChange |
                         LoadSvcChannels | LoadSvcChannelsSuccess;
