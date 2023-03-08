import { Component } from '@angular/core';
import { PatientService } from 'src/app/api-client';
import { Messages } from 'src/app/shared/common-constants/messages';
import { CareTeam } from '../summary-interfaces/care-team';

@Component({
  selector: 'app-care-team',
  templateUrl: './care-team.component.html',
  styleUrls: ['./care-team.component.scss']
})
export class CareTeamComponent {
  showLoading: boolean = false;
  errorMessage: string | null = null;
  careTeamList: CareTeam[] = [];
  constructor(private _patientService: PatientService) {

  }
  ngOnInit() {
    this.getCareTeamList();
  }
  private getCareTeamList() {
    this.showLoading = true;
    this._patientService.apiPatientSummaryCareteammemberGet().subscribe((careTeamMemberList: CareTeam[]) => {
      if (!careTeamMemberList) {
        this.errorMessage = Messages.noData;
      } else {
        this.careTeamList = careTeamMemberList;
      }
      this.showLoading = false;
    },
    (error) => {
      this.errorMessage = Messages.errorFetchingData;
    })
  }
}
