import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, fromEvent, tap } from 'rxjs';
// import { PatientService } from 'src/app/api-client';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;
  patientList: any = [
    { 
      id: 154, 
      name: "John Doe",
      enrollmentNo: "ENROLL-001"
    },
    { 
      id: 154, 
      name: "Ricky",
      enrollmentNo: "ENROLL-002"
    },
    { 
      id: 154, 
      name: "Sachin Doe",
      enrollmentNo: "ENROLL-003"
    }
  ]
  patientSearchedList: any = [];
  constructor(private route: Router) {

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
    // this._patientService.apiPatientSearchSearchStringGet(text).subscribe((response: any) => {
    //   console.log('Patient search response:', response);
    // })
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
