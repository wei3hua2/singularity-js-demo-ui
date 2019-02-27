import { Action } from '@ngrx/store';

export enum OrgActionTypes {
  LoadOrgs = '[Org] Load Orgs',
  LoadOrgsSuccess = '[Org] Load Orgs Success',
}

export class LoadOrgs implements Action {
  readonly type = OrgActionTypes.LoadOrgs;
  constructor() {}
}
export class LoadOrgsSuccess implements Action {
  readonly type = OrgActionTypes.LoadOrgsSuccess;
  constructor(public payload: any[]) {}
}


export type OrgActions = LoadOrgs | LoadOrgsSuccess;
