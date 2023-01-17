import { Component, Input } from '@angular/core';
import { ProgressBarChartWidgetInput } from 'src/app/interfaces/progress-bar-chart-widget';

@Component({
  selector: 'app-progress-bar-chart-widget',
  templateUrl: './progress-bar-chart-widget.component.html',
  styleUrls: ['./progress-bar-chart-widget.component.scss']
})
export class ProgressBarChartWidgetComponent {  
  chartConfig: ProgressBarChartWidgetInput = {} as ProgressBarChartWidgetInput;
  chartData: any = [];
  @Input() set config(inputValue: ProgressBarChartWidgetInput) {
    if (inputValue) {
      this.chartConfig = inputValue;
      this.loadChartData(inputValue.apiUrl);
    }
  }
  private loadChartData(url: string): void {
    fetch(url).then((response: any) => response.json())
    .then((data: any) => {
      console.log('response:', data);
      this.chartData = data;
    });
  }
}
