import { Component } from '@angular/core';
import { PBIReportService } from 'src/app/api-client';

@Component({
  selector: 'app-PBI-report',
  templateUrl: './PBI-report.component.html',
  styleUrls: ['./PBI-report.component.scss']
})
export class PBIReportComponent {
  configData: any;
  constructor(private PBIReportService: PBIReportService) { }
  ngOnInit() {
    this.getPowerBIReport();
  }

  async getPowerBIReport() {
    this.PBIReportService.apiPBIReportReporturiConfigGet('ckcc').subscribe({
      next: (reportData: any) => {
        this.configData = reportData;
      },
      error: (error: any) => {
        console.log("Error...");
      },
    });

  }
}
