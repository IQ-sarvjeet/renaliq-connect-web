import { Component, ElementRef, Renderer2 } from '@angular/core';
import * as moment from 'moment';
import { NotificationService } from 'src/app/api-client';
import { AuthService } from 'src/app/services/auth.service';
import { DownloadService } from 'src/app/services/download.service';
import { EventService } from 'src/app/services/event.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  moment: any = moment;
  private notificationFromDate: Date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  private pullMessageIntervalRef: any;
  notifications: any = [];
  constructor(private notificationService: NotificationService,
    private eventService: EventService,
    private authService: AuthService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private downloadService: DownloadService) {

  }
  ngOnInit() {
    this.eventService.userLoggedInSubscription().subscribe({
      next: (response: boolean) => {
        if (!this.authService.isLoggedIn()) return;
        this.getNotifications();
        this.pullNotificationTimer();
        this.notificationFromDate = new Date();
      }
    })
    this.eventService.notificationEventSubscription().subscribe({
      next: (response: boolean) => {
        if (response) {
          this.getNotifications();
        }
      }
    })
  }
  private getNotifications() {
    this.notificationService.apiNotificationListPost({messageFromDate: this.notificationFromDate}).subscribe({
      next: (messages: any) => {
        const remainsMsg: any = [];
        messages.forEach((item: any) => {
          let found = false;
          for(let i = 0; i < this.notifications.length; i++) {
            if (item.id === this.notifications[i].id) {
              this.notifications[i] = item;
              found = true;
            }
          }
          if(!found) {
            remainsMsg.push(item);
          }
        })
        this.notifications = [...remainsMsg, ...this.notifications]
      },
      error: (error) => {
      }
    })
  }
  private pullNotificationTimer() {
    this.pullMessageIntervalRef = setInterval(() => {
      if (!this.authService.isLoggedIn()) {
        clearInterval(this.pullMessageIntervalRef);
        return;
      }  
      this.getNotifications();
      this.notificationFromDate = new Date();
    }, 60000);
  }
  clearNotifications() {
    this.notifications = [];
  }
  openNotificationsDialog(){
    this.updateReadStatus(0);
  }
  updateReadStatus(index: number) {
    if(index >= this.notifications.length) return;
    if (this.notifications[index].readOn) {
      this.updateReadStatus(index + 1);
      return;
    }
    this.notificationService.apiNotificationUpdateReadstatusNotificationIdGet(this.notifications[index].id).subscribe({
      next: (res: any) => {
        if (res.isCompleted) {
          this.notifications[index].readOn = true;
        }
        this.updateReadStatus(index + 1)
      },
      error: () => {

      }
    })
  }
  unreadCounts() {
    const counts = this.notifications.filter((item: any) => !item.readOn);
    return counts.length > 0;
  }
  downloadFile(notification: any) {
    const url: string = `${environment.baseApiUrl}/api/Export/download/file/${notification.referenceId}`;
    this.downloadService.startDownloadingXSLX(this.elementRef, this.renderer, url, notification.status.reportName);
  }
  ngOnDestroy(){
    if(this.pullMessageIntervalRef) {
      clearInterval(this.pullMessageIntervalRef);
    }
  }
}
