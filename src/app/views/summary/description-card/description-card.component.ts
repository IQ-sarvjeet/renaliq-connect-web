import { Component, Input } from '@angular/core';
import { DescriptionCardInput } from '../summary-interfaces/description-card';

@Component({
  selector: 'app-description-card',
  templateUrl: './description-card.component.html',
  styleUrls: ['./description-card.component.scss']
})
export class DescriptionCardComponent {
  @Input() cardData: DescriptionCardInput = {} as DescriptionCardInput
}
