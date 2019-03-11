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
      return from(org.fetch());
  }

  initService(svc: Service | string[]): Observable<Service> {
    if (Array.isArray(svc))
      return from(this.snet.getService(svc[0], svc[1]));
    else
      return from(svc.fetch());
  }
  getServiceInfo(svc: Service): Observable<ServiceInfo> {
    return from(svc.info());
  }
  runJob(svc: Service, method: string, request: any, opts: any = {}): Promise<any> {
    return svc.runJob(method, request, opts);
  }

  getAddress(): string {
    return this.snet.getCurrentAccount().address;
  }
  getNetwork(): Observable<string> {
    return from(this.snet.getCurrentAccount().network);
  }
  getAgiInCogs(): Observable<number> {
    return from(this.snet.getCurrentAccount().getAgiTokens());
  }
  getEscrowBalance(): Observable<number> {
    return from(this.snet.getCurrentAccount().getEscrowBalances());
  }

  getChannels(filter: any): Observable<any> {
    return from(this.snet.getCurrentAccount().getChannels(filter));
  }

  getBlockNumber(): Promise<number> {
    return this.snet.getCurrentAccount().getEthUtil().getBlockNumber();
  }

  getServiceChannels(svc: Service): Observable<any> {
    return from(svc.getChannels());
  }


  getOpenChannel: any = (opts: any = {}) => this.snet.getCurrentAccount().getMpe().ChannelOpen(opts);
  getDepositFunds: any = (opts: any = {}) => this.snet.getCurrentAccount().getMpe().DepositFunds(opts);
  getChannelAddFunds: any = (opts: any = {}) => this.snet.getCurrentAccount().getMpe().ChannelAddFunds(opts);
  getChannelExtend: any = (opts: any = {}) => this.snet.getCurrentAccount().getMpe().ChannelExtend(opts);
  getWithdrawFunds: any = (opts: any = {}) => this.snet.getCurrentAccount().getMpe().WithdrawFunds(opts);
  getTransferFunds: any = (opts: any = {}) => this.snet.getCurrentAccount().getMpe().TransferFunds(opts);
  getChannelSenderClaim: any = (opts: any = {}) => this.snet.getCurrentAccount().getMpe().ChannelSenderClaim(opts);
  
  getTransfer: any = (opts: any = {}) => this.snet.getCurrentAccount().getTokens().Transfer(opts);
  getBurn: any = (opts: any = {}) => this.snet.getCurrentAccount().getMpe().Burn(opts);
  getOwnershipTransferred: any = (opts: any = {}) => this.snet.getCurrentAccount().getMpe().ChannelOpen(opts);
  getApproval: any = (opts: any = {}) => this.snet.getCurrentAccount().getMpe().ChannelOpen(opts);

  getOrganizationCreated: any = (opts: any = {}) => this.snet.getCurrentAccount().getRegistry().OrganizationCreated(opts);
  getOrganizationModified: any = (opts: any = {}) => this.snet.getCurrentAccount().getRegistry().OrganizationModified(opts);
  getOrganizationDeleted: any = (opts: any = {}) => this.snet.getCurrentAccount().getRegistry().OrganizationDeleted(opts);
  getServiceCreated: any = (opts: any = {}) => this.snet.getCurrentAccount().getRegistry().ServiceCreated(opts);
  getServiceMetadataModified: any = (opts: any = {}) => this.snet.getCurrentAccount().getRegistry().ServiceMetadataModified(opts);
  getServiceTagsModified: any = (opts: any = {}) => this.snet.getCurrentAccount().getRegistry().ServiceTagsModified(opts);
  getServiceDeleted: any = (opts: any = {}) => this.snet.getCurrentAccount().getRegistry().ServiceDeleted(opts);
  getTypeRepositoryCreated: any = (opts: any = {}) => this.snet.getCurrentAccount().getRegistry().TypeRepositoryCreated(opts);
  getTypeRepositoryModified: any = (opts: any = {}) => this.snet.getCurrentAccount().getRegistry().TypeRepositoryModified(opts);
  getTypeRepositoryDeleted: any = (opts: any = {}) => this.snet.getCurrentAccount().getRegistry().TypeRepositoryDeleted(opts);

  
}
