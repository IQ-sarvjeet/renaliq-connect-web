import { HttpClient } from '@angular/common/http';
import { LocalizedString } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import * as echarts from 'echarts';

type ChartApiResponse = {
  axis: any;
  series: any;
}

type EChartsOption = echarts.EChartsOption;

type BarChartConfig = {
  apiUrl: string;
  side: string;  
  title: string;
}

// option = {
//   title: {
//     text: "Patient Age"
//   },
//   xAxis: {
//     type: 'value'
//   },
//   yAxis: {
//     type: 'category',
//     data: ['40', '60', '80']
//   },
//   series: [
//     {
//       data: [120, 200, 150],
//       type: 'bar'
//     }
//   ]
// };

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  @Input() set config(inputValue: BarChartConfig) {
    this.chartConfig = inputValue;
    this.fetchChartData(inputValue.apiUrl);
  }
  private chartConfig: BarChartConfig = {} as BarChartConfig;
  constructor(private httpClient: HttpClient) {

  }
  ngOnInit() {}
  private fetchChartData(url: string): void {
    this.httpClient.get(url).subscribe((data: any) => {
      console.log(data);
      this.renderChart(data);
    })
  }
  private renderChart(chartData: ChartApiResponse): void {
    const chartDom = document.getElementById('barChart');
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      let option: EChartsOption;
      option = {
        title: {
          text: this.chartConfig.title
        },
        yAxis: {
          type: 'value'
        },
        xAxis: {
          type: 'category',
          data: chartData.axis
        },
        series: [
          {
            data: chartData.series,
            type: 'bar'
          }
        ]
      };
      option && myChart.setOption(option);
    }
  }
}
