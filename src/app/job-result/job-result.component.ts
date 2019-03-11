import { Component, OnInit, Input, Inject } from '@angular/core';
import {ServiceJobState} from '../reducers/index';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import _ from 'lodash';

@Component({
  selector: 'dialog-detail',
  templateUrl: 'dialog-detail.html',
})
export class DialogDetailComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'job-result',
  templateUrl: './job-result.component.html',
  styleUrls: ['./job-result.component.scss']
})
export class JobResultComponent implements OnInit {

  progress_val: number;
  _status: ServiceJobState;

  evt_logs: any[];

  _statusMock: any = {
    method: 'add',
    request: {a: 4, b: 5},
    response: {value: 9},
    isCompleted: true,
    evt_logs: [{type: 'evt1', params: 'vale1'}, {type: 'evt2', params: 'vale2'}, {type: 'evt3', params: 'vale3'}],
    error: new Error('Error Message')
  }

  @Input()
  expanded: boolean;
  
  @Input()
  response;

  @Input('status')
  set status(status) {
    // if (status && !this.evt_logs) this.evt_logs = this.defaultEventLogs();
    if (status && status.evt_logs) this.parseEvents(status.evt_logs);

    // const prog = status && status.evt_logs ? status.evt_logs.length * 1.0 : 0.0;
    // this.progress_val = prog / 7.0 * 100.0;
    // if (status && status.isCompleted) this.progress_val = 100;

    this._status = status;
  }
  get status(): ServiceJobState {
    return this._status;
    // return this._statusMock;
  }

  showEventDetail(evt) {
    const dialogRef = this.dialog.open(DialogDetailComponent, {
      width: '75%',
      data: {name: evt.name, data: evt.data}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  constructor(public dialog: MatDialog) {
    this.evt_logs = this.defaultEventLogs();
  }

  // --- check channel, create channel, topup channel
  // --- check channel state, 
  // == Channel: autohandle_channel, use_channel_id, channel_min_amount, channel_min_expiration
  // 1. check available channels
  // 2.1. if found and meet value and expiration, select the first one.
  // 2.2. if found but not enough fund or expire, add fund or extend.
  // 3. else create a new channel: expiration, amount
  // 4. check channel State: request signature (for signing channel_id)
  // == Grpc call
  // 1. parse request: request signature (for contract_address, channelId, nonce, price)
  // 2. call grpc service
  // == Output result
  parseEvents(events) {
    // available_channels, selected_channel, sign_channel_opts, get_channel_state, 
    // sign_request, request_info, raw_response
    if (events.length === 0) return;
    else {
      const lastEvt = events[events.length - 1];

      _.forEach(events, (evt, index) => {
        const l = this.evt_logs[evt.type];
        
        if (l) {
          if (evt.type === 'available_channels') 
            return this.setDoneEvent('available_channels', evt.params.length, evt.params);
          else if (evt.type === 'selected_channel') 
            return this.setDoneEvent('selected_channel', evt.params.id, evt.params);
          else if (evt.type === 'sign_channel_opts') 
            return this.setDoneEvent('sign_channel_opts', 'signed', evt.params);
          else if (evt.type === 'get_channel_state') 
            return this.setDoneEvent('get_channel_state', 'done', evt.params);
          else if (evt.type === 'sign_request') 
            return this.setDoneEvent('sign_request', 'done', evt.params);
          else if (evt.type === 'request_info') 
            return this.setDoneEvent('request_info', 'done', evt.params);
          else if (evt.type === 'raw_response') 
          // const evt = _.find(this.evt_logs, ['id', type]);
            return this.setDoneEvent('raw_response', 'done', evt.params);
        }
      });

      // const lastDoneIndex = _.findLastIndex(this.evt_logs, ['done', true]);
      // if (lastDoneIndex < this.evt_logs.length - 1) {
      //   this.evt_logs[lastDoneIndex + 1].running = true;
      // }
      
      // console.log('lastDoneIndex : ' + lastDoneIndex);

      console.log(this.evt_logs);
      console.log(events);

    }
  }
  private setDoneEvent (type, info, data) {
    const evt = this.evt_logs[type];
    evt.running = false,  evt.done = true, 
    evt.info = info, evt.data = data;

    return evt;
  }


  ngOnInit() {
    this.progress_val = 0.0;
  }

  defaultEventLogs() {
    return _.cloneDeep({
      'available_channels': {name: 'Available Channels', running: true, done: false, isError: false, info: '-', data: null},
      'selected_channel': { name: 'Selected Channel', running: false, done: false, isError: false, info: '-', data: null},
      'sign_channel_opts': {name: 'Request Signature for Channel State', running: false, isError: false, done: false, info: '-', data: null},
      'get_channel_state': {name: 'Channel State', running: false, done: false, isError: false, info: '-', data: null},
      'sign_request': {name: 'Request Signature for Service Call', running: false, done: false, isError: false, info: '-', data: null},
      'request_info': {name: 'Request Info', running: false, done: false, isError: false, info: '-', data: null},
      'raw_response': {name: 'Result', running: false, done: false, isError: false, info: '-', data: null}
    });
  }

}


