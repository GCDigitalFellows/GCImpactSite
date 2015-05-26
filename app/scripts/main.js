$(document).ready(function() {
  'use strict';

var isModalOpen = false,
isOpen = false,
modalTarget;

// fullpage.js initialization
$('#fullpage').fullpage({
  animateAnchor: true,
  autoScrolling: true,
  anchors:['section1', 'section2', 'section3', 'section4', 'section5', 'section6', 'section7', 'section8', 'section9', 'section10', 'section11', 'section12'],
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
    $('.loading').removeClass('loading');

    var section = Math.ceil(index/3),
        selector = '[data-menusection="' + section + '"]',
        selectorNot = '[data-menusection][data-menusection!="' + section + '"]';
    $(selectorNot).removeClass('active');
    $(selector).addClass('active');

  },

  onLeave: function() {
    if (modalTarget && isModalOpen) {
      $.fn.fullpage.setAllowScrolling(true);
      $(modalTarget).closeModal();
      isModalOpen = !isModalOpen;
    }
  }

});

/* menu and map handling */

$('.button-collapse').sideNav({
    menuWidth: 300, // Default is 240
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
    // navOpened: function(){
    //   $('.hamburger-button').addClass('active');
    //   isOpen = true;
    // },
    // navClosed: function(){
    //   $('.hamburger-button').removeClass('active');
    //   isOpen = false;
    // }
  });

$('.hamburger-button').click(function() {
  $('.hamburger-button').toggleClass('active');
});

$('.modal-trigger').click( function(event) {
  var options = {
    dismissible: true,
    complete: function() {
      $.fn.fullpage.setAllowScrolling(true);
    }
  };
  modalTarget = $(this).data('modal');
  if ($.hasData(this) && $(this).data('map')){
    var mapSrc = $(this).data('map');
    $('.map-frame').attr('src',mapSrc);
    $('.modal-interact').attr('href',mapSrc);
  } else {
    options.dismissible = false;
  }
  $.fn.fullpage.setAllowScrolling(false);
  $(modalTarget).openModal(options);
  isModalOpen = !isModalOpen;
  event.preventDefault();
});

$(document).keydown(function( event ) {
  if ( isOpen && event.which === 27) {
    $('.button-collapse').sideNav('hide');
    isOpen = !isOpen;
  } else if ( isModalOpen ) {
    $.fn.fullpage.setAllowScrolling(true);
    $(modalTarget).closeModal();
    isModalOpen = !isModalOpen;
  }
});

});
