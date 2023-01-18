import { HttpClient } from '@angular/common/http';
import { LocalizedString } from '@angular/compiler';
import { Component, Input } from '@angular/core';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

type BarChartConfig = {
  apiUrl: string;
  side: string;  
  title: string;
}

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent {
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
  private renderChart(chartData: any): void {
    const chartDom = document.getElementById('doughnutChart');
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      let option: EChartsOption;
      option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: chartData
          }
        ]
      };
      option && myChart.setOption(option);
    }
  }
}
