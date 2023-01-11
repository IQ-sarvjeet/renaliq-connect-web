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

@Component({
  selector: 'app-bar-chart-horizontal',
  templateUrl: './bar-chart-horizontal.component.html',
  styleUrls: ['./bar-chart-horizontal.component.scss']
})
export class BarChartHorizontalComponent {
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
    const chartDom = document.getElementById('barChartH');
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      let option: EChartsOption;
      option = {
        title: {
          text: this.chartConfig.title
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
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
