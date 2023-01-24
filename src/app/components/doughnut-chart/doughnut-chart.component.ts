import { HttpClient } from '@angular/common/http';
import { LocalizedString } from '@angular/compiler';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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
  @ViewChild('doughnutChart', { static: false }) doughnutChart!: ElementRef<HTMLDivElement>;
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
    // const chartDom = document.getElementById('doughnutChart');
    const chartEle = this.doughnutChart.nativeElement;
    if (chartEle) {
      const chartRef = echarts.init(chartEle);
      let option: EChartsOption;
      option = {
        color: ["#083050", "#46647c", "#8397a7", "#ced6dc", "#2684ff"],
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          right: '5%',
          width: '30%'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['50%', '90%'],
            avoidLabelOverlap: false,
            left: '-50%',
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 15,
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
      option && chartRef.setOption(option);
    }
  }
}
