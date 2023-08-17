import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent {
  @ViewChild('searchInput', {static: true}) searchInput!: ElementRef;
  fieldLable: string = '';
  filteredData?: Observable<any>;
  selectedItem: any = '';
  displayList: boolean = false;
  placeholder: string = '';
  classParentElement: string = 'form-floating';
  @Input() set dataList(value: any) {
    if (value) {
      this.optionList = value.data;
      this.fieldLable = value.label;
      this.selectedItem = value.defaultSelected;
      this.placeholder = value.placeholder ? value.placeholder: '';
      this.classParentElement = value.classParentElement ? value.classParentElement: 'form-floating';
    }
  }
  @Output() itemSelected = new EventEmitter<string>();

  optionList: string[] = [];
  ngAfterViewInit() {
    this.filteredData = fromEvent(this.searchInput.nativeElement,'keyup')
        .pipe(
            distinctUntilChanged<any>(),
            debounceTime(500),
            filter(Boolean),
            map((event:KeyboardEvent) => {
              console.log(event);
              console.log(this.searchInput.nativeElement.value);
              if (this.optionList.length) {
                return this.optionList.filter((item: any) => {
                  return item?.toLowerCase().includes(this.searchInput.nativeElement.value.toLowerCase())
                } )
              }
              return [];
            }),
            tap((response: any) => {
            })
        )

    this.searchInput.nativeElement.addEventListener('focusout', ($event: any) => {
      this.selectedItem = this.searchInput.nativeElement.value;
      this.itemSelected.next(this.selectedItem);
      this.displayList = false;
    });
    this.searchInput.nativeElement.addEventListener('keyup', ($event: any) => {
      if($event.keyCode === 13) {
        this.selectedItem = this.searchInput.nativeElement.value;
        this.itemSelected.next(this.selectedItem);
      }
    });
    this.searchInput.nativeElement.addEventListener('focus', ($event: any) => {
      this.displayList = true;
    });
  }
  selectListItem(value: any) {
    this.selectedItem = this.optionList.find((item: any) => {
      return item?.toLowerCase() === value.toLowerCase();
    })
    this.itemSelected.next(this.selectedItem);
  }
}
