
function scroll_to(clicked_link, nav_height) {
    var hash = clicked_link.attr('href').split('#')[1];
    if (hash) {
        var element_class = '.' + hash;
        var scroll_to = 0;
        if (element_class != '.top-content') {
            element_class += '-container';
            scroll_to = $(element_class).offset().top - nav_height;
        }
        if ($(window).scrollTop() != scroll_to) {
            $('html, body').stop().animate({ scrollTop: scroll_to }, 1000);
        }
    }
}


jQuery(document).ready(function () {

    scroll_to($("<a href='" + window.location + "'>temp</a>"), $('nav').height());
	/*
	    Navigation
	*/
	$('a.scroll-link').on('click', function(e) {
		e.preventDefault();
		var nav_height = $('nav').height();
		if($('nav').css('position') != 'static') { // window width > 767px
			scroll_to($(this), nav_height);
		}
		else {
			scroll_to($(this), 0);
		}
	});
	
	$('.show-menu a').on('click', function(e){
		e.preventDefault();
		var menu_links = $('.nav-links a').not('.nav-links .show-menu a');
		if(menu_links.css('display') == 'none') {
			menu_links.css('display', 'inline-block');
		}
		else {
			menu_links.css('display', 'none');
		}
	});
	
	$(window).on('resize', function(){
		var menu_links = $('.nav-links a').not('.nav-links .show-menu a');
		if($('nav').css('position') != 'static') { // window width > 767px
			menu_links.css('display', 'inline-block');
		}
		else {
			menu_links.css('display', 'none');
		}
	});
	
    /*
        Fullscreen background
    */
    $('.top-content').backstretch("/Content/img/backgrounds/3.jpg");
    $('.how-it-works-container').backstretch("/Content/img/backgrounds/3.jpg");
    $('.call-to-action-container').backstretch("/Content/img/backgrounds/3.jpg");
    $('.latest-tweets-container').backstretch("/Content/img/backgrounds/3.jpg");
    $('.contact-container').backstretch("/Content/img/backgrounds/2.jpg");
    
    /*
        Wow
    */
    new WOW().init();
    
    /*
        Image popup
    */
	$('.screenshot-box img').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: 'The image could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('alt');
			}
		},
		callbacks: {
			elementParse: function(item) {
				item.src = item.el.attr('src');
			}
		}
	});
	
	/*
        FAQ
    */
	$('.single-faq span').on('click', function(){
		var this_p = $(this).siblings('.single-faq-text');
		var this_icon = $(this).find('i');
		if(this_p.css('display') == 'none') {
			this_p.slideDown(400);
			this_icon.removeClass('fa-plus').addClass('fa-minus');
		} 
		else {
			this_p.slideUp(400);
			this_icon.removeClass('fa-minus').addClass('fa-plus');
		}
	});
	
	/*
	    Testimonials
	*/
	$('.testimonial-active').html('<p>' + $('.testimonial-single:first p').html() + '</p>');
	$('.testimonial-single:first .testimonial-single-image img').css('opacity', '1');
	
	$('.testimonial-single-image img').on('click', function() {
		$('.testimonial-single-image img').css('opacity', '0.5');
		$(this).css('opacity', '1');
		var new_testimonial_text = $(this).parent('.testimonial-single-image').siblings('p').html();
		$('.testimonial-active p').fadeOut(300, function() {
			$(this).html(new_testimonial_text);
			$(this).fadeIn(400);
		});
	});
});

