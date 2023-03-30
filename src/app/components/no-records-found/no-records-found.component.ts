import { Component } from '@angular/core';

@Component({
  selector: 'app-no-records-found',
  templateUrl: './no-records-found.component.html',
  styleUrls: ['./no-records-found.component.scss']
})
export class NoRecordsFoundComponent {
  reloadPage() {
    window.location.reload();
  }
}
