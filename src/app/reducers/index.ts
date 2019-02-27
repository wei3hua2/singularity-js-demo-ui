import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import { environment } from '../../environments/environment';

import {Organization, Service} from 'singnet-js/dist/models';

import {OrgActions, OrgActionTypes} from './org.actions';
import {SvcActions, SvcActionTypes} from './svc.actions';

import _ from 'lodash';

interface OrgState {
  orgs: {[id: string]: Organization};
}
const initialOrgState: OrgState = {
  orgs: {}
};
interface SvcState {
  svcOrg: {
    [id: string]: {
      [id: string]: Service,
    }
  }
}
const initialSvcState: SvcState = {
  svcOrg: {}
};

function orgReducer(state = initialOrgState, action: OrgActions): OrgState {
  switch (action.type) {
    case OrgActionTypes.LoadOrgsSuccess:

      return Object.assign(state, {orgs: action.payload});

    case OrgActionTypes.InitOrgSuccess:
      const orgObj = {};
      orgObj[action['payload']['id']] = action['payload'];

      return Object.assign(state, {orgs: Object.assign(state.orgs, orgObj)});

    default:
      return state;
  }
}

function svcReducer(state = initialSvcState, action: SvcActions): SvcState {
  switch (action.type) {
    case SvcActionTypes.LoadOrgSvcsSuccess:
      const svcs = action.payload;
      if (svcs.length > 0) {
        const orgSvcObj = {};
        orgSvcObj[svcs[0].organizationId] = _.mapValues(_.keyBy(svcs, 'serviceId'), (o) => o);

        return Object.assign(state, {svcOrg: orgSvcObj});
      } else {
        return state;
      }
    case SvcActionTypes.InitSvcSuccess:
      const svcObj = {};
      const svc = action.payload, svcId = svc.serviceId, orgId = svc.organizationId;
      const sOrg = Object.assign({}, state.svcOrg);
      sOrg[orgId][svcId] = svc;

      return Object.assign(state, {svcOrg: sOrg});

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
