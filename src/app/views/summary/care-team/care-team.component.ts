import { Component } from '@angular/core';
import { CareTeam } from '../summary-interfaces/care-team';

@Component({
  selector: 'app-care-team',
  templateUrl: './care-team.component.html',
  styleUrls: ['./care-team.component.scss']
})
export class CareTeamComponent {
  careTeamList: CareTeam[] = [];
  ngOnInit() {
    fetch('assets/mockData/careTeamList.json')
    .then(response => response.json())
    .then((data: CareTeam[]) => {
      this.careTeamList = data;
    })
  }
}
