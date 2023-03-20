import { Component } from '@angular/core';
// import * as Highcharts from 'highcharts';
import * as Highcharts from "highcharts/highmaps";
import * as MarkerClusters from "highcharts/modules/marker-clusters";
import * as ModulesData from "highcharts/modules/data";
import * as Coloraxis from "highcharts/modules/coloraxis";

MarkerClusters.default(Highcharts);
// ModulesData.default(Highcharts);
// Coloraxis.default(Highcharts);

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  Highcharts: any = Highcharts;
  MarkerClusters: any = MarkerClusters;
  chartConstructor = "mapChart";
  option: any = {
    chart: {
        type: 'mapChart'
        // map: topology
    },
    title: {
        text: '',
        align: 'left'
    },
    subtitle: {
        text: '',
        align: 'left'
    },
    mapNavigation: {
        enabled: true
    },
    tooltip: {
        headerFormat: '',
        pointFormat: '<b>{point.name}</b><br>Lat: {point.lat:.2f}, Lon: {point.lon:.2f}'
    },
    colorAxis: {
        min: 0,
        max: 20
    },
    plotOptions: {
        mappoint: {
            cluster: {
                enabled: true,
                allowOverlap: false,
                animation: {
                    duration: 450
                },
                layoutAlgorithm: {
                    type: 'grid',
                    gridSize: 70
                },
                zones: [{
                    from: 1,
                    to: 4,
                    marker: {
                        radius: 13
                    }
                }, {
                    from: 5,
                    to: 9,
                    marker: {
                        radius: 15
                    }
                }, {
                    from: 10,
                    to: 15,
                    marker: {
                        radius: 17
                    }
                }, {
                    from: 16,
                    to: 20,
                    marker: {
                        radius: 19
                    }
                }, {
                    from: 21,
                    to: 100,
                    marker: {
                        radius: 21
                    }
                }]
            }
        }
    },
    series: [{
        name: 'Europe',
        accessibility: {
            exposeAsGroupOnly: true
        },
        borderColor: '#A0A0A0',
        nullColor: 'rgba(0 133 255, 0.7)',
        showInLegend: false
    }, {
        type: 'mappoint',
        enableMouseTracking: true,
        accessibility: {
            point: {
                descriptionFormatter: function (point: any) {
                    if (point.isCluster) {
                        return 'Grouping of ' + point.clusterPointsAmount + ' points.';
                    }
                    return point.name + ', country code: ' + point.country + '.';
                }
            }
        },
        colorKey: 'clusterPointsAmount',
        name: 'Cities',
        data: [],
        color: this.Highcharts.getOptions().colors[5],
        marker: {
            lineWidth: 1,
            lineColor: '#fff',
            symbol: 'mapmarker',
            radius: 8
        },
        dataLabels: {
            verticalAlign: 'top'
        }
    }]
  }
  ngOnInit() {
    this.renderChart();
  }
  async renderChart() {
    const topology = await fetch(
      'https://code.highcharts.com/mapdata/custom/europe.topo.json'
    ).then(response => response.json());
      // this.Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@1e9e659c2d60fbe27ef0b41e2f93112dd68fb7a3/samples/data/european-train-stations-near-airports.json',
      // function (data: any) {
          // Highcharts.mapChart('container', );
          // this.option.chart.map = topology;
      // });
    // const data = await Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@1e9e659c2d60fbe27ef0b41e2f93112dd68fb7a3/samples/data/european-train-stations-near-airports.json');
    // const data = await fetch('https://cdn.jsdelivr.net/gh/highcharts/highcharts@1e9e659c2d60fbe27ef0b41e2f93112dd68fb7a3/samples/data/european-train-stations-near-airports.json').then(response => response.json());
    const data = await fetch('https://cdn.jsdelivr.net/gh/highcharts/highcharts@1e9e659c2d60fbe27ef0b41e2f93112dd68fb7a3/samples/data/european-train-stations-near-airports.json').then(response => response.json());
    // this.option.chart.map = topology;
    const seriesData = this.option.series;
    seriesData[1].data = data;
    this.option = {
      ...this.option,
      chart: {
        map: topology
      }
    }
  }
}
