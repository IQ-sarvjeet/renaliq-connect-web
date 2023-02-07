import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, fromEvent, tap } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';
import { AccountService } from '../../api-client';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;
  patientList: any = [
    {
      name: "Ricky",
      patientId: 485859
    },
    {
      name: "Sachin",
      patientId: 848544
    },
    {
      name: "Mark",
      patientId: 4858737
    }
  ]
  patientSearchedList: any = [];
  constructor(
    private _accountService: AccountService,
    private _localStorage: LocalStorageService,
    private route: Router
  ) {}
  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement,'keyup')
      .pipe(
          filter( (searchText: any) => {
            if (searchText.target.value && searchText.target.value.length > 2) return searchText;
          }),
          debounceTime(500),
          distinctUntilChanged(),
          tap((text) => {})
      )
      .subscribe((searchText: any) => {
        const text = searchText.target.value;
        this.filterPatients(text);
      });
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
  filterPatients(text: string) {
    this.patientSearchedList = this.patientList.filter((item: any) => { 
      return String(item.name).toLocaleLowerCase().indexOf(String(text).toLocaleLowerCase()) !== -1
    });
  }
  patientSelectHandler(patient: any) {
    this.searchInput.nativeElement.value = '';
    this.patientSearchedList = [];
    this.route.navigate(['/patient']);
  }
}
