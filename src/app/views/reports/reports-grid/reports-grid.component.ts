import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports-grid',
  templateUrl: './reports-grid.component.html',
  styleUrls: ['./reports-grid.component.scss']
})
export class ReportsGridComponent implements OnInit  {
  @Input() list :any;
  ngOnInit(): void {

  }
}
