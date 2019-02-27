import { Action } from '@ngrx/store';

export enum SvcActionTypes {
  LoadOrgSvcs = '[Svc] Load Org Svcs',
  LoadOrgSvcsSuccess = '[Svc] Load Org Svcs Success',
}

export class LoadOrgSvcs implements Action {
  readonly type = SvcActionTypes.LoadOrgSvcs;
  constructor(public payload: any) {}
}
export class LoadOrgSvcsSuccess implements Action {
  readonly type = SvcActionTypes.LoadOrgSvcsSuccess;
  constructor(public payload: any[]) {}
}


export type SvcActions = LoadOrgSvcs | LoadOrgSvcsSuccess;
