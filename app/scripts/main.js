/* global skrollr:false */
'use strict';

$(document).ready(function() {
  $('.scrollspy').scrollSpy();
  var s = skrollr.init({
    easing: 'sqrt',
    scale: 2
  });

  skrollr.menu.init(s, {
    animate: true,
    easing: 'sqrt',
    scale: 2,

    //How long the animation should take in ms.
    duration: 500,//function(currentTop, targetTop) {
        //By default, the duration is hardcoded at 500ms.
        //return 500;

        //But you could calculate a value based on the current scroll position (`currentTop`) and the target scroll position (`targetTop`).
        //return Math.abs(currentTop - targetTop) * 10;
    //},

    //If you pass a handleLink function you'll disable `data-menu-top` and `data-menu-offset`.
    //You are in control where skrollr will scroll to. You get the clicked link as a parameter and are expected to return a number.
    //handleLink: function(link) {
    //    return 400;//Hardcoding 400 doesn't make much sense.
    //},

    //By default skrollr-menu will only react to links whose href attribute contains a hash and nothing more, e.g. `href="#foo"`.
    //If you enable `complexLinks`, skrollr-menu also reacts to absolute and relative URLs which have a hash part.
    //The following will all work (if the user is on the correct page):
    //http://example.com/currentPage/#foo
    //http://example.com/currentDir/currentPage.html?foo=bar#foo
    ///?foo=bar#foo
    complexLinks: false,

    //This event is triggered right before we jump/animate to a new hash.
    //change: function(newHash, newTopPosition) {
        //Do stuff
    //},

    //Add hash link (e.g. `#foo`) to URL or not.
    updateUrl: true //defaults to `true`.
  });

/* menu and map handling */

var isModalOpen = false,
isOpen = false,
modalTarget;

$('.button-collapse').sideNav({
      menuWidth: 300, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: false, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      navOpened: function(){
        $('.hamburger-button').addClass('active');
      },
      navClosed: function(){
        $('.hamburger-button').removeClass('active');
      }
    }
    );

$('.button-collapse').click(function() {
        //toggleMenu(); // already handled by materialize's js
        isOpen = !isOpen;
        $(this).blur();
      });

$('.modal-trigger').click( function(event) {
  var options = {
    dismissible: true
  };
  modalTarget = $(this).attr('href') || '#' + $(this).data('target');
        if ($.hasData(this) && $(this).data('map')){ // get the url for the map to load if it exists
          var mapSrc = $(this).data('map');
          $('#map-frame').attr('src',mapSrc);
        } else {
          options.dismissible = false;
        }
        $(modalTarget).openModal(options);
        isModalOpen = !isModalOpen;
        event.preventDefault();
      });

    // close the menu/map element
    // note: using the built-in materialize functions seemed to provide more consistent results
    // $('body').mousedown(function( event ) {
        // var $target = $(event.target);
        // if ( isModalOpen && ($target.is('#close-map-button') || $target.closest('#map-wrap').length === 0) ) {
        //     $(modalTarget).closeModal();
        //     isModalOpen = !isModalOpen;
        // }
        // event.preventDefault();
    // });

$(document).keydown(function( event ) {
  if ( isOpen && event.which === 27) {
    $('.button-collapse').sideNav('hide');
    isOpen = !isOpen;
  } else if ( isModalOpen ) {
    console.log('target: ' + modalTarget);
    $(modalTarget).closeModal();
    isModalOpen = !isModalOpen;
  }
});

});

