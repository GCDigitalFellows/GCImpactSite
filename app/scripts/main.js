/* global skrollr:false */
'use strict';

$(document).ready(function() {
	skrollr.init({
		beforerender: function() {
			//console.log('beforerender');
		},
		render: function() {
			//console.log('render');
		},
		easing: {
			WTF: Math.random,
			inverted: function(p) {
				return 1-p;
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

