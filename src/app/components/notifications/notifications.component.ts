import { Component } from '@angular/core';
import { NotificationService } from 'src/app/api-client';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
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
      }
    })
  }
  private getNotifications() {
    this.notificationService.apiNotificationListPost(new Date()).subscribe({
      next: (messages: any) => {
        console.log('Notifications::::::', messages);
        this.notifications.push(...messages);
      },
      error: (error) => {

      }
    })
  }
  private pullNotificationTimer() {
    this.pullMessageIntervalRef = setInterval(() => {
      this.notificationFromDate = new Date();
      this.getNotifications();
    }, 60000);
  }
  ngOnDestroy(){
    if(this.pullMessageIntervalRef) {
      clearInterval(this.pullMessageIntervalRef);
    }
  }
}
