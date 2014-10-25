'use strict';

$(document).ready(function() {
    var currSection = 1, currSlide = 0, 
        mySectionSelector = '.section', 
        mySlideSelector = '.slide',
        sectionCount = $(mySlideSelector).length - 1;
    $('#fullpage').fullpage({
        verticalCentered: true,
        resize : false,
		sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE','#fff'],
        anchors:['section1', 'section2', 'section3', 'section4'],
        scrollingSpeed: 700,
        easing: 'easeInQuart',
        menu: '#headerMenu',
        navigation: true,
        navigationPosition: 'left',
        navigationTooltips: ['Intro', 'Research', 'Teaching', 'People'],
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        loopBottom: true,
        loopTop: false,
        loopHorizontal: true,
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
        responsive: 768,

        afterRender: function() {
            currSection = 1;
            currSlide = 0;
        },

        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
            currSection = index;
            currSlide = slideIndex;
            //console.log('afterloadslide sec: ' + currSection + ' slide: ' + currSlide);
            var $currSection = $(mySectionSelector).eq(currSection-1);
            var slideCount =  $currSection.find(mySlideSelector).length;
            if (index === sectionCount && slideCount - 1 === slideIndex) {
                $('.bottom-nav #bottom-next').addClass('hidden');
            } else if (index === 1 && slideIndex === 0) {
                $('.bottom-nav #bottom-prev').addClass('hidden');
            }
        },
        afterLoad: function(anchorLink, index){
            currSection = index;
            var $currSection = $(mySectionSelector).eq(currSection-1);
            var slideCount =  $currSection.find(mySlideSelector).length;
            if (slideCount === 0) {
                currSlide = 0;
            } else {
                currSlide = $currSection.find(mySlideSelector + '.active').index();
            }
            //console.log('afterloadsec sec: ' + currSection + ' slide: ' + currSlide + ' slideCount:' + slideCount);
            if (index === sectionCount && slideCount === 0) {
                //console.log('disnext');
                $('.bottom-nav #bottom-next').addClass('hidden');
                $('.bottom-nav #bottom-top').removeClass('hidden');
            } else if (index === 1) {
                console.log('disprev');
                $('.bottom-nav #bottom-prev').addClass('hidden');
            }
        },
        onLeave: function() {//index, nextIndex, direction) {
            if ($('.bottom-nav #bottom-prev').hasClass('hidden')) {
                $('.bottom-nav #bottom-prev').removeClass('hidden');
            } else if ($('.bottom-nav #bottom-next').hasClass('hidden')) {
                $('.bottom-nav #bottom-next').removeClass('hidden');
                $('.bottom-nav #bottom-top').addClass('hidden');
            }
        }
    });

    $('.bottom-nav button').click(function(){
        //console.log('currslide: ' + currSlide + ' currsection: ' + currSection);
        var $currSection, slideCount;
        if ($(this).attr('id') === 'bottom-top') {
            $.fn.fullpage.moveTo(1,1);
        } else if ($(this).attr('id') === 'bottom-prev') {
            if (currSlide === 0 && currSection > 1) {
                // get the previous section, see if it has more than 1 slide
                $currSection = $(mySectionSelector).eq(currSection-2);
                slideCount =  $currSection.find(mySlideSelector).length;
                //console.log('prev section: ' + (currSection-1) + ' side count: ' + slideCount);
                $.fn.fullpage.moveTo(currSection-1,currSlide - 1);
            } else {
                $.fn.fullpage.moveSlideLeft();
            }
        } else {
            $currSection = $(mySectionSelector).eq(currSection-1);
            slideCount =  $currSection.find(mySlideSelector).length;
            if (currSlide >= 0 && slideCount - 1 > currSlide) {
                $.fn.fullpage.moveTo(currSection,currSlide + 1);
            } else {
                $.fn.fullpage.moveTo(currSection + 1,0);
            }
        }
    });
});