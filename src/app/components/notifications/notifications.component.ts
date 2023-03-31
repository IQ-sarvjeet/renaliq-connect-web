import { Component } from '@angular/core';
import * as moment from 'moment';
import { NotificationService } from 'src/app/api-client';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  moment: any = moment;
  private notificationFromDate: Date = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  private pullMessageIntervalRef: any;
  notifications: any = [
    /*{
      type: 'email',
      message: ' New Message Received',
      notificationTime: '2 hours ago'
    },
    {
      type: 'info',
      message: ' New Message Received',
      notificationTime: '2 hours ago'
    },
    {
      type: 'success',
      message: ' New Message Received',
      notificationTime: '2 hours ago'
    },
    {
      type: 'alert',
      message: ' New Message Received',
      notificationTime: '2 hours ago'
    }*/
  ]
  constructor(private notificationService: NotificationService,
    private eventService: EventService,
    private authService: AuthService) {

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
  }
  private getNotifications() {
    this.notificationService.apiNotificationListPost({messageFromDate: this.notificationFromDate}).subscribe({
      next: (messages: any) => {
        this.notifications.push(...messages);
      },
      error: (error) => {
      }
    })
  }
  private pullNotificationTimer() {
    this.pullMessageIntervalRef = setInterval(() => {      
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
  ngOnDestroy(){
    if(this.pullMessageIntervalRef) {
      clearInterval(this.pullMessageIntervalRef);
    }
  }
}
