import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  notifications: any = [
    {
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
    }
  ]
}
