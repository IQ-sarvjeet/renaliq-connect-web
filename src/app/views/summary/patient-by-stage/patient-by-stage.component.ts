import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-patient-by-stage',
  templateUrl: './patient-by-stage.component.html',
  styleUrls: ['./patient-by-stage.component.scss']
})
export class PatientByStageComponent {
  chartConfig: any = { apiUrl: 'Patient/summary/stage', title: '' };
  patientByStage: any = [];
  constructor(private httpClient: HttpClient) {}
  ngOnInit(){
    this.httpClient.get(`${environment.baseApiUrl}api/Patient/summary/stage`).subscribe({
      next: (response: any) => {
        const gridData: any = [];
        Object.keys(response).forEach((key: string) => {
          gridData.push({key, value: response[key]});
        })
        this.patientByStage = gridData;
      },
      error: (error: any) => {

      }
    })
  }
}
