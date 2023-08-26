import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

declare var gtag: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  constructor(private _router: Router) {
    this._router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        gtag('js', new Date());
        gtag('config', environment.gTag_Id);
      }
    });
  }

  init(){
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${environment.gTag_Id}`;
    script.async = true;
    document.getElementsByTagName('head')[0].appendChild(script);
    const gtagEl = document.createElement('script');
    const gtagBody = document.createTextNode(`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
    `);
    gtagEl.appendChild(gtagBody);
    document.body.appendChild(gtagEl);
  }
}
