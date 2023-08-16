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
    this.httpClient.get(`${environment.baseApiUrl}/api/Patient/summary/stage`).subscribe({
      next: (response: any) => {
        const gridData: any = [];
        let sum: number = 0;
        Object.keys(response).forEach((key: string) => {
          sum += response[key];
        });
        Object.keys(response).forEach((key: string) => {
          gridData.push({key, value: response[key], percent: parseFloat((response[key]/sum * 100).toFixed(0))});
        });
        this.patientByStage = gridData;
      },
      error: (error: any) => {

      }
    })
  }
}
