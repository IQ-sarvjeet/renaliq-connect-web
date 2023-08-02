import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
import { AccountService, PracticeService, UserRoleService, UserService } from '../../api-client';
import { EventService } from 'src/app/services/event.service';
import { Messages } from 'src/app/shared/common-constants/messages';
import { AuthService } from 'src/app/services/auth.service';
import { UserInfo } from 'src/app/interfaces/user';
import { StoreService } from 'src/app/services/store.service';
import { filter } from 'rxjs/operators';
import { Roles } from 'src/app/enums/roles';
import { FormBuilder, FormGroup } from '@angular/forms';


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
  userRoleTypes = Roles;
  messages: any = Messages;
  selectedPractice: Practice = {} as Practice;
  OTPSettingForm: FormGroup = this.fb.group({
    viaEmail: [true],
    viaText: [true]
  });
  showLoading: boolean = false;
  practiceList: Practice[] = [];
  userInfo: UserInfo = {
    fullName: '',
    roleName: '',
    role: Roles.PRACTICE_USER
  };
  currentRoute: string = '/';
  rolesLoaded: boolean = false;
  constructor(
    private _accountService: AccountService,
    private practiceService: PracticeService,
    private route: Router,
    private eventService: EventService,
    private fb: FormBuilder,
    private authService: AuthService,
    private storeService: StoreService,
    private userRolesService: UserRoleService
  ) {
    route.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentRoute = event.url;
    });
  }
  async ngOnInit() {
    this.eventService.userLoggedInSubscription().subscribe({
      next: (response: boolean) => {
        if (!this.authService.isLoggedIn()) return;
        this.loadPracticeList();
        this.loadUserRoles();
      }
    })
    this.storeService.userInfoSubscription().subscribe(async (info: UserInfo) => {
      this.userInfo = info;
      if (!this.authService.isLoggedIn()) return;
      if(!this.rolesLoaded) {
        this.loadUserRoles();
      }
      if(this.userInfo && this.userInfo.fullName) {
        return;
      }
      try {
        const info = await this._accountService.apiAccountUserInfoGet().toPromise();
        this.storeService.userInfo({
          ...this.userInfo,
          ...info as UserInfo
        });
        if(!this.rolesLoaded) {
          this.loadUserRoles();
        }
      } catch(error: any) {
        console.error(error);
      }
    })
  }
  private loadUserRoles() {
    if (!this.userInfo.userLoginId || !this.userInfo.userLoginId) return;
    const id = this.userInfo.userLoginId;
    this.userRolesService.apiUserRolesUserLoginIdGet(id).subscribe({
      next: (response: any) => {
        this.rolesLoaded = true;
        this.storeService.userInfo({
          ...this.userInfo,
          role: response[0].roleId
        });
      },
      error: (error: any) => {
        console.error(error);
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
  public logOut() {
   this.authService.logOut(); 
  }
  selectPracticeHandlar(practice: Practice) {
    this.selectedPractice = practice;
    this.practiceService.apiPracticeUpdatePracticeIdPost(this.selectedPractice.practiceId)
    .subscribe((response: any) => {
    if (window.location.href.includes('patient-profile')) {
      this.route.navigate(['/patients']);
      this.loadPracticeList();
    } else{
      window.location.reload();
    }
    });
  }
  setNotifications(event: any, type: string){
    if(!this.OTPSettingForm.value.viaEmail && !this.OTPSettingForm.value.viaText) {
      this.showLoading = true;
      setTimeout(() => {
        this.OTPSettingForm.patchValue({
          viaEmail: true,
          viaText: true
        });
        this.showLoading = false;
        this.eventService.openToaster({
          showToster: true,
          message: `You cannot turn off both notifications.`,
          type: 'danger',
        });
      }, 1500);      
    }
  }
}
