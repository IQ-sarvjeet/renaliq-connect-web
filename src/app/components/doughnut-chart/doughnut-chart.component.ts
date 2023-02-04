import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import * as Highcharts from 'highcharts';

type BarChartConfig = {
  apiUrl: string;
  title: string;
}

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent {
  // @ViewChild('doughnutChart', { static: false }) doughnutChart!: ElementRef<HTMLDivElement>;
  Highcharts = Highcharts;
  @Input() set config(inputValue: BarChartConfig) {
    this.chartConfig = inputValue;
    this.fetchChartData(inputValue.apiUrl);
  }
  options: any = {
    chart: {
      type: 'pie',
    },
    title: {
      text: '',
      align: 'left'
    },
    subtitle: {
      text: '',
      align: 'left'
    },
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          style: {
            fontWeight: 'bold',
            color: 'black'
          }
        },
        center: ['30%', '50%'],
        size: '145%'
      }
    },
    tooltip: {
      valueSuffix: '%',
    },
    legend: {
      align: 'right',
      layout: 'vertical'
    },
    colors: ["#083050", "#46647c", "#8397a7", "#ced6dc", "#2684ff"],
    series: [{
      type: 'pie',
      name: '',
      innerSize: '50%',
      data: [],
      showInLegend: true
    }]
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
    const series = this.options.series;
    series[0].data = chartData;
    this.options = {
      ...this.options,
      title: {
        ...this.options.title,
        text: this.chartConfig.title 
      },
      series: [
        ...series
      ]
    }
  }
}
