import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-power-bi-report',
  templateUrl: './power-bi-report.component.html',
  styleUrls: ['./power-bi-report.component.scss']
})
export class PowerBIReportComponent {
  configData: any;
  constructor(private httpClient: HttpClient) {}
  ngOnInit() {
    this.getPowerBIReport();
  }

  async getPowerBIReport(){
    this.httpClient.get('https://localhost:5001/api/Report/report?reporturi=ckcc').subscribe({
      next: (reportData: any) => {
        this.configData = reportData;
      },
      error: (error: any) => {},
    });
  }
}
