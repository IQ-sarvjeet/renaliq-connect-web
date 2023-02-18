import { Component, Input } from '@angular/core';
import { AdmissionHeaders } from '../interfaces/admission';

@Component({
  selector: 'app-admission-header',
  templateUrl: './admission-header.component.html',
  styleUrls: ['./admission-header.component.scss']
})
export class AdmissionHeaderComponent {
  @Input() admissionHeaders: AdmissionHeaders = {} as AdmissionHeaders;
}
