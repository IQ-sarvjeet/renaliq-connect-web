import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GoogleAnalyticsService } from './services/google-analytics.service';
declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'new-angular-app';
  constructor(private router: Router, private gaService: GoogleAnalyticsService) {
    this.router.events.subscribe(event => {
      try {
        if (event instanceof NavigationEnd) {
          const routeNameArr = event.urlAfterRedirects.split('/');
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
    this.gaService.init();
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
