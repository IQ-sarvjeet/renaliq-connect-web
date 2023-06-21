import { Component } from '@angular/core';
import { PBIReportService } from 'src/app/api-client';

@Component({
  selector: 'app-power-bi-report',
  templateUrl: './power-bi-report.component.html',
  styleUrls: ['./power-bi-report.component.scss']
})
export class PowerBIReportComponent {
  configData: any;
  constructor(private PBIReportService: PBIReportService) {}
  ngOnInit() {
    this.getPowerBIReport();
  }

  async getPowerBIReport(){
    this.PBIReportService.apiPBIReportReporturiConfigGet('ckcc').subscribe({
      next: (reportData: any) => {
        this.configData = reportData;
      },
      error: (error: any) => {},
    });
  }
}
