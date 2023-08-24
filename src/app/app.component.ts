import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CommonConstants } from './shared/common-constants/common-constants';
import { environment } from 'src/environments/environment';
declare const $: any;
(<any>window).dataLayer = (<any>window).dataLayer || [];
// (<any>window).gtag = function() { (<any>window).dataLayer.push(arguments); }
// declare const dataLayer: any;
declare const gtag: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'new-angular-app';
  gtagId! : string;
  constructor(private router: Router) {
    const myScriptElement = document.createElement("script");
    myScriptElement.src = `https://www.googletagmanager.com/gtag/js?id=${environment.gTag_Id}`;
    document.body.appendChild(myScriptElement);
    this.router.events.subscribe(event => {
      try {
        if (event instanceof NavigationEnd) {
          // (<any>window).gtag('set', 'page', event.urlAfterRedirects);
          // (<any>window).gtag('send', 'pageview');
          const routeNameArr = event.urlAfterRedirects.split('/');
          // gtag('event', 'page_view', {
          //   'page_location': document.location.origin + event.urlAfterRedirects,
          //   'page_title': routeNameArr[routeNameArr.length -1]
          // });
          (<any>window).dataLayer.push({
            event: 'virtualPageview',
            virtualPageURL: document.location.origin + event.urlAfterRedirects,
            virtualPageTitle: routeNameArr[routeNameArr.length -1],
          });
        }
      } catch(error) {
        console.log('error:', error);
      }
    });
  }
  ngOnInit(): void {
    this.gtagId = environment.gTag_Id;
    
    gtag('js', new Date());
    gtag('config', environment.gTag_Id);

    // ----- Horizontal Style ------- //
    $('body').addClass('horizontal');
    let bodyhorizontal = $('body').hasClass('horizontal');
    if (bodyhorizontal) {
      $('body').addClass('horizontal');
      $('.main-content').addClass('hor-content');
      $('.main-content').removeClass('app-content');
      $('.main-container').addClass('container');
      $('.main-container').removeClass('container-fluid');
      $('.app-header').addClass('hor-header');
      $('.hor-header').removeClass('app-header');
      $('.app-sidebar').addClass('horizontal-main');
      $('.main-sidemenu').addClass('container');
      $('body').removeClass('sidebar-mini');
      $('body').removeClass('sidenav-toggled');
      $('body').removeClass('horizontal-hover');
      $('body').removeClass('default-menu');
      $('body').removeClass('icontext-menu');
      $('body').removeClass('icon-overlay');
      $('body').removeClass('closed-leftmenu');
      $('body').removeClass('hover-submenu');
      $('body').removeClass('hover-submenu1');
      localStorage.setItem('horizantal', 'True');
      // To enable no-wrap horizontal style
      $('#slide-left').removeClass('d-none');
      $('#slide-right').removeClass('d-none');
      // To enable wrap horizontal style
      // $('#slide-left').addClass('d-none');
      // $('#slide-right').addClass('d-none');
      // document.querySelector('.horizontal .side-menu').style.flexWrap = 'wrap'
      if (window.innerWidth >= 992) {
        let li = document.querySelectorAll('.side-menu li');
        li.forEach((e, i) => {
          e.classList.remove('is-expanded');
        });
        var animationSpeed = 300;
        // first level
        var parent = $("[data-bs-toggle='sub-slide']").parents('ul');
        var ul = parent.find('ul:visible').slideUp(animationSpeed);
        ul.removeClass('open');
        var parent1 = $("[data-bs-toggle='sub-slide2']").parents('ul');
        var ul1 = parent1.find('ul:visible').slideUp(animationSpeed);
        ul1.removeClass('open');
      }
    }
    // ----- Horizontal Style ------- //

    //______Select2
    $('.select2').select2({
      minimumResultsForSearch: Infinity,
    });
  }
}
