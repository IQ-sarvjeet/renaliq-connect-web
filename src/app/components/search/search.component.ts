import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, fromEvent, tap } from 'rxjs';
import { PatientService } from 'src/app/api-client';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;
  patientSearchedList: any = [];
  patientNotFound: boolean = false;
  constructor(private route: Router, private _patientService: PatientService) {

  }
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
  filterPatients(text: string) {
    this.patientNotFound = false;
    this._patientService.apiPatientSearchSearchStringGet(text).subscribe((response: any) => {
      this.patientSearchedList = response;
      if (response.length === 0) {
        this.patientNotFound = true;
      }
    })
  }
  patientSelectHandler(patient: any) {
    this.patientNotFound = false;
    this.searchInput.nativeElement.value = '';
    this.patientSearchedList = [];
    this.route.navigate(['/patient-profile']);
  }
}
