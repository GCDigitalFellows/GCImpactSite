'use strict';
/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
(function() {

	/**
	 * based on from https://github.com/inuyaksa/jquery.nicescroll/blob/master/jquery.nicescroll.js
	 */
	function hasParent( e, p ) {
		if (!e) {
			return false;
		}
		var el = e.target||e.srcElement||e||false;
		while (el && el !== p) {
			el = el.parentNode||false;
		}
		return (el!==false);
	}

	var openbtn = document.getElementById( 'open-button' ),
		closebtn = document.getElementById( 'close-button' ),
		openMapbtn = document.getElementById( 'map-button' ),
		closeMapbtn = document.getElementById( 'close-map-button' ),
		menu = document.querySelector('.menu-wrap'),
		map = document.querySelector('.map-wrap'),
		isMapOpen = false,
		isOpen = false;

	function init() {
		initEvents();
	}

	function initEvents() {
		openbtn.addEventListener( 'click', function() {
			toggleMenu();
			openbtn.blur();
		} );
		openMapbtn.addEventListener( 'click', function() {
			toggleMap();
			event.preventDefault();
		});
		if( closebtn ) {
			closebtn.addEventListener( 'click', toggleMenu );
		}
		if( closeMapbtn ) {
			closeMapbtn.addEventListener( 'click', toggleMap );
		}

		// close the menu element if the target is not the menu element or one of its descendants..
		document.addEventListener( 'mousedown', function(ev) {
			var target = ev.target;
			console.log(target);
			if( isOpen && target !== openbtn && !hasParent( target, menu ) ) {
				toggleMenu();
			} else if ( isMapOpen && target !== openMapbtn && !hasParent( target, map ) ) {
				toggleMap();
			}
		} );
	}

	function toggleMenu() {
		document.body.classList.toggle('show-menu');
		isOpen = !isOpen;
	}
	function toggleMap() {
		console.log('pressed');
		document.body.classList.toggle('show-map');
		isMapOpen = !isMapOpen;
	}

	init();

})();