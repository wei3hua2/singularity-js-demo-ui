import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {Observable} from 'rxjs';
import * as fromRoot from '../reducers';
import {LoadNetwork, LoadAgiAmount, LoadEscrowBalance} from '../reducers/profile.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  network$: Observable<string>;
  agiAmount$: Observable<number>;
  escrowBalance$: Observable<number>;

  constructor(private store: Store<fromRoot.State>) {}

  ngOnInit() {
    this.store.dispatch(new LoadNetwork());
    this.store.dispatch(new LoadAgiAmount());
    this.store.dispatch(new LoadEscrowBalance());
    
    this.network$ = this.store.select(state => state.profile.network);
    this.agiAmount$ = this.store.select(state => state.profile.agiInCogs);
    this.escrowBalance$ = this.store.select(state => state.profile.agiEscrowInCogs);
  }

}
