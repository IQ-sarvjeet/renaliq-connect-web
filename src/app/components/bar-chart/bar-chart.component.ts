import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';

type ChartApiResponse = {
  categories: any;
    series: any;
  }
export type BarChartConfig = {
  apiUrl: string;
  title: string;
}


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  // @ViewChild('barChart', { static: false }) barChart!: ElementRef<HTMLDivElement>;
  private chartConfig: BarChartConfig = {} as BarChartConfig;
  Highcharts = Highcharts;
  @Input() set config(inputValue: BarChartConfig) {
    this.chartConfig = inputValue;
    this.fetchChartData(inputValue.apiUrl);
  }
  option: any = {
        chart: {
          type: "bar"
        },
        colors: [
            '#0D2F4F',
            '#5A7287',
            '#95A3B2',
            '#B2BCC7'
            
        ],
        title: {
          text: ''
        },
        xAxis:{
          categories: []
        },
        yAxis: {
          min:0,
          max:2000,
          tickInterval: 500,
          title: {
            text: "Patient By Age",
            align: "high"
          },
          labels: {
            overflow: "justify"
          },
          
        },
        plotOptions: {
          bar: {
            dataLabels: {
              enabled: true
            },
            colorByPoint: true
          },
        },
        credits: {
          enabled: false
        },
        series: [{
          type: 'column',
          name: 'Unemployed',
          colorByPoint: true,
          data: [],
          showInLegend: false
        }]
      };
  constructor() {

  }
  ngOnInit() {}
  
  protected renderChart(chartData: ChartApiResponse): void {
    const series = this.option.series;
    series[0].data = chartData.series;
    this.option = {
      ...this.option,
      title: {
        ...this.option.title,
        text: this.chartConfig.title 
      },
      xAxis: {
        ...this.option.xAxis,
        categories: chartData.categories
      },
      series: [
        ...series
      ]
    }
  }
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
}
