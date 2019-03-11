import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { DecimalPipe } from '@angular/common';

import { OrgEffects } from './reducers/org.effect';
import { SvcEffects } from './reducers/svc.effect';
import { ProfileEffects } from './reducers/profile.effect';
import {reducers, metaReducers } from './reducers';

import { environment } from '../environments/environment';

import {MatButtonModule, MatGridListModule, MatProgressSpinnerModule, MatSidenavModule, MatProgressBarModule,
  MatMenuModule, MatToolbarModule, MatFormFieldModule, MatRippleModule, MatSelectModule, MatListModule, MatStepperModule,
  MatRadioModule, MatIconModule, MatCardModule, MatChipsModule, MatInputModule, MatCheckboxModule,
  MatDialogModule, MatExpansionModule, MatTabsModule} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { OrganizationsComponent } from './organizations/organizations.component';
import { OrganizationComponent } from './organization/organization.component';
import { ServiceComponent } from './service/service.component';
import { ProfileComponent } from './profile/profile.component';

import {SnetService} from './snet.service';
import {WindowRefService} from './window-ref.service';
import { MethodRequestFieldComponent } from './method-request-field/method-request-field.component';
import { MethodResponseFieldComponent } from './method-response-field/method-response-field.component';
import { JobResultComponent, DialogDetailComponent } from './job-result/job-result.component';
import { WalletComponent } from './wallet/wallet.component';
import { AgiPipe } from './agi.pipe';
import { JobPaneComponent } from './job-pane/job-pane.component';
import { JobInputComponent } from './job-input/job-input.component';
import { JobResultStepComponent } from './job-result-step/job-result-step.component';
import { JobInputDetailComponent } from './job-input-detail/job-input-detail.component';
import { ActivitiesComponent } from './activities/activities.component';

export function init_snet(snetService: SnetService) {
  return () => snetService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidenavComponent,
    OrganizationsComponent,
    OrganizationComponent,
    ServiceComponent,
    ProfileComponent,
    MethodRequestFieldComponent,
    MethodResponseFieldComponent,
    JobResultComponent,
    WalletComponent,
    DialogDetailComponent,
    AgiPipe,
    JobPaneComponent,
    JobInputComponent,
    JobResultStepComponent,
    JobInputDetailComponent,
    ActivitiesComponent
  ],
  imports: [
    MatToolbarModule, MatListModule, MatMenuModule, MatButtonModule, MatGridListModule, MatSidenavModule, MatIconModule,
    MatCardModule, MatFormFieldModule, MatInputModule, MatChipsModule, MatProgressSpinnerModule, MatProgressBarModule,
    MatRippleModule, MatDialogModule, MatExpansionModule, MatStepperModule, MatTabsModule, MatSelectModule, MatRadioModule,
    MatCheckboxModule,
    BrowserModule, FormsModule, AppRoutingModule, BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([SvcEffects, OrgEffects, ProfileEffects])
    // !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    SnetService, WindowRefService, DecimalPipe,
    { provide: APP_INITIALIZER, useFactory: init_snet, deps: [SnetService], multi: true },
  ],
  entryComponents: [DialogDetailComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
