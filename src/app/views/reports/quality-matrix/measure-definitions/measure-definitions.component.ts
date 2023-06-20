import { Component } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { ReportEventService } from '../../services/report-event.service';
declare var $: any;

@Component({
  selector: 'app-measure-definitions',
  templateUrl: './measure-definitions.component.html',
  styleUrls: ['./measure-definitions.component.scss']
})
export class MeasureDefinitionsComponent {
  constructor(private eventService: EventService,
    private reportService: ReportEventService) { }

  ngOnInit() {
    this.eventService.openModalSubscription().subscribe(([openModal, isGlobal]: [boolean, boolean]) => {
      if(openModal) {
        $('#modalMeasureDefinitions').modal('show');
      }
    });

    this.reportService.metricIdSubscription().subscribe((metricID: number) => {
      if(metricID) {
      }
    })
  }
  ngOnDestroy(): void {
    this.eventService.closeModalEvent();
  }
}
