import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
import { AccountService, PracticeService } from '../../api-client';
import { EventService } from 'src/app/services/event.service';
import { Messages } from 'src/app/shared/common-constants/messages';

type Practice = {
  isSelected: boolean;
  name: string;
  practiceId: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  messages: any = Messages;
  selectedPractice: Practice = {} as Practice;
  practiceList: Practice[] = [];
  constructor(
    private _accountService: AccountService,
    private _localStorage: LocalStorageService,
    private practiceService: PracticeService,
    private route: Router,
    private eventService: EventService
  ) {}
  ngOnInit() {
    this.practiceService.apiPracticeListGet().subscribe((practiceList: any) => {
      this.practiceList = practiceList;
      if (practiceList.length) {
        this.eventService.errorMessageUpdate({
          type: 'error',
          title: '',
          body: this.messages.errorPractice
        });
        this.route.navigate(['/error']);
        return;
      };
      const selectedItem = practiceList.filter((item: Practice) => item.isSelected);
      if (selectedItem.length > 0) {
        this.selectedPractice = selectedItem[0];
      } else {
        this.selectedPractice = this.practiceList[0];
        this.selectPracticeHandlar(this.selectedPractice);
      }
    })
  }
  public async logOut() {
    try {
      var result = await this._accountService.apiAccountLogoutPost().toPromise();
      this._localStorage.clearAll();
      this.route.navigate(['/login']);    
    } catch (ex: any) {
      console.log(ex);
    }
  }
  selectPracticeHandlar(practice: Practice) {
    this.selectedPractice = practice;
    this.practiceService.apiPracticeUpdatePracticeIdPost(this.selectedPractice.practiceId)
    .subscribe((response: any) => {
      window.location.reload();
    })
  }
}
