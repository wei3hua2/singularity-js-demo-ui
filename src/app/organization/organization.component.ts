import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.scss']
})
export class OrganizationComponent implements OnInit {
  orgId: string;

  constructor(
    private route: ActivatedRoute,
    private rtr: Router) {
      this.orgId = this.route.snapshot.paramMap.get('oId');
    }

  ngOnInit() {
  }

  goToService(evt) {
    this.rtr.navigate(['/organization/' + this.orgId + '/service/', 'serviceId2']);
  }
}
