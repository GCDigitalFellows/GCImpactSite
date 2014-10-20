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
});

