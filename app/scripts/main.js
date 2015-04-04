'use strict';

$(document).ready(function() {
    $('#fullpage').fullpage({
        verticalCentered: true,
        resize : false,
        anchors:['section1', 'section2', 'section3', 'section4','section5','section6','section7','section8','section9','section10','section11'],
        scrollingSpeed: 500,
        easing: 'cubic-bezier(.4,0,.2,1)',//'cubic-bezier(0.190, 1.000, 0.220, 1.000)',//'easeInOutQuart',
        easingCSS3: 'cubic-bezier(.4,0,.2,1)',//'cubic-bezier(0.190, 1.000, 0.220, 1.000)',//'easeInOutQuart',
        menu: '#slide-out',
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['The Graduate Center, CUNY','The Graduate Center, CUNY','The Graduate Center, CUNY', 'Research', 'Research', 'Research', 'Teaching', 'Teaching', 'Teaching', 'People', 'People', 'People'],
        slidesNavigation: false,
        loopBottom: true,
        loopTop: false,
        loopHorizontal: false,
        autoScrolling: true,
        scrollOverflow: true,
        css3: true,
        paddingTop: '3em',
        paddingBottom: '10px',
        normalScrollElements: '.container,.card,.card-reveal,.modal-content .row .col',
        normalScrollElementTouchThreshold: 7,
        keyboardScrolling: true,
        touchSensitivity: 5,
        continuousVertical: false,
        animateAnchor: true,
        sectionSelector: '.section',
        slideSelector: '.slide',
        responsive: 0,

        afterLoad: function(anchorLink, index){

            /* velocity.js animate svgs */
            if (anchorLink === 'section2' || index === 2) {
                $('[data-anchor="section2"] .open-map-button').velocity({scale: 0.8,opacity:0.4},{'loop': 2, duration: 1000});
            } else if (anchorLink === 'section6' || index === 6) {
                $('[data-anchor="section6"] .open-map-button').velocity({scale: 0.8,opacity:0.4},{'loop': 2, duration: 1000});
            }

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
      closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
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