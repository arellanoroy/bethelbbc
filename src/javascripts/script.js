/* Author:

*/


// Global Variables

var isMobile = /Android|webOS|iPhone|iPod|iPad|BlackBerry/i.test(navigator.userAgent);



// Miscellaneous JS

(function($) {

	'use strict';



	function slideTransition() {

		var currentSlide = 0;
		var totalSlide = $('.block').length - 1;

		
		
		

		$('.slide-nav li').on('click', function(e) {
			event.preventDefault();
			var index = $(this).index() + 1;
			$('.slide-nav li').removeClass('active');
			$(this).addClass('active');
			$.fn.fullpage.moveTo(index);
		});

		$(window).on('mousewheel scroll', function(e) {
			var header = $('.header');
			var headerOffset = header.outerHeight();
			var block = $('.block-wrapper .block');
			var slideImage = block.children('.slide-image');
			var windowHeight = $(window).height();
			var docHeight = $(document).height();
			var scrollTop = $(window).scrollTop();
			var scrollArea = docHeight - windowHeight;
			
	
			var scroll = Math.floor(scrollTop / windowHeight);


			
			var scrollOrig = ((windowHeight + 5) / 5 * scroll - scrollTop / 5) * -1;
			var scrollOffset = ((windowHeight + 5) / 5 * (scroll + 1) - scrollTop / 5) * -1;
			//console.log(scroll);

			//console.log(scrollOffset);
			var firstImage = $(block[scroll]).find('.slide-image');
            var image = $(block[scroll + 1]).find('.slide-image');

			TweenMax.to(image, 0, { y: scrollOffset });
			TweenMax.to(firstImage, 0, { y: scrollOrig });



			$('.slide-nav li').removeClass('active');
			$('.slide-nav li').eq(scroll).addClass('active');


			var easing = Power2.easeInOut;
			
			
			if (scrollTop > headerOffset) {
				header.addClass('header-fixed');
			} else {
				header.removeClass('header-fixed');
			}


			
			
			var scroller = windowHeight * totalSlide;

			
			// for (var i = 0, i < totalSlide) {

			// }

		});
	}



	function viewportAnim() {
		var scrollAnim = $('.scroll-anim');
		var windowHeight = $(window).height();
		var docHeight = $(document).height();
		TweenMax.to(scrollAnim, 0, {y: 60, autoAlpha: 0});
		$(window).on('scroll', function() {
			var scrollTop = $(window).scrollTop();
			scrollAnim.each(function(i) {
				var slide = $(this);
				var slideOffset = slide.offset().top - windowHeight;

				if (scrollTop > slideOffset) {
					slide.addClass('is-animated');
					TweenMax.staggerTo(slide, 0.4, {y: 0, autoAlpha:1, delay: 0.1}, 0.4);
				} else {
					$(this).removeClass('is-animated');
					TweenMax.staggerTo(slide, 0.1, {y: 60, autoAlpha:0, delay: 0}, 0.1);
				}

			});	
		});
		$(window).trigger('scroll');


	}


	function fullpageInit() {
		if (!isMobile) {
			$('#slides').fullpage({
				autoScrolling: false,
				sectionSelector: '.block'
			});
		} else {
			$('#slides').fullpage({
				autoScrolling: true,
				sectionSelector: '.block'
			});
		}
	}


	function menuInit() {
		$('.menu-toggle').on('click', function(event) {
			event.preventDefault();
			if ($('.m-nav').css('opacity') == 0) {
				$('body').addClass('menu-open');
				$('html').addClass('menu-enabled');
				if (isMobile) {
					$.fn.fullpage.destroy('all');
				}
				$('.scroll-bar').TrackpadScrollEmulator('recalculate');
				TweenMax.to(".icon-1", 0.2, {rotation: -45, y: 10}, 0.2);
				TweenMax.to(".icon-2", 0.2, {rotation: 45, y: 0}, 0.2);
				TweenMax.staggerTo(".m-nav-list > li", 0.1, {opacity: 1, y: 5}, 0.2);
			} else {
				$('body').removeClass('menu-open');
				$('html').removeClass('menu-enabled');
				if (isMobile) {
					fullpageInit();
				}
				TweenMax.to(".icon-line", 0.2, {rotation: 0, y: 0}, 0.2);
				TweenMax.staggerTo(".m-nav-list > li", 0.1, {opacity: 0, y: 0}, 0.2);
			}
		});


		$('.m-toggle').click(function(event) {
			event.preventDefault();
			
		  	var dd = $(this).next('.m-dd');
		  	if (dd.height() === 0) {
		  		var curHeight = dd.height();
				var autoHeight = dd.css('height', 'auto').height();
				TweenMax.to(dd, 0, { height: curHeight });
				TweenMax.to(dd, 0.3, { height: autoHeight });
				//console.log(curHeight);
				$(this).parent().addClass('open');
		  	} else {
				TweenMax.to(dd, 0.3, { height: 0});
				$(this).parent().removeClass('open');
		  	}
		});

		$('.down-arrow').on('click', function() {
			$.fn.fullpage.moveSectionDown();
		});

	}
	

	function windowResize() {
		$(window).on('resize', function() {
			var windowHeight = $(window).height();
			$('.fullscreen').height(windowHeight);
		});

		$(window).trigger('resize');
	}



	$(function() {
		FastClick.attach(document.body);
		windowResize();
		

		if ($('#slides').length > 0) {
			fullpageInit();
			if (!isMobile) {
				slideTransition();
			}
		}

		
		$('.scroll-bar').TrackpadScrollEmulator();

		menuInit();

		if ($('.scroll-anim').length > 0) {
			viewportAnim();
		} 
	});
		
})(jQuery);