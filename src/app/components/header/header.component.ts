import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
import { AccountService, PracticeService } from '../../api-client';
import { EventService } from 'src/app/services/event.service';
import { Messages } from 'src/app/shared/common-constants/messages';
import { AuthService } from 'src/app/services/auth.service';
import { CommonConstants } from 'src/app/shared/common-constants/common-constants';
import { UserInfo } from 'src/app/interfaces/user';
import { StoreService } from 'src/app/services/store.service';
import { filter } from 'rxjs/operators';

type Practice = {
  isSelected: boolean;
  name: string;
  practiceId: number;
  npi: string;
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
  userInfo: UserInfo = {
    fullName: '',
    roleName: ''
  };
  currentRoute: string = '/';
  constructor(
    private _accountService: AccountService,
    private _localStorage: LocalStorageService,
    private practiceService: PracticeService,
    private route: Router,
    private eventService: EventService,
    private authService: AuthService,
    private storeService: StoreService,
  ) {
    route.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
  }
  ngOnInit() {
    this.eventService.userLoggedInSubscription().subscribe({
      next: (response: boolean) => {
        if (!this.authService.isLoggedIn()) return;
        this.loadPracticeList();
      }
    })
    this.storeService.userInfoSubscription().subscribe(async (info: UserInfo) => {
      this.userInfo = info;
      if (!this.authService.isLoggedIn()) return;
      if(this.userInfo && this.userInfo.fullName) return;
      try {
        const info = await this._accountService.apiAccountUserInfoGet().toPromise();
        this.userInfo = info as UserInfo;
      } catch(error: any) {

      }
    })
  }
  private loadPracticeList() {
    this.practiceService.apiPracticeListGet().subscribe({
      next: (practiceList: any) => {
        this.practiceList = practiceList;
        if (!practiceList.length) {
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
      },
      error: (error) => {
        this.eventService.errorMessageUpdate({
          type: 'error',
          title: '',
          body: this.messages.errorPractice
        });
        this.route.navigate(['/error']);
      },
      
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
