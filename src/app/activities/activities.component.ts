import { Component, OnInit } from '@angular/core';
import {SnetService} from '../snet.service';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  diameter = 30;
  strokeWidth = 4;

  escrows: any[] = [
    {value: 'ChannelOpen', viewValue: 'Channel Open'},
    {value: 'DepositFunds', viewValue: 'Deposit Funds'},
    {value: 'ChannelAddFunds', viewValue: 'Add Channel Funds'},
    {value: 'ChannelExtend', viewValue: 'Extend Channel'},
    {value: 'WithdrawFunds', viewValue: 'Withdraw Funds'},
    {value: 'TransferFunds', viewValue: 'Transfer Funds'},
    {value: 'ChannelSenderClaim', viewValue: 'Sender Claim'}
  ];
  tokens: any[] = [
    {value: 'Transfer', viewValue: 'Transfer'},
    {value: 'Burn', viewValue: 'Burn'},
    {value: 'OwnershipTransferred', viewValue: 'Ownership transferred'},
    {value: 'Approval', viewValue: 'Approval'}
  ];
  registries: any[] = [
    {value: 'OrganizationCreated', viewValue: 'Organization Created'},
    {value: 'OrganizationModified', viewValue: 'Organization Modified'},
    {value: 'OrganizationDeleted', viewValue: 'Organization Deleted'},
    {value: 'ServiceCreated', viewValue: 'Service Created'},
    {value: 'ServiceMetadataModified', viewValue: 'Service Metadata Modified'},
    {value: 'ServiceTagsModified', viewValue: 'Service Tags Modified'},
    {value: 'ServiceDeleted', viewValue: 'Service Deleted'},
    {value: 'TypeRepositoryCreated', viewValue: 'Type Repository Created'},
    {value: 'TypeRepositoryModified', viewValue: 'Type Repository Modified'},
    {value: 'TypeRepositoryDeleted', viewValue: 'Type Repository Deleted'}
  ];

  opts: any = {
    filter: {},
    fromBlock: 0,
    toBlock: 'latest'
    // topics?:[]
  }

  isListening = false;

  get disableListener() {
    return !this.selected || this.isListening;
  }
  get disableStop () {
    return !this.selected || !this.isListening;
  }


  _selectedBlockchain: string;
  methods: any[];

  set selectedBlockchain(blockchain: string) {
    this._selectedBlockchain = blockchain;
    if (blockchain === 'escrow') this.methods = this.escrows;
    else if (blockchain === 'registry') this.methods = this.registries;
    else if (blockchain === 'tokens') this.methods = this.tokens;
  }
  get selectedBlockchain(): string {
    return this._selectedBlockchain;
  }

  constructor(private snet: SnetService) {
    this.selectedBlockchain = 'escrow';
  }

  emitter;
  activities: any[] = [];
  _selected;
  set selected(sel) {
    this._selected = sel;
  }
  get selected() {
    return this._selected;
  }

  stop() {
    if (this.emitter) { 
      this.emitter.removeAllListeners('data');
      this.emitter.removeAllListeners('changed');
      this.emitter.removeAllListeners('error');
      this.isListening = false;
      this.activities = [];
    }
  }
  listen() {
    const sel = this.selected;
    console.log(sel);
    console.log(this.opts);
    this.isListening = true;
    this.activities = [];

    if (this.emitter) this.emitter.removeAllListeners('data');

    if (sel === 'ChannelOpen') this.emitter = this.snet.getOpenChannel(this.opts);
    else if (sel === 'DepositFunds') this.emitter = this.snet.getDepositFunds(this.opts);
    else if (sel === 'ChannelAddFunds') this.emitter = this.snet.getChannelAddFunds(this.opts);
    else if (sel === 'ChannelExtend') this.emitter = this.snet.getChannelExtend(this.opts);
    else if (sel === 'WithdrawFunds') this.emitter = this.snet.getWithdrawFunds(this.opts);
    else if (sel === 'TransferFunds') this.emitter = this.snet.getTransferFunds(this.opts);
    else if (sel === 'ChannelSenderClaim') this.emitter = this.snet.getChannelSenderClaim(this.opts);

    else if (sel === 'Transfer') this.emitter = this.snet.getTransfer(this.opts);
    else if (sel === 'Burn') this.emitter = this.snet.getBurn(this.opts);
    else if (sel === 'OwnershipTransferred') this.emitter = this.snet.getOwnershipTransferred(this.opts);
    else if (sel === 'Approval') this.emitter = this.snet.getApproval(this.opts);

    else if (sel === 'OrganizationCreated') this.emitter = this.snet.getOrganizationCreated(this.opts);
    else if (sel === 'OrganizationModified') this.emitter = this.snet.getOrganizationModified(this.opts);
    else if (sel === 'OrganizationDeleted') this.emitter = this.snet.getOrganizationDeleted(this.opts);
    else if (sel === 'ServiceCreated') this.emitter = this.snet.getServiceCreated(this.opts);
    else if (sel === 'ServiceMetadataModified') this.emitter = this.snet.getServiceMetadataModified(this.opts);
    else if (sel === 'ServiceTagsModified') this.emitter = this.snet.getServiceTagsModified(this.opts);
    else if (sel === 'ServiceDeleted') this.emitter = this.snet.getServiceDeleted(this.opts);
    else if (sel === 'TypeRepositoryCreated') this.emitter = this.snet.getTypeRepositoryCreated(this.opts);
    else if (sel === 'TypeRepositoryModified') this.emitter = this.snet.getTypeRepositoryModified(this.opts);
    else if (sel === 'TypeRepositoryDeleted') this.emitter = this.snet.getTypeRepositoryDeleted(this.opts);
    
    this.emitter.on('data', (evt) => {
      this.activities.unshift(evt);
    });

    this.emitter.on('changed', console.log);
    this.emitter.on('error', console.error);
  }

  ngOnInit() {
    this.snet.getBlockNumber().then((num) => {
      this.opts.fromBlock = num - 500000
      this.opts.toBlock = num;
    });
  }

}
