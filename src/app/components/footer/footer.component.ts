import { Component , OnInit} from '@angular/core';
import { CommonConstants } from 'src/app/shared/common-constants/common-constants';
import { Messages } from 'src/app/shared/common-constants/messages';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
  messages: any = Messages;
  gtagId! : string;
  ngOnInit() {
    this.gtagId = CommonConstants.GTAG_ID;
 }
}
