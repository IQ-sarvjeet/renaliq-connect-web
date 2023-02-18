import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClinicalQualityMatrixService } from '../../../api-client';

@Component({
  selector: 'app-quality-matrix',
  templateUrl: './quality-matrix.component.html',
  styleUrls: ['./quality-matrix.component.scss']
})
export class QualityMatrixComponent {

  qualityMatircList: any = [];

  constructor(private _qualityService: ClinicalQualityMatrixService,
    private route: Router,) { }

  ngOnInit() {
    this.getQualityMatricList();
  }


  getQualityMatricList() {

    this._qualityService.apiClinicalQualityMatrixGetGet().subscribe((result: any) => {
      this.qualityMatircList = result.clinicalQualityMatrics;
      console.log(result);
    },
      (error) => {

      });
  }

}
