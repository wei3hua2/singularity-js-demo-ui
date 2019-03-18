import { Inject, Injectable } from '@angular/core';
import {Snet} from 'singnet-js/dist/snet';
import Web3 from 'web3';
import {Organization, Service, ServiceInfo} from 'singnet-js/dist/models';
import { WEB3 } from './web3';
import {WindowRefService} from './window-ref.service';

import {Observable, from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnetService {

  snet: Snet;
  windowRef: WindowRefService;

  constructor(@Inject(WEB3) private web3: Web3, windowRef: WindowRefService) {
    this.windowRef = windowRef;
  }

  async init(): Promise<Snet> {
    this.snet = await Snet.init(this.web3, {ethereum: this.windowRef.nativeWindow.ethereum});
    this.windowRef.nativeWindow.web3 = this.web3;
    
    return this.snet;
  }
  
  listOrganizations(): Observable<Organization[]> {
    return from(this.snet.listOrganizations({init: true}));
  }

  initOrganization(org: Organization | string): Observable<Organization> {
    if (typeof org === 'string') 
      return from(this.snet.getOrganization(org));
    else
      return from(org.init());
  }

  initService(svc: Service | string[]): Observable<Service> {
    if (Array.isArray(svc))
      return from(this.snet.getService(svc[0], svc[1]));
    else
      return from(svc.init());
  }
  getServiceInfo(svc: Service): Observable<ServiceInfo> {
    return from(svc.info());
  }
  runJob(svc: Service, method: string, request: any, opts: any = {}): Promise<any> {
    return svc.runJob(method, request, opts);
  }

  getAddress(): string {
    return this.snet.account.address;
  }
  getNetwork(): Observable<string> {
    console.log(this.snet);
    return from(this.snet.account.network);
  }
  getAgiInCogs(): Observable<number> {
    return from(this.snet.account.getAgiTokens({inCogs: true}));
  }
  getEscrowBalance(): Observable<number> {
    return from(this.snet.account.getEscrowBalances({inCogs: true}));
  }

  getChannels(filter: any): Observable<any> {
    return from(this.snet.account.getChannels(filter));
  }

  getBlockNumber(): Promise<number> {
    return this.snet.account.getEthUtil().getBlockNumber();
  }

  getServiceChannels(svc: Service): Observable<any> {
    return from(svc.getChannels());
  }


  getOpenChannel: any = (opts: any = {}) => this.snet.account.getMpe().ChannelOpen(opts);
  getDepositFunds: any = (opts: any = {}) => this.snet.account.getMpe().DepositFunds(opts);
  getChannelAddFunds: any = (opts: any = {}) => this.snet.account.getMpe().ChannelAddFunds(opts);
  getChannelExtend: any = (opts: any = {}) => this.snet.account.getMpe().ChannelExtend(opts);
  getWithdrawFunds: any = (opts: any = {}) => this.snet.account.getMpe().WithdrawFunds(opts);
  getTransferFunds: any = (opts: any = {}) => this.snet.account.getMpe().TransferFunds(opts);
  getChannelSenderClaim: any = (opts: any = {}) => this.snet.account.getMpe().ChannelSenderClaim(opts);
  
  getTransfer: any = (opts: any = {}) => this.snet.account.getTokens().Transfer(opts);
  getBurn: any = (opts: any = {}) => this.snet.account.getMpe().Burn(opts);
  getOwnershipTransferred: any = (opts: any = {}) => this.snet.account.getMpe().ChannelOpen(opts);
  getApproval: any = (opts: any = {}) => this.snet.account.getMpe().ChannelOpen(opts);

  getOrganizationCreated: any = (opts: any = {}) => this.snet.account.getRegistry().OrganizationCreated(opts);
  getOrganizationModified: any = (opts: any = {}) => this.snet.account.getRegistry().OrganizationModified(opts);
  getOrganizationDeleted: any = (opts: any = {}) => this.snet.account.getRegistry().OrganizationDeleted(opts);
  getServiceCreated: any = (opts: any = {}) => this.snet.account.getRegistry().ServiceCreated(opts);
  getServiceMetadataModified: any = (opts: any = {}) => this.snet.account.getRegistry().ServiceMetadataModified(opts);
  getServiceTagsModified: any = (opts: any = {}) => this.snet.account.getRegistry().ServiceTagsModified(opts);
  getServiceDeleted: any = (opts: any = {}) => this.snet.account.getRegistry().ServiceDeleted(opts);
  getTypeRepositoryCreated: any = (opts: any = {}) => this.snet.account.getRegistry().TypeRepositoryCreated(opts);
  getTypeRepositoryModified: any = (opts: any = {}) => this.snet.account.getRegistry().TypeRepositoryModified(opts);
  getTypeRepositoryDeleted: any = (opts: any = {}) => this.snet.account.getRegistry().TypeRepositoryDeleted(opts);

  
}
