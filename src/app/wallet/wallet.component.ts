import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import {GetAddress, GetChannels} from '../reducers/profile.actions';
import {Observable} from 'rxjs';
import {SnetService} from '../snet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  profile$: Observable<any>;
  channels$: Observable<any>;

  constructor(private store: Store<fromRoot.State>, private snet: SnetService) {}

  ngOnInit() {
    this.store.dispatch(new GetAddress(this.snet.getAddress()));
    this.store.dispatch(new GetChannels({}));

    this.profile$ = this.store.select(state => state.profile);
    this.channels$ = this.store.select(state => state.profile.channels);

    this.channels$.subscribe(console.log);
  }

}
