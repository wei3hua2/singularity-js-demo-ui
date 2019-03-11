import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationsComponent } from './organizations/organizations.component';
import { ProfileComponent } from './profile/profile.component';
import { WalletComponent } from './wallet/wallet.component';
import { OrganizationComponent } from './organization/organization.component';
import { ServiceComponent } from './service/service.component';
import { ActivitiesComponent } from './activities/activities.component';

const routes: Routes = [
  { path: 'organizations', component: OrganizationsComponent },
  { path: 'organization/:oId', component: OrganizationComponent },
  { path: 'organization/:oId/service/:sId', component: ServiceComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'wallet', component: WalletComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: '', redirectTo: '/organizations', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
