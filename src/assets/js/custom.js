"use strict";

(function ($) {
  // PAGE LOADING
  $(window).on("load", function (e) {
    $("#global-loader").fadeOut("slow");
  });

  //COLOR THEME
  $(document).on("click", "a[data-theme]", function () {
    $("head link#theme").attr("href", $(this).data("theme"));
    $(this).toggleClass("active").siblings().removeClass("active");
  });

  // FAQ ACCORDION
  $(document).on("click", '[data-bs-toggle="collapse"]', function () {
    $(this).toggleClass("active").siblings().removeClass("active");
  });

  // FULL SCREEN
  $(document).on("click", ".full-screen-link", function toggleFullScreen() {
    $(".full-screen-link").addClass("fullscreen-button");
    if (
      (document.fullScreenElement !== undefined &&
        document.fullScreenElement === null) ||
      (document.msFullscreenElement !== undefined &&
        document.msFullscreenElement === null) ||
      (document.mozFullScreen !== undefined && !document.mozFullScreen) ||
      (document.webkitIsFullScreen !== undefined &&
        !document.webkitIsFullScreen)
    ) {
      if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      }
    } else {
      $("html").removeClass("fullscreen-button");
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  });

  //  ITEM NOTES
  $(".thumb").on("click", function () {
    if (!$(this).hasClass("active")) {
      $(".thumb.active").removeClass("active");
      $(this).addClass("active");
    }
  });

  // TOGGLE SWITCHES
  $(".toggle").on("click", function () {
    $(this).toggleClass("on");
  });

  // BACK TO TOP BUTTON
  $(window).on("scroll", function (e) {
    if ($(this).scrollTop() > 0) {
      $("#back-to-top").fadeIn("slow");
    } else {
      $("#back-to-top").fadeOut("slow");
    }
  });
  $(document).on("click", "#back-to-top", function (e) {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      0
    );
    return false;
  });

  // COVER IMAGE
  $(".cover-image").each(function () {
    var attr = $(this).attr("data-bs-image-src");
    if (typeof attr !== typeof undefined && attr !== false) {
      $(this).css("background", "url(" + attr + ") center center");
    }
  });

  // QUANTITY CART INCREASE AND DECREASE
  $(".add").on("click", function () {
    var $qty = $(this).closest("div").find(".qty");
    var currentVal = parseInt($qty.val());
    if (!isNaN(currentVal)) {
      $qty.val(currentVal + 1);
    }
  });
  $(".minus").on("click", function () {
    var $qty = $(this).closest("div").find(".qty");
    var currentVal = parseInt($qty.val());
    if (!isNaN(currentVal) && currentVal > 0) {
      $qty.val(currentVal - 1);
    }
  });

  // CHART CIRCLE
  if ($(".chart-circle").length) {
    $(".chart-circle").each(function () {
      let $this = $(this);
      $this.circleProgress({
        fill: {
          color: $this.attr("data-bs-color"),
        },
        size: $this.height(),
        startAngle: (-Math.PI / 4) * 2,
        emptyFill: "#edf0f5",
        lineCap: "round",
      });
    });
  }

  // MODAL
  // SHOWING MODAL WITH EFFECT
  $(".modal-effect").on("click", function (e) {
    e.preventDefault();
    var effect = $(this).attr("data-bs-effect");
    $("#modaldemo8").addClass(effect);
  });

  // HIDE MODAL WITH EFFECT
  $("#modaldemo8").on("hidden.bs.modal", function (e) {
    $(this).removeClass(function (index, className) {
      return (className.match(/(^|\s)effect-\S+/g) || []).join(" ");
    });
  });

  // CARD
  const DIV_CARD = "div.card";

  // TOOLTIP
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // POPOVER
  var popoverTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="popover"]')
  );
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });
  $(document).on("click", function (e) {
    $('[data-toggle="popover"],[data-original-title]').each(function () {
      //the 'is' for buttons that trigger popups
      //the 'has' for icons within a button that triggers a popup
      if (
        !$(this).is(e.target) &&
        $(this).has(e.target).length === 0 &&
        $(".popover").has(e.target).length === 0
      ) {
        (
          ($(this).popover("hide").data("bs.popover") || {}).inState || {}
        ).click = false; // fix for BS 3.3.6
      }
    });
  });

  // TOAST
  var toastElList = [].slice.call(document.querySelectorAll(".toast"));
  var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl);
  });
  $("#liveToastBtn").on("click", function () {
    $(".toast").toast("show");
  });

  // OFFCANVAS
  var offcanvasElementList = [].slice.call(
    document.querySelectorAll(".offcanvas")
  );
  var offcanvasList = offcanvasElementList.map(function (offcanvasEl) {
    return new bootstrap.Offcanvas(offcanvasEl);
  });

  // FUNCTION FOR REMOVE CARD
  $(document).on("click", '[data-bs-toggle="card-remove"]', function (e) {
    let $card = $(this).closest(DIV_CARD);
    $card.remove();
    e.preventDefault();
    return false;
  });

  // FUNCTIONS FOR COLLAPSED CARD
  $(document).on("click", '[data-bs-toggle="card-collapse"]', function (e) {
    let $card = $(this).closest(DIV_CARD);
    $card.toggleClass("card-collapsed");
    e.preventDefault();
    return false;
  });

  // CARD FULL SCREEN
  $(document).on("click", '[data-bs-toggle="card-fullscreen"]', function (e) {
    let $card = $(this).closest(DIV_CARD);
    $card.toggleClass("card-fullscreen").removeClass("card-collapsed");
    e.preventDefault();
    return false;
  });

  // INPUT FILE BROWSER
  $(document).on("change", ".file-browserinput", function () {
    var input = $(this),
      numFiles = input.get(0).files ? input.get(0).files.length : 1,
      label = input.val().replace(/\\/g, "/").replace(/.*\//, "");
    input.trigger("fileselect", [numFiles, label]);
  }); // We can watch for our custom `fileselect` event like this

  // FILE UPLOAD
  $(".file-browserinput").on("fileselect", function (event, numFiles, label) {
    var input = $(this).parents(".input-group").find(":text"),
      log = numFiles > 1 ? numFiles + " files selected" : label;
    if (input.length) {
      input.val(log);
    } else {
      if (log) alert(log);
    }
  });

  // SWITCHER-TOGGLE
  $(document).on("click", ".layout-setting", function () {
    if (document.querySelector("body").classList.contains("dark-mode")) {
      $("body").removeClass("dark-mode");
      $("body").removeClass("bg-img1");
      $("body").removeClass("bg-img2");
      $("body").removeClass("bg-img3");
      $("body").removeClass("bg-img4");
      $("body").addClass("light-mode");

      localStorage.setItem("lightMode", true);
      localStorage.removeItem("darkMode");
    } else {
      $("body").addClass("dark-mode");
      $("body").removeClass("light-mode");
      $("body").removeClass("bg-img1");
      $("body").removeClass("bg-img2");
      $("body").removeClass("bg-img3");
      $("body").removeClass("bg-img4");

      localStorage.setItem("darkMode", true);
      localStorage.removeItem("lightMode");
    }
  });

  // ----- RTL Style ------- //

  // $('body').addClass('rtl');

  let bodyRtl = $("body").hasClass("rtl");
  if (bodyRtl) {
    $("body").addClass("rtl");

    $("#slide-left").removeClass("d-none");
    $("#slide-right").removeClass("d-none");
    $("html[lang=en]").attr("dir", "rtl");
    $("body").removeClass("ltr");
    $("head link#style").attr("href", $(this));
    document
      .getElementById("style")
      .setAttribute(
        "href",
        "../assets/plugins/bootstrap/css/bootstrap.rtl.min.css"
      );
    var carousel = $(".owl-carousel");
    $.each(carousel, function (index, element) {
      // element == this
      var carouselData = $(element).data("owl.carousel");
      carouselData.settings.rtl = true; //don't know if both are necessary
      carouselData.options.rtl = true;
      $(element).trigger("refresh.owl.carousel");
    });

    if (
      !document.querySelector("body").classList.contains("login-img") &&
      !document.querySelector("body").classList.contains("error-bg")
    ) {
      checkHoriMenu();
    }
  }

  // ! ----- RTL Style ------- //

  // ACCORDION STYLE
  $(document).on("click", '[data-bs-toggle="collapse"]', function () {
    $(this).toggleClass("active").siblings().removeClass("active");
  });

  $(document).on("click", '[data-bs-toggle="sidebar"]', function () {
    $("body").toggleClass("sidenav-toggled");
  });

  // EMAIL INBOX
  $(".clickable-row").on("click", function () {
    window.location = $(this).data("href");
  });

  // FORGOT PASSWORD
  $(document).on("click", ".card-btn", function () {
    $(".card-btn").removeClass("is-active");
    $(this).addClass("is-active");
  });
})(jQuery);

// OFF-CANVAS STYLE
$(".off-canvas").on("click", function () {
  $("body").addClass("overflow-y-scroll");
  $("body").addClass("pe-0");
});
