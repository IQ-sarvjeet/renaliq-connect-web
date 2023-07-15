import { Component } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-combination-chart',
  templateUrl: './combination-chart.component.html',
  styleUrls: ['./combination-chart.component.scss']
})
export class CombinationChartComponent {
  showLoading: boolean = false;
  Highcharts = Highcharts;
  // option: any = {
  //   title: {
  //     text: 'Combination chart'
  //   },
  //   xAxis: {
  //     categories: ['Apples', 'Oranges', 'Pears', 'Bananas', 'Plums']
  //   },
  //   labels: {
  //     items: [{
  //       html: 'Total fruit consumption',
  //       style: {
  //         left: '50px',
  //         top: '18px',
  //         color: 'black'
  //       }
  //     }]
  //   },
  //   series: [
  //     {
  //       type: 'column',
  //       name: 'Jane',
  //       data: [3, 2, 1, 3, 4]
  //     },
  //     {
  //       type: 'column',
  //       name: 'John',
  //       data: [2, 3, 5, 7, 6]
  //     },
  //     {
  //       type: 'column',
  //       name: 'Joe',
  //       data: [4, 3, 3, 9, 0]
  //     },
  //     {
  //       type: 'spline',
  //       name: 'Average',
  //       data: [3, 2.67, 3, 6.33, 3.33]
  //     },
  //     {
  //       type: 'pie',
  //       name: 'Total consumption',
  //       data: [
  //         {
  //           name: 'Jane',
  //           y: 13,
  //           color: '#C8DB70' // Jane's color
  //         },
  //         {
  //           name: 'John',
  //           y: 23,
  //           color: '#0B314F' // John's color
  //         },
  //         {
  //           name: 'Joe',
  //           y: 19,
  //           color: '#999999' // Joe's color
  //         }
  //       ],
  //       center: [100, 80],
  //       size: 100,
  //       showInLegend: false,
  //       dataLabels: {
  //         enabled: false
  //       }
  //     },
  //   ]
  // };

  // option: any = {
  //   title: {
  //     text: 'Sales of petroleum products March, Norway',
  //     align: 'left'
  //   },
  //   xAxis: {
  //     categories: ['Jet fuel', 'Duty-free diesel', 'Petrol', 'Diesel', 'Gas oil']
  //   },
  //   yAxis: {
  //     title: {
  //       text: 'Million liters'
  //     }
  //   },
  //   tooltip: {
  //     valueSuffix: ' million liters'
  //   },
  //   plotOptions: {
  //     series: {
  //       borderRadius: '25%'
  //     }
  //   },
  //   series: [{
  //     type: 'column',
  //     name: '2020',
  //     data: [59, 83, 65, 228, 184]
  //   }, {
  //     type: 'column',
  //     name: '2021',
  //     data: [24, 79, 72, 240, 167]
  //   }, {
  //     type: 'column',
  //     name: '2022',
  //     data: [58, 88, 75, 250, 176]
  //   }, {
  //     type: 'spline',
  //     name: 'Average',
  //     data: [47, 83.33, 70.66, 239.33, 175.66],
  //     marker: {
  //       lineWidth: 2,
  //       lineColor: '#76ADDB',
  //       fillColor: 'white'
  //     }
  //   }, {
  //     type: 'pie',
  //     name: 'Total',
  //     data: [{
  //       name: '2020',
  //       y: 619,
  //       color: '#C8DB70', // 2020 color
  //       dataLabels: {
  //         enabled: true,
  //         distance: -50,
  //         format: '{point.total} M',
  //         style: {
  //           fontSize: '15px'
  //         }
  //       }
  //     }, {
  //       name: '2021',
  //       y: 586,
  //       color: '#0B314F' // 2021 color
  //     }, {
  //       name: '2022',
  //       y: 647,
  //       color: '#999999' // 2022 color
  //     }],
  //     center: [75, 65],
  //     size: 100,
  //     innerSize: '70%',
  //     showInLegend: false,
  //     dataLabels: {
  //       enabled: false
  //     }
  //   }]
  // };


  option: any = {
    title: {
      text: 'Combination chart'
    },
    xAxis: {
      categories: ['August 2022', 'September 2022', 'October 2022', 'November 2022', 'December 2022', 
      'January 2023', 'February 2023', 'March 2023', 'April 2023', 'May 2023', 'June 2023', 'July 2023']
    },
    yAxis: {
      min: 0,
      title: {
          text: 'Count trophies'
      },
      stackLabels: {
          enabled: true
      }
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [
      {
        type: 'column',
        name: 'Engaged',
        data: [3, 2, 1, 3, 4, 2, 1, 3, 4, 9, 2, 5]
      },
      {
        type: 'column',
        name: 'Patient Count',
        data: [2, 3, 5, 7, 6, 2, 1, 3, 4, 9, 5, 2]
      },
      {
        type: 'line',
        name: 'PMPM Payment Amount',
        data: [3, 2, 1, 3, 4, 2, 1, 3, 4, 9, 2, 5]
      },
      {
        type: 'line',
        name: 'Incentive at 80%',
        data: [2, 3, 5, 7, 6, 2, 1, 3, 4, 9, 5, 2]
      },
      {
        type: 'line',
        name: 'Incentive at 100%',
        data: [2, 10, 5, 8, 4, 9, 1, 3, 6, 3, 7, 8]
      }
    ]
  };
}
