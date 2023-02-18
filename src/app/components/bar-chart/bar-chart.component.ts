import { Component, ElementRef, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import { BarChartConfig } from 'src/app/interfaces/bar-chart-config';

type ChartApiResponse = {
  categories: any;
    series: any;
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
    title: {
      text: '',
      align: 'left'
    },
    colors: ['#51debb'],
    subtitle: {
        text: '',
        align: 'left'
    },
    xAxis: {
        categories: []
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
    const colors = this.chartConfig.colors ? this.chartConfig.colors: this.option.colors;
    this.option = {
      ...this.option,
      title: {
        ...this.option.title,
        text: this.chartConfig.title 
      },
      colors,
      xAxis: {
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
