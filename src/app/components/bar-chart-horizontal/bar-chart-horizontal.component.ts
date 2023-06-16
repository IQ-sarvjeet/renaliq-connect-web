import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Messages } from 'src/app/shared/common-constants/messages';
import { environment } from 'src/environments/environment';

type ChartApiResponse = {
  categories: any;
    series: any;
  }
export type BarChartConfig = {
  apiUrl: string;
  title: string;
}

@Component({
  selector: 'app-bar-chart-horizontal',
  templateUrl: './bar-chart-horizontal.component.html',
  styleUrls: ['./bar-chart-horizontal.component.scss']
})
export class BarChartHorizontalComponent {
  // @ViewChild('barChart', { static: false }) barChart!: ElementRef<HTMLDivElement>;
  showLoading: boolean = false;
  errorMessage: string | null = null;
   chartConfig: BarChartConfig = {} as BarChartConfig;
  Highcharts = Highcharts;
  @Input() set config(inputValue: BarChartConfig) {
    this.chartConfig = inputValue;
    this.fetchChartData(inputValue.apiUrl);
  }
  option: any = {
        chart: {
          type: "bar",
          innerHeight:500
        },
        colors: ['#62539e'],
        title: {
          text: '',
          align: 'left',
        },
        xAxis:{
          categories: []
        },
        yAxis: {
       //    min:0,
          // max:2000,
          tickInterval: undefined,
       //   tickLength:0,
         title: {
            text: null,
        //    align: "high"
          },
          
          labels: {
            overflow: "justify"
          },
          
        },
        plotOptions: {
          series: {
            animation: false,
            groupPadding: 0,
            pointPadding: 0.1,
            borderWidth: 0,
            colorByPoint: true,
            dataSorting: {
                enabled: true,
                matchByName: true
            },
            type: 'bar',
            dataLabels: {
                enabled: true
            }
        }
        },
        credits: {
          enabled: false
        },
        series: [{
          type: 'column',
          name: '',
          colorByPoint: true,
          data: [],
          showInLegend: false
        }]
      };
  constructor(private httpClient: HttpClient) {}
  ngOnInit() {}
  
  protected renderChart(chartData: ChartApiResponse): void {
    const series = this.option.series;
    let convertedSeries: number[] = [];
    chartData.series.forEach((series: any) => {
      convertedSeries.push(parseInt(series));
    });
    series[0].data = convertedSeries;
    this.option = {
      ...this.option,
      xAxis: {
        ...this.option.xAxis,
        categories: chartData.categories
      },
      yAxis: {
        ...this.option.yAxis,
     //   title: {
     //     ...this.option.yAxis.title,
       //   text: this.chartConfig.title,
    //    }        
      },
      
      series: [
        ...series
      ]
    }
  }
  private fetchChartData(url: string): void {
    this.showLoading = true;
    this.httpClient.get(`${environment.baseApiUrl}/api/${url}`).subscribe((data: any) => {
      if (data) {
        this.renderChart(data);
        this.showLoading = false;
        this.errorMessage = null;
        return;
      }
      this.errorMessage = Messages.noData;
    },
    (error) => {
      this.errorMessage = Messages.errorFetchingData;
    })
  } 
}
