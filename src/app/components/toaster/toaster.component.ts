import { Component } from '@angular/core';
import { Toaster } from 'src/app/interfaces/toaster';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent {
  toasterData: Toaster = {
    showToster: false,
    message: '',
    type: '',
  }
  constructor(private eventService: EventService) {}
  ngOnInit() {
    this.eventService.toasterSubscription().subscribe((data: Toaster) => {
      this.toasterData = data;
      setTimeout(() => {
        this.hideToster();
      }, 5000)
    })
  }
  hideToster() {
    this.toasterData.showToster = false;
  }
}
