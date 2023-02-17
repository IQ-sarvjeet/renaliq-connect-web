import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admission-header',
  templateUrl: './admission-header.component.html',
  styleUrls: ['./admission-header.component.scss']
})
export class AdmissionHeaderComponent {
  @Input() admissionHeaders: any = {}
}
