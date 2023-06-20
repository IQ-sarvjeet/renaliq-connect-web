import { Component } from '@angular/core';
import { ClinicalQualityMatrixService } from 'src/app/api-client';
import { EventService } from 'src/app/services/event.service';
import { ReportEventService } from '../../services/report-event.service';
declare var $: any;

@Component({
  selector: 'app-measure-definitions',
  templateUrl: './measure-definitions.component.html',
  styleUrls: ['./measure-definitions.component.scss']
})
export class MeasureDefinitionsComponent {
  metricDefinition: any;

  constructor(private eventService: EventService,
    private reportService: ReportEventService,
    private _qualityService: ClinicalQualityMatrixService) { }

  ngOnInit() {
    this.eventService.openModalSubscription().subscribe(([openModal, isGlobal]: [boolean, boolean]) => {
      if(openModal) {
        $('#modalMeasureDefinitions').modal('show');
      }
    });

    this.reportService.metricIdSubscription().subscribe((metricID: number) => {
      if(metricID) {
        this._qualityService.apiClinicalQualityMatrixMetricDetailsIdGet(metricID).subscribe({
          next: (response: any) => {
            this.metricDefinition = response;
          },
          error: (error: any) => {
          }
        });
      }
    })
  }
  ngOnDestroy(): void {
    this.eventService.closeModalEvent();
  }
}
