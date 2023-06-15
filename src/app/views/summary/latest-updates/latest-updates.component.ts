import { Component } from '@angular/core';
import { LatestUpdates } from '../summary-interfaces/latest-updates';

@Component({
  selector: 'app-latest-updates',
  templateUrl: './latest-updates.component.html',
  styleUrls: ['./latest-updates.component.scss']
})
export class LatestUpdatesComponent {
  latestUpdates: LatestUpdates[] = [];
  ngOnInit() {
    fetch('assets/mockData/latestUpdates.json')
    .then(response => response.json())
    .then((data: LatestUpdates[]) => {
      this.latestUpdates = data;
    })
  }
}
