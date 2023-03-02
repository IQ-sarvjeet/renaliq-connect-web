import { Component } from '@angular/core';
import { Messages } from 'src/app/shared/common-constants/messages';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  messages: any = Messages;
}
