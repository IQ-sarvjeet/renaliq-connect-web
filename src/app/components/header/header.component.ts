import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
import { AccountService, PracticeService } from '../../api-client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  selectedPractice: any = {
    name: 'Lynchburg Nephrology',
    practiceId: 'NPI: 3453583',
  }
  practiceList: any = [
    {
      name: 'Lynchburg Nephrology',
      practiceId: 'NPI: 3453583',
    },
    {
      name: 'Fort Worth Renal Group',
      practiceId: 'NPI: 3453583',
    },
    {
      name: 'Cleveland Kidney & Hypertension Consultants Inc',
      practiceId: 'NPI: 3453583',
    }
  ]
  constructor(
    private _accountService: AccountService,
    private _localStorage: LocalStorageService,
    private practiceService: PracticeService,
    private route: Router
  ) {}
  ngOnInit() {
    // this.practiceService.apiPracticeListGet().subscribe((practiceList: any) => {
    //   console.log('practiceList:', practiceList);
    // })
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
  selectPracticeHandlar(practice: any) {
    this.selectedPractice = practice;
  }
}
