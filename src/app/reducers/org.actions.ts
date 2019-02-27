import { Action } from '@ngrx/store';
import {Organization} from 'singnet-js/dist/models';

export enum OrgActionTypes {
  LoadOrgs = '[Org] Load Orgs',
  LoadOrgsSuccess = '[Org] Load Orgs Success',
  InitOrg = '[Org] Init Org',
  InitOrgSuccess = '[Org] Init Org Success',
}

export class LoadOrgs implements Action {
  readonly type = OrgActionTypes.LoadOrgs;
  constructor() {}
}
export class LoadOrgsSuccess implements Action {
  readonly type = OrgActionTypes.LoadOrgsSuccess;
  constructor(public payload: any[]) {}
}

export class InitOrg implements Action {
  readonly type = OrgActionTypes.InitOrg;
  constructor(public payload: Organization) {
    this.payload = payload;
  }
}
export class InitOrgSuccess implements Action {
  readonly type = OrgActionTypes.InitOrgSuccess;
  constructor(public payload: Organization) {}
}


export type OrgActions = LoadOrgs | LoadOrgsSuccess | InitOrg | InitOrgSuccess;
