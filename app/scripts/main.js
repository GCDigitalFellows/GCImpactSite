'use strict';

$(document).ready(function() {
    $('#fullpage').fullpage({
        verticalCentered: true,
        resize : false,
		//sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE','#fff'],
        anchors:['section1', 'section2', 'section3', 'section4','section5','section6','section7','section8','section9','section10','section11'],
        scrollingSpeed: 700,
        easing: 'easeInQuart',
        menu: '#headerMenu',
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['Intro', 'Research', 'Teaching', 'People'],
        slidesNavigation: false,
        loopBottom: true,
        loopTop: false,
        loopHorizontal: false,
        autoScrolling: true,
        scrollOverflow: true,
        css3: true,
        paddingTop: '3em',
        paddingBottom: '10px',
        normalScrollElements: '#element1, .element2',
        normalScrollElementTouchThreshold: 15,
        keyboardScrolling: true,
        touchSensitivity: 15,
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

    });

    /* menu and map handling */

    var isMapOpen = false,
        isOpen = false,
        mapId;

    function toggleMenu() {
        $('body').toggleClass('show-menu');
        isOpen = !isOpen;
    }
    function toggleMap() {
        $('body').toggleClass('show-map');
        isMapOpen = !isMapOpen;
    }

    $('#open-button').click(function() {
        toggleMenu();
        $(this).blur();
    });

    $('.map-button').click(function(event) {
        event.preventDefault();
        mapId = $(this).data( 'map' );
        // load the map into the map-wrapper's iframe
        $('#map-frame').attr('src',mapId);
        toggleMap();
    });


    // close the menu/map element
    $('body').mousedown(function( event ) {
        var $target = $(event.target);
        if( isOpen && !$target.is('#open-button') && $target.closest('.menu-wrap').length === 0) {//!hasParent( target, menu ) ) {
            toggleMenu();
        } else if ( isMapOpen && ($target.is('#close-map-button') || $target.closest('#map-wrap').length === 0) ) {
            toggleMap();
        }
    });

    $(document).keydown(function( event ) {
        if ( isOpen && event.which === 27) {
            toggleMenu();
        } else if ( isMapOpen && mapId) {
            toggleMap();
        }
    });

});