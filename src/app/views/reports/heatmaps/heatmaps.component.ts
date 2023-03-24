import { Component, Input } from '@angular/core';
import { PatientService } from 'src/app/api-client';

declare const google: any;

@Component({
  selector: 'app-heatmaps',
  templateUrl: './heatmaps.component.html',
  styleUrls: ['./heatmaps.component.scss']
})
export class HeatmapsComponent {
  @Input() patientByStageKeys: any = [];
  age: any = '';
  stage: any = '';
  constructor(private patientService: PatientService) {}
  ngOnInit() {
    this.fetchData();
  }
  private fetchData() {
    this.patientService.apiPatientLatlongPost({
      age: this.age,
      educationLevel: '',
      incomeLevel: '',
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
      zoom: 13,
      center: { lat: centerLat, lng: centerLng },
      mapTypeControl: false,
      streetViewControl: false
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
}
