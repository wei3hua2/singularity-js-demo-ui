import {ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer} from '@ngrx/store';
import { environment } from '../../environments/environment';

import {OrgActions, OrgActionTypes} from './org.actions';
import {SvcActions, SvcActionTypes} from './svc.actions';

interface OrgState {
  orgs: any[];
}
const initialOrgState: OrgState = {
  orgs: []
};
interface SvcState {
  svcs: any[];
}
const initialSvcState: SvcState = {
  svcs: []
};

function orgReducer(state = initialOrgState, action: OrgActions): OrgState {
  switch (action.type) {
    case OrgActionTypes.LoadOrgsSuccess:
      return Object.assign(state, {orgs: action.payload});
    default:
      return state;
  }
}

function svcReducer(state = initialSvcState, action: SvcActions): SvcState {
  switch (action.type) {
    case SvcActionTypes.LoadOrgSvcsSuccess:
      return {svcs: ['svc1']};
    default:
      return state;
  }
}


export interface State {
  organization: OrgState;
  service: SvcState;
}

export const reducers: ActionReducerMap<State> = {
  organization: orgReducer,
  service: svcReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
