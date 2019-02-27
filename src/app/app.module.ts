import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { OrgEffects } from './reducers/org.effect';
// import { SvcEffects } from './reducers/svc.effect';
import {reducers, metaReducers } from './reducers';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatGridListModule,
  MatMenuModule, MatToolbarModule, MatFormFieldModule, MatSelectModule, MatListModule,
  MatIconModule, MatCardModule, MatTabsModule, MatChipsModule, MatInputModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { OrganizationComponent } from './organization/organization.component';
import { ServiceComponent } from './service/service.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    OrganizationsComponent,
    OrganizationComponent,
    ServiceComponent,
    ProfileComponent
  ],
  imports: [
    MatToolbarModule, MatListModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([OrgEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
