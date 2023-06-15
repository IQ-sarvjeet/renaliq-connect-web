import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataCardInput } from '../../interfaces/data-card';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.scss']
})
export class DataCardComponent {
  @Input() cardData: DataCardInput = {} as DataCardInput
  constructor(private router: Router){}
  navigetOnPage(routeName: string) {
    this.router.navigate([routeName]);
  }
}
