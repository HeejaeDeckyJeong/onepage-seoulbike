/*!
 * Start Bootstrap - New Age v6.0.7 (https://startbootstrap.com/theme/new-age)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-new-age/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener('DOMContentLoaded', (event) => {
    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    }

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(document.querySelectorAll('#navbarResponsive .nav-link'));
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});
var swiper = new Swiper('.mySwiper', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
/*

 Horizontal Scroll Slider

 Version: 0.0.1
 Author: Alexandre Buffet
 Website: https://www.alexandrebuffet.fr
*/
!(function ($) {
    'use strict';

    var $slider = $('.scroll-slider'),
        $slides = $('.scroll-slide'),
        $sliderWrapper = $('.scroll-wrapper'),
        $firstSlide = $slides.first();

    var settings = {},
        resizing = false,
        scrollController = null,
        scrollTween = null,
        scrollTimeline = null,
        progress = 0,
        scrollScene = null;

    function scrollSlider(options) {
        // Default
        settings = $.extend(
            {
                slider: '.scroll-slider',
                sliderWrapper: '.scroll-wrapper',
                slides: '.scroll-slide',
                slideWidth: null,
                slideHeight: null,
            },
            options
        );

        // Set dimensions
        setDimensions();

        // On resize
        $(window).on('resize', function () {
            clearTimeout(resizing);
            resizing = setTimeout(function () {
                setDimensions();
            }, 250);
        });
    }

    function setDimensions() {
        settings.slideWidth = $firstSlide.width();
        settings.slideHeight = $firstSlide.height();

        console.log(settings.slideWidth);
        console.log(settings.slideHeight);

        // Calculate slider width and height
        settings.sliderWidth = Math.ceil(settings.slideWidth * $slides.length);
        settings.sliderHeight = $firstSlide.outerHeight(true);

        // Set slider width and height
        $sliderWrapper.width(settings.sliderWidth);
        //$sliderWrapper.height(settings.sliderHeight);

        // Set scene
        setScene();

        //resizing = false;
    }

    function setScene() {
        var xDist = -$slides.width() * ($slides.length - 1),
            tlParams = { x: xDist, ease: Power2.easeInOut };

        if (scrollScene != null && scrollTimeline != null) {
            progress = 0;
            scrollScene.progress(progress);

            scrollTimeline = new TimelineMax();
            scrollTimeline.to($sliderWrapper, 2, tlParams);

            scrollScene.setTween(scrollTimeline);

            scrollScene.refresh();
        } else {
            // Init ScrollMagic controller
            scrollController = new ScrollMagic.Controller();

            //Create Tween
            scrollTimeline = new TimelineMax();
            scrollTimeline.to($sliderWrapper, 2, tlParams);
            scrollTimeline.progress(progress);

            // Create scene to pin and link animation
            scrollScene = new ScrollMagic.Scene({
                triggerElement: settings.slider,
                triggerHook: 'onLeave',
                duration: settings.sliderWidth,
            })
                .setPin(settings.slider)
                .setTween(scrollTimeline)
                .addTo(scrollController)
                .on('start', function (event) {
                    scrollTimeline.time(0);
                });
        }
    }

    $(document).ready(function () {
        scrollSlider();
    });
})(jQuery);
