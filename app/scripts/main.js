$(document).ready(function() {
  'use strict';

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
  //navigationTooltips: ['The Graduate Center, CUNY','The Graduate Center, CUNY','The Graduate Center, CUNY', 'Research', 'Research', 'Research', 'Teaching', 'Teaching', 'Teaching', 'People', 'People', 'People'],
  normalScrollElements: '.map-frame, .vignettes, .modal-content, .modal-footer, .col, .row, .card',
  normalScrollElementTouchThreshold: 8,
  paddingTop: '3em',
  paddingBottom: '10px',
  recordHistory: false,
  resize : false,
  responsive: 0,
  scrollBar: true,
  scrollOverflow: false,
  scrollingSpeed: 750,
  sectionSelector: '.section',
  slidesNavigation: false,
  slideSelector: '.slide',
  touchSensitivity: 5,
  verticalCentered: true,

  afterLoad: function(anchorLink, index){

    var section = Math.ceil(index/3),
        selector = '[data-menusection="' + section + '"]',
        selectorNot = '[data-menusection][data-menusection!="' + section + '"]';
    $(selectorNot).removeClass('active');
    $(selector).addClass('active');

  },

  onLeave: function() {
    if (modalTarget && isModalOpen) {
      $(modalTarget).closeModal();
      isModalOpen = !isModalOpen;
    }
  }

});

/* menu and map handling */

var isModalOpen = false,
isOpen = false,
modalTarget;

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
    dismissible: true
  };
  modalTarget = $(this).attr('href') || '.' + $(this).data('target');
  if ($.hasData(this) && $(this).data('map')){
    var mapSrc = $(this).data('map');
    $('.map-frame').attr('src',mapSrc);
    $('.modal-interact').attr('href',mapSrc);
  } else {
    options.dismissible = false;
  }
  $(modalTarget).openModal(options);
  isModalOpen = !isModalOpen;
  $.fn.fullpage.setAllowScrolling(false);
  event.preventDefault();
});

$(document).keydown(function( event ) {
  if ( isOpen && event.which === 27) {
    $('.button-collapse').sideNav('hide');
    isOpen = !isOpen;
  } else if ( isModalOpen ) {
    $(modalTarget).closeModal();
    isModalOpen = !isModalOpen;
    $.fn.fullpage.setAllowScrolling(true);
  }
});

});
