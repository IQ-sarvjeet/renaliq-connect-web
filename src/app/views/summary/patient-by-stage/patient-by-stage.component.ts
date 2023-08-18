import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-patient-by-stage',
  templateUrl: './patient-by-stage.component.html',
  styleUrls: ['./patient-by-stage.component.scss']
})
export class PatientByStageComponent {
  chartConfig: any = { apiUrl: 'Patient/summary/stage', title: '' };
  patientByStage: any = [];
  chartColors: String[] = ["#76ADDB", "#C8DB70", "#0B314F", "#999999", "#d96716"];
  constructor(private httpClient: HttpClient, private eventService: EventService) {}
  ngOnInit(){
    this.httpClient.get(`${environment.baseApiUrl}/api/Patient/summary/stage`).subscribe({
      next: (response: any) => {
        const gridData: any = [];
        let sum: number = 0;
        Object.keys(response).forEach((key: string) => {
          if (response[key] && typeof (response[key]) === 'number') {
            sum += response[key];
            gridData.push([key, response[key]]);
          } else {
            this.eventService.openToaster({
              showToster: true,
              message: `Patient By Stage Data is not coming in correct format from backend.`,
              type: 'danger',
            });
            return;
          }
        });
        Object.keys(response).forEach((key: string, index: number) => {
          gridData.push({key, value: response[key], percent: parseFloat((response[key]/sum * 100).toFixed(0)), color: this.chartColors[index]});
        });
        this.patientByStage = gridData;
      },
      error: (error: any) => {

      }
    })
  }
}
