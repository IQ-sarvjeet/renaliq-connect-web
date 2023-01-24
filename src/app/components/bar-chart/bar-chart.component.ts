import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  @ViewChild('barChart', { static: false }) barChart!: ElementRef<HTMLDivElement>;
  @Input() set config(inputValue: BarChartConfig) {
    this.chartConfig = inputValue;
    this.fetchChartData(inputValue.apiUrl);
  }
  private chartConfig: BarChartConfig = {} as BarChartConfig;
  constructor() {

  }
  ngOnInit() {}
  private fetchChartData(url: string): void {
    // this.httpClient.get(url).subscribe((data: any) => {
    //   console.log(data);
    //   this.renderChart(data);
    // })
    fetch(url).then((response: any) => response.json())
    .then((data: any) => {
      this.renderChart(data);
    });
  }
  private renderChart(chartData: ChartApiResponse): void {
    const chartDom = this.barChart.nativeElement;
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
