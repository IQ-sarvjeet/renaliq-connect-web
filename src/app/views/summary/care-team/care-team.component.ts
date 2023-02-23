import { Component } from '@angular/core';
import { PatientService } from 'src/app/api-client';
import { CareTeam } from '../summary-interfaces/care-team';

@Component({
  selector: 'app-care-team',
  templateUrl: './care-team.component.html',
  styleUrls: ['./care-team.component.scss']
})
export class CareTeamComponent {
  careTeamList: CareTeam[] = [];
  constructor(private _patientService: PatientService) {

  }
  ngOnInit() {
    this._patientService.apiPatientSummaryCareteammemberGet().subscribe((careTeamMemberList: CareTeam[]) => {
      this.careTeamList = careTeamMemberList;
    })
  }
}
