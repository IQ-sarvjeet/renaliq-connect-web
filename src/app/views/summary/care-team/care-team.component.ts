import { Component } from '@angular/core';
import { CareTeamModel, PatientService, PracticeService } from 'src/app/api-client';
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
  careTeamList: CareTeamModel[] = [];
  constructor(private _practiceService: PracticeService) {

  }
  ngOnInit() {
    this.getCareTeamList();
  }
  private getCareTeamList() {
    this.showLoading = true;
    this._practiceService.apiPracticeCareTeamMembersListGet().subscribe((careTeamMemberList: CareTeamModel[]) => {
      if (!careTeamMemberList) {
        this.errorMessage = Messages.noData;
      } else {
        this.careTeamList = careTeamMemberList.filter((member: any) => {
          return !member.name.toLowerCase().includes('engage') && !member.designation.toLowerCase().includes('admin');
        });
      }
      this.showLoading = false;
    },
    (error) => {
      this.errorMessage = Messages.errorFetchingData;
    })
  }
}
