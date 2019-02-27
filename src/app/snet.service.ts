import { Inject, Injectable } from '@angular/core';
import {Snet} from 'singnet-js/dist/snet';
import Web3 from 'web3';
import {Organization, Service, ServiceInfo} from 'singnet-js/dist/models';
import { WEB3 } from './web3';

import {Observable, from} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnetService {

  snet: Snet;

  constructor(@Inject(WEB3) private web3: Web3) {
  }

  async init(): Promise<Snet> {
    this.snet = await Snet.init(this.web3);
    return this.snet;
  }
  
  listOrganizations(): Observable<Organization[]> {
    return from(this.snet.listOrganizations());
  }

  initOrganization(org: Organization): Observable<Organization> {
    return from(org.fetch());
  }

  initService(svc: Service): Observable<Service> {
    return from(svc.fetch());
  }
  getServiceInfo(svc: Service): Observable<ServiceInfo> {
    return from(svc.serviceInfo());
  }
}
