import { Component } from '@angular/core';
import { PatientService } from 'src/app/api-client';

// const latLngArr = [
//   [37.782551, -122.445368],
//   [37.782745, -122.444586],
//   [37.782842, -122.443688],
//   [37.782919, -122.442815],

//   [37.782992, -122.442112],
//   [37.7831, -122.441461],
//   [37.783206, -122.440829],
//   [37.783273, -122.440324],
//   [37.783316, -122.440023]
// ]

declare const google: any;

@Component({
  selector: 'app-heatmaps',
  templateUrl: './heatmaps.component.html',
  styleUrls: ['./heatmaps.component.scss']
})
export class HeatmapsComponent {
  age: any = '';
  constructor(private patientService: PatientService) {}
  ngOnInit() {
    this.fetchData();
  }
  private fetchData() {
    this.patientService.apiPatientLatlongPost({
      age: this.age,
      educationLevel: '',
      incomeLevel: '',
      diseaseState: '',
    }).subscribe({
      next: (response: any) => {
        this.initMap(this.generatePoints(response.patientLocation), response.practiceLatitude, response.practiceLongitude);
      }
    })
  }
  private generatePoints(latLngArr: any) {
    const pointsArr: any = [];
    latLngArr.forEach((point: any) => {
      pointsArr.push(new google.maps.LatLng(point[0], point[1]));
    })
    return pointsArr;
  }
  private initMap(points: any, centerLat: any, centerLng: any): void {
    let map: any, heatmap: any;
    map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      zoom: 13,
      center: { lat: centerLat, lng: centerLng },
      mapTypeControl: false,
      streetViewControl: false,
      styles:[
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#f5f5f5"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#ffffff"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#dadada"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#e5e5e5"
            }
          ]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#eeeeee"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#c9c9c9"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        }
      ]
    });
  
    heatmap = new google.maps.visualization.HeatmapLayer({
      data: points,
      map: map,
    });
  }
  onAgeChanged($event: any) {
    this.age = $event.target.value;
    this.fetchData();
  }
}
