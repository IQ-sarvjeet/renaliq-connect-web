import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
import { AccountService, PracticeService } from '../../api-client';

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
  selectedPractice: Practice = {} as Practice;
  practiceList: Practice[] = [];
  // practiceList: Practice = [
  //   {
  //     name: 'Lynchburg Nephrology',
  //     practiceId: 'NPI: 3453583',
  //   },
  //   {
  //     name: 'Fort Worth Renal Group',
  //     practiceId: 'NPI: 3453583',
  //   },
  //   {
  //     name: 'Cleveland Kidney & Hypertension Consultants Inc',
  //     practiceId: 'NPI: 3453583',
  //   }
  // ]
  constructor(
    private _accountService: AccountService,
    private _localStorage: LocalStorageService,
    private practiceService: PracticeService,
    private route: Router
  ) {}
  ngOnInit() {
    this.practiceService.apiPracticeListGet().subscribe((practiceList: any) => {
      this.practiceList = practiceList;
      const selectedItem = practiceList.filter((item: Practice) => item.isSelected);
      if (selectedItem.length > 0) {
        this.selectedPractice = selectedItem[0];
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
