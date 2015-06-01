$(document).ready(function() {
  'use strict';

  var isLoaded = false,
  isModalOpen = false,
  isOpen = false,
  modalTarget;

  // fullpage.js initialization
  $('#fullpage').fullpage({
    animateAnchor: true,
    autoScrolling: true,
    anchors:['section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'section7', 'section8', 'section9', 'section10', 'section11', 'section12', 'section13'],
    continuousVertical: false,
    css3: true,
    easing: 'easeInOutQuart',//'cubic-bezier(.4, 0, .2, 1)',//'cubic-bezier(0.190, 1.000, 0.220, 1.000)'
    easingCSS3: 'cubic-bezier(.4, 0, .2, 1)', //'cubic-bezier(0.190, 1.000, 0.220, 1.000)',//'easeInOutQuart',
    keyboardScrolling: true,
    loopBottom: false,
    loopTop: false,
    loopHorizontal: false,
    //menu: '.slide-out, .nav-fixed',
    navigation: true,
    navigationPosition: 'right',
    //normalScrollElements: '.map-frame, .vignettes, .modal-content, .modal-footer, .col, .row, .card',
    //normalScrollElementTouchThreshold: 8,
    paddingTop: '0',
    paddingBottom: '0',
    recordHistory: false,
    resize : false,
    responsive: 0,
    scrollBar: false,
    scrollOverflow: false,
    scrollingSpeed: 750,
    sectionSelector: '.section',
    slidesNavigation: false,
    slideSelector: '.slide',
    touchSensitivity: 5,
    verticalCentered: true,

    afterLoad: function(anchorLink, index){
      // display the site by removing the hiding class
      if (!isLoaded) {
        $('.loading').removeClass('loading');
        isLoaded = true;
      }

      var section = Math.ceil(index/3),
          selector = '[data-menusection="' + section + '"]',
          selectorNot = '[data-menusection][data-menusection!="' + section + '"]';
      $(selectorNot).removeClass('active');
      $(selector).addClass('active');

      if (index === 13) {
        $('.card-more').css('opacity', 1);
      }

    },

    onLeave: function(index) {
      if (modalTarget && isModalOpen) {
        $('#' + modalTarget).closeModal();
      }
      if (index === 13) {
        $('.card-more').css('opacity', 0);
      }
    }

  });

  /* menu and map handling */

  $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      navOpened: function(){
        $('.hamburger-button').addClass('active');
        isOpen = true;
      },
      navClosed: function(){
        $('.hamburger-button').removeClass('active');
        isOpen = false;
      }
    });

  // $('.hamburger-button').click(function() {
  //   $('.hamburger-button').toggleClass('active');
  // });

  // Materialize Modal options
  var options = {
      dismissible: true,
      complete: function() {
        $.fn.fullpage.setAllowScrolling(true);
        isModalOpen = false;
      },
      ready: function() {
        $.fn.fullpage.setAllowScrolling(false);
        isModalOpen = true;
        $('.tooltipped').trigger('mouseleave'); // remove any tooltips that were opened on mobile
      }
  };

  $('.modal-trigger').leanModal(options);

  $('.modal-trigger').click( function() {
    modalTarget = $(this).data('target');
    if (!isModalOpen && $.hasData(this) && $(this).data('map')) {
      var mapSrc = $(this).data('map'),
          iframeSelector = '#' + modalTarget + ' .map-frame',
          preloadSelector = '#' + modalTarget + ' .preloader-wrapper',
          iframeTimeout;
      $(preloadSelector).addClass('active');
      $(iframeSelector).addClass('hidden');
      iframeTimeout = setTimeout(function() {
        $(preloadSelector).removeClass('active');
        $('#' + modalTarget + ' .modal-content').html('<p>There was an error loading the map</p>');
      }, 5000);
      $(iframeSelector).attr('src', mapSrc + '/embed_map');
      $(iframeSelector).load(function() {
        $(preloadSelector).removeClass('active');
        $(iframeSelector).removeClass('hidden');
        $('.modal-interact').attr('href', mapSrc + '/public_map');
        clearTimeout(iframeTimeout);
      });
    }
  });

  $(document).keydown(function( event ) {
    if ( isOpen && event.which === 27) {
      $('.button-collapse').sideNav('hide');
      isOpen = !isOpen;
    } else if ( isModalOpen ) {
      $('#' + modalTarget).closeModal();
    }
  });

});
