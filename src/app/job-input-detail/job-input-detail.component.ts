import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'job-input-detail',
  templateUrl: './job-input-detail.component.html',
  styleUrls: ['./job-input-detail.component.scss']
})
export class JobInputDetailComponent implements OnInit {

  @Input()
  channels;

  _selectedChannel;

  options = {
    use_channel_id: null,
    autohandle_channel: true,
    channel_min_amount: 0, 
    channel_min_expiration: 0
  };

  constructor() {}
  ngOnInit() {}

  get selectedChannel() {
    return this._selectedChannel;
  }
  set selectedChannel(channel) {
    this.options.use_channel_id = channel.channelId;
    this._selectedChannel = channel;
  }
}
