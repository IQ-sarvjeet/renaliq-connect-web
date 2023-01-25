import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';

type ChartApiResponse = {
  categories: any;
    series: any;
  }
type BarChartConfig = {
  apiUrl: string;
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
  chart: any;
  Highcharts = Highcharts;
  private chartConfig: BarChartConfig = {} as BarChartConfig;
  option :any = {
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
          text: this.chartConfig.title
        },
        xAxis:{},
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
  ngOnInit() {this.chart = Highcharts.chart("barChart", this.option);}
  protected renderChart(chartData: ChartApiResponse): void {
      console.log('chartData:', chartData);
      
        this.option.xAxis.categories = chartData.categories;
        this.option.series[0].data = chartData.series;
        this.chart.update({...this.option})
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
