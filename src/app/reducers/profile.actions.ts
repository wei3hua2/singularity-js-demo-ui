import { Action } from '@ngrx/store';

export enum ProfileActionTypes {
  GetAddress = '[Profile] Get Address',
  LoadNetwork = '[Profile] Load Network',
  LoadNetworkSuccess = '[Profile] Load Network Success',
  LoadAgiAmount = '[Profile] Load Agi Amount',
  LoadAgiAmountSuccess = '[Profile] Load Agi Amount Success',
  LoadEscrowBalance = '[Profile] Load Escrow Balance',
  LoadEscrowBalanceSuccess = '[Profile] Load Escrow Balance Success',
  GetChannels = '[Profile] Get Channels',
  GetChannelsSuccess = '[Profile] Get Channels Success'
}


export class GetAddress implements Action {
  readonly type = ProfileActionTypes.GetAddress;
  constructor(public payload: string) {}
}
export class LoadNetwork implements Action {
  readonly type = ProfileActionTypes.LoadNetwork;
  constructor() {}
}
export class LoadNetworkSuccess implements Action {
  readonly type = ProfileActionTypes.LoadNetworkSuccess;
  constructor(public payload: string) {}
}
export class LoadAgiAmount implements Action {
  readonly type = ProfileActionTypes.LoadAgiAmount;
  constructor() {}
}
export class LoadAgiAmountSuccess implements Action {
  readonly type = ProfileActionTypes.LoadAgiAmountSuccess;
  constructor(public payload: number) {}
}
export class LoadEscrowBalance implements Action {
  readonly type = ProfileActionTypes.LoadEscrowBalance;
  constructor() {}
}
export class LoadEscrowBalanceSuccess implements Action {
  readonly type = ProfileActionTypes.LoadEscrowBalanceSuccess;
  constructor(public payload: number) {}
}
export class GetChannels implements Action {
  readonly type = ProfileActionTypes.GetChannels;
  constructor(public payload: any) {}
}
export class GetChannelsSuccess implements Action {
  readonly type = ProfileActionTypes.GetChannelsSuccess;
  constructor(public payload: any[]) {}
}


export type ProfileActions = GetAddress | LoadNetwork | LoadNetworkSuccess | LoadAgiAmount | 
  LoadAgiAmountSuccess | LoadEscrowBalance | LoadEscrowBalanceSuccess | GetChannels | GetChannelsSuccess;
