import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-toster',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
})
export class ToastsComponent {

  @Input() showToster: boolean = false;
  @Input() errorMessage: any = '';
  @Output() showResult = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  };

  ngOnChanges() {
    let show = this.showToster;
  }

  hideToster() {
    this.showToster = false;
    this.showResult.emit(this.showToster);
  }
  ngOnDestroy(): void {

  }
}
