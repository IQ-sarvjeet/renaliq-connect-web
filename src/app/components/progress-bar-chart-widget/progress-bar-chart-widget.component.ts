import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ProgressBarChartWidgetInput } from 'src/app/interfaces/progress-bar-chart-widget';
import { Messages } from 'src/app/shared/common-constants/messages';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-progress-bar-chart-widget',
  templateUrl: './progress-bar-chart-widget.component.html',
  styleUrls: ['./progress-bar-chart-widget.component.scss']
})
export class ProgressBarChartWidgetComponent {  
  showLoading: boolean = false;
  errorMessage: string | null = null;
  chartConfig: ProgressBarChartWidgetInput = {} as ProgressBarChartWidgetInput;
  chartData: any = [];
  @Input() set config(inputValue: ProgressBarChartWidgetInput) {
    if (inputValue) {
      this.chartConfig = inputValue;
      this.loadChartData(inputValue.apiUrl);
    }
  }
  constructor(private httpClient: HttpClient) {

  }
  private loadChartData(url: string): void {
    this.showLoading = true;
    this.httpClient.get(`${environment.baseApiUrl}/api/${url}`).subscribe((data: any) => {
      if (data) {
        this.chartData = data;
        this.showLoading = false;
        this.errorMessage = null;
        return;
      }
      this.errorMessage = Messages.noData;
    },
    (error) => {
      this.errorMessage = Messages.errorFetchingData;
    })
  }
}
