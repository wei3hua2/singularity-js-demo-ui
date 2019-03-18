import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';
import { environment } from '../../environments/environment';

import {Organization, Service, Channel} from 'singnet-js/dist/models';

import {OrgActions, OrgActionTypes} from './org.actions';
import {SvcActions, SvcActionTypes} from './svc.actions';
import {ProfileActions, ProfileActionTypes} from './profile.actions';

import _ from 'lodash';


/************* State *************/

export interface ServiceJobState {
  method?: string;
  request?: Object;
  response?: Object;
  isCompleted?: boolean;
  current_step?: string;
  evt_logs?: {type: string, params: any[]}[];
  error?: any;
}

interface OrgState {
  id?: string,
  org?: Organization
}
const initialOrgState: OrgState[] = [];

interface SvcState {
  id?: string,
  organizationId?: string,
  svc?: Service,
  info?: any,
  currentJob?: ServiceJobState,
  channels?: Channel[]
}
const initialSvcState: SvcState[] = [];

interface ProfileState {
  address?: string;
  network?: string;
  agiInCogs?: number;
  agiEscrowInCogs?: number;
  channels: any[];
}
const initialProfileState: ProfileState = {channels: []};

export interface State {
  organizations: OrgState[];
  services: SvcState[];
  profile: ProfileState;
}

/************* Reducer *************/

function loadOrgsSuccess (state: OrgState[], payload: Organization[]): OrgState[] {
  return _.map(payload, (org) => ({id: org.id, org: org}) );
}
function initOrgSuccess (state: OrgState[], payload: Organization): OrgState[] {
  const org = _.find(state, ['id', payload.id]);
  const newOrgState = {id: payload.id, org: payload};

  if (org) return _.map(state, (orgState) => orgState.id === payload.id ? newOrgState : orgState );
  else return _.concat(state, newOrgState);
}

function orgReducer(state = initialOrgState, action: OrgActions): OrgState[] {
  switch (action.type) {
    case OrgActionTypes.LoadOrgsSuccess:
      return loadOrgsSuccess(state, action.payload);

    case OrgActionTypes.InitOrgSuccess:
      return initOrgSuccess(state, action.payload);

    default:
      return state;
  }
}

function loadOrgSvcSuccess(state: SvcState[], svcs: Service[]): SvcState[] {
  console.log(svcs);
  const svcState = _.map(svcs, (svc) => ({
    id: svc.id, organizationId: svc.organizationId, svc: svc,
    info: null, currentJob: null
  }));

  return _.unionBy(svcState, state, 'id');
}
function initSvcSuccess(state: SvcState[], payload: Service): SvcState[] {
  const service = payload;
  const svcState = _.find(state, {id: service.id, organizationId: service.organizationId});
  const newState = {id: service.id, organizationId: service.organizationId, 
    svc: service, info: service.info(), currentJob: null};

  if (svcState) 
    return _.map(state, (s) => s.id === newState.id ? newState : s);
  else 
    return _.concat(state, newState);
}

function loadSvcChannelsSuccess(state: SvcState[], payload: [Service, Channel[]]): SvcState[] {
  const svc = payload[0], channels = payload[1];
  const svcState = _.find(state, {id: svc.id, organizationId: svc.organizationId});
  const newState = Object.assign({}, svcState, {channels: channels});

  return _.map(state, (s) => s.id === newState.id ? newState : s);
}

function runSvcJob(state: SvcState[], payload: any[]): SvcState[] {
  const svc = payload[0], method = payload[1], request = payload[2];
  const job = {
    service: svc, method: method, request: request, 
    response: null, isCompleted: false, error: null, evt_logs: []
  };

  return _.map(state, (s) => {
    if (s.id === svc.id && s.organizationId === svc.organizationId) s.currentJob = job;
    return s;
  });
}
function runSvcJobStatusChange(state: SvcState[], payload: [string, string, string, any]): SvcState[] {
  const orgId = payload[0], svcId = payload[1], type = payload[2], val = payload[3];

  const result: SvcState[] = _.map(state, (s) => {
    s = _.clone(s), 
    s.currentJob = _.clone(s.currentJob), 
    s.current_step = type,
    s.currentJob.evt_logs = val;

    // if (s.id === svcId && s.organizationId === orgId) {
      // s.current_step = type;
      // s.currentJob.evt_logs = _.concat(s.currentJob.evt_logs, {type: type, params: val});
    // }
    return s;
  });

  return result;
}
function runSvcJobFailure(state: SvcState[], payload: [string, string, Error]): SvcState[] {
  const orgId = payload[0], svcId = payload[1], err = payload[2];

  return _.map(state, (s) => {
    if (s.id === svcId && s.organizationId === orgId) {
      s.currentJobs.isCompleted = true;
      s.currentJobs.error = err;
    }
    return s;
  });
}

function runSvcJobSuccess(state: SvcState[], payload: [string, string, any]): SvcState[] {
  const orgId = payload[0], svcId = payload[1], response = payload[2];

  return _.map(state, (s) => {
    if (s.id === svcId && s.organizationId === orgId) {
      s.currentJob.isCompleted = true;
      s.currentJob.error = null;
      s.currentJob.response = response;
    }
    return s;
  });
}

function svcReducer(state = initialSvcState, action: SvcActions): SvcState[] {
  switch (action.type) {

    case SvcActionTypes.LoadOrgSvcsSuccess:
      return loadOrgSvcSuccess(state, action.payload);
      
    case SvcActionTypes.InitSvcSuccess:
      return initSvcSuccess(state, action.payload);

    case SvcActionTypes.RunSvcJob:
      return runSvcJob(state, action.payload);

    case SvcActionTypes.RunSvcJobStatusChange:
      return runSvcJobStatusChange(state, action.payload);

    case SvcActionTypes.RunSvcJobFailure:
      return runSvcJobFailure(state, action.payload);

    case SvcActionTypes.RunSvcJobSuccess:
      return runSvcJobSuccess(state, action.payload);

    case SvcActionTypes.LoadSvcChannelsSuccess:
      return loadSvcChannelsSuccess(state, action.payload);

    default:
      return state;
  }
}

function profileReducer(state = initialProfileState, action: ProfileActions): ProfileState {
  switch (action.type) {
    case ProfileActionTypes.GetAddress:
      return Object.assign({}, state, {address: action.payload});
    case ProfileActionTypes.LoadNetworkSuccess:
      return Object.assign({}, state, {network: action.payload});
    case ProfileActionTypes.LoadAgiAmountSuccess:
      return Object.assign({}, state, {agiInCogs: action.payload});
    case ProfileActionTypes.LoadEscrowBalanceSuccess:
      return Object.assign({}, state, {agiEscrowInCogs: action.payload});
    case ProfileActionTypes.GetChannelsSuccess:
      return Object.assign({}, state, {channels: _.map(action.payload, c => c.returnValues)});

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<State> = {
  organizations: orgReducer,
  services: svcReducer,
  profile: profileReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
