import { Component, Input } from '@angular/core';
import { PatientService } from 'src/app/api-client';

declare const google: any;
const styles = [
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

@Component({
  selector: 'app-heatmaps',
  templateUrl: './heatmaps.component.html',
  styleUrls: ['./heatmaps.component.scss']
})
export class HeatmapsComponent {
  @Input() patientByStageKeys: any = [];
  @Input() patientByRiskCategoryKeys: any = [];
  age: any = '';
  stage: any = '';
  riskCategory: any = '';
  constructor(private patientService: PatientService) {}
  ngOnInit() {
    this.fetchData();
  }
  private fetchData() {
    this.patientService.apiPatientLatlongPost({
      age: this.age,
      educationLevel: '',
      incomeLevel: this.riskCategory,
      diseaseState: this.stage,
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
      zoom: 8,
      center: { lat: centerLat, lng: centerLng },
      mapTypeControl: false,
      streetViewControl: false,
      styles: styles
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
  onStageChanged($event: any) {
    this.stage = $event.target.value;
    this.fetchData();
  }
  onRiskCategoryChanged($event: any) {
    this.riskCategory = $event.target.value;
    this.fetchData();
  }
}
