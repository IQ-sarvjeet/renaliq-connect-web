import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, filter, fromEvent, tap } from 'rxjs';
import { PatientService } from 'src/app/api-client';
import { Messages } from 'src/app/shared/common-constants/messages';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  message: any = Messages;
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('patientSearchList') patientSearchList!: ElementRef;
  visibleDropdown: boolean = false;

  patientSearchedList: any = [];
  patientNotFound: boolean = false;
  constructor(private route: Router,
    private _patientService: PatientService,
    private renderer: Renderer2) {

  }
  ngOnInit() {}
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
    this.renderer.listen('window', 'click',(e: Event)=>{
      if(!this.patientSearchList || e.target !== this.patientSearchList.nativeElement) {
        this.visibleDropdown = false;
      }
    });
  }
  filterPatients(text: string) {
    this.patientNotFound = false;
    this.visibleDropdown = true;
    this._patientService.apiPatientSearchSearchStringGet(text).subscribe((response: any) => {
      this.patientSearchedList = response;
      if (response.length === 0) {
        this.patientNotFound = true;
      }
    })
  }
  patientSelectHandler(patient: any) {
    console.log('patient:', patient);
    this.patientNotFound = false;
    this.searchInput.nativeElement.value = '';
    this.patientSearchedList = [];
    this.route.navigateByUrl(`/patient-profile/${patient.id}`, {state: {
      patientId: patient.patientId,
      enrollmentNo: patient.enrollmentNo
    }})
  }
}
