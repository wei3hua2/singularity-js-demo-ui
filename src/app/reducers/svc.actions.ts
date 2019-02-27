import { Action } from '@ngrx/store';
import {Service} from 'singnet-js/dist/models';

export enum SvcActionTypes {
  LoadOrgSvcs = '[Svc] Load Org Svcs',
  LoadOrgSvcsSuccess = '[Svc] Load Org Svcs Success',
  InitSvc = '[Svc] Init Svc',
  InitSvcSuccess = '[Svc] Init Svc Success'
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


export type SvcActions = LoadOrgSvcs | LoadOrgSvcsSuccess | InitSvc | InitSvcSuccess;
