import { Component, Input } from '@angular/core';
import { DataCardInput } from '../../../interfaces/data-card';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.scss']
})
export class DataCardComponent {
  @Input() cardData: DataCardInput = {} as DataCardInput
}
