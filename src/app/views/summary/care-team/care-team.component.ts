import { Component } from '@angular/core';
import { PatientService } from 'src/app/api-client';
import { CareTeam } from '../summary-interfaces/care-team';

@Component({
  selector: 'app-care-team',
  templateUrl: './care-team.component.html',
  styleUrls: ['./care-team.component.scss']
})
export class CareTeamComponent {
  showLoading: boolean = false;
  careTeamList: CareTeam[] = [];
  constructor(private _patientService: PatientService) {

  }
  ngOnInit() {
    this.getCareTeamList();
  }
  private getCareTeamList() {
    this.showLoading = true;
    this._patientService.apiPatientSummaryCareteammemberGet().subscribe((careTeamMemberList: CareTeam[]) => {
      this.careTeamList = careTeamMemberList;
      this.showLoading = false;
    })
  }
}
