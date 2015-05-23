/* global skrollr:false */

$(document).ready(function() {
  'use strict';
  $('.scrollspy').scrollSpy();
  var s = skrollr.init({
    easing: 'sqrt',
    scale: 1
  });

  skrollr.menu.init(s, {
    animate: true,
    easing: 'sqrt',
    scale: 1,
    duration: 500,
    complexLinks: false,
    updateUrl: false
  });

  /* menu and map handling */

  var isModalOpen = false,
  isOpen = false,
  modalTarget;

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

  // $('.button-collapse').click(function() {
  //   isOpen = !isOpen;
  //   $(this).blur();
  // });

  $('.modal-trigger').click( function(event) {
    var options = {
      dismissible: true
    };
    modalTarget = $(this).attr('href') || '.' + $(this).data('target');
    if ($.hasData(this) && $(this).data('map')){ // get the url for the map to load if it exists
      var mapSrc = $(this).data('map');
      $('.map-frame').attr('src',mapSrc);
      $('.modal-interact').attr('href',mapSrc);
    } else {
      options.dismissible = false;
    }
    $(modalTarget).openModal(options);
    isModalOpen = !isModalOpen;
    event.preventDefault();
  });

  $(document).keydown(function( event ) {
    if ( isOpen && event.which === 27) {
      $('.button-collapse').sideNav('hide');
      isOpen = !isOpen;
    } else if ( isModalOpen ) {
      $(modalTarget).closeModal();
      isModalOpen = !isModalOpen;
    }
  });

});
