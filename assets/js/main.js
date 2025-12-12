/*----------------------------------------------
2. Responsive Menu
----------------------------------------------*/

jQuery(function ($) {

    'use strict';

    function navResponsive() {

        let navbar = $('.navbar .items');
        let menu = $('#menu .items');

        menu.html('');
        navbar.clone().appendTo(menu);

        $('.menu .icon-arrow-right').removeClass('icon-arrow-right').addClass('icon-arrow-down');

        $('.menu .nav-item.dropdown').each(function() {
            let children = $(this).children('.nav-link');
            children.addClass('prevent');
        })
    }

    navResponsive();

    $(window).on('resize', function () {
        navResponsive();
    })

    $('.menu .dropdown-menu').each(function() {
        var children = $(this).children('.dropdown').length;
        $(this).addClass('children-'+children);
    })

    $('.menu .nav-item.dropdown').each(function() {
        var children = $(this).children('.nav-link');
        children.addClass('prevent');
    })

    $(document).on('click', '#menu .nav-item .nav-link', function (e) {

        if($(this).hasClass('prevent')) {
            e.preventDefault();
        }

        var nav_link = $(this);

        nav_link.next().toggleClass('show');

        if(nav_link.hasClass('smooth-anchor')) {
            $('#menu').modal('hide');
        }
    })
})

/*----------------------------------------------
3. Navigation
----------------------------------------------*/

jQuery(function ($) {

    'use strict';

    var position = $(window).scrollTop();
    var navbar   = $('.navbar');
    var toTop    = $('#scroll-to-top');

    $(document).ready(function() {
        if (position > 0) {
            navbar.addClass('navbar-sticky');
        }
        toTop.hide();
    })

    $(window).scroll(function () {

        navbar.removeAttr('data-aos');
        navbar.removeAttr('data-aos-delay');

        var scroll = $(window).scrollTop();

        if (!navbar.hasClass('relative')) {

            // Down
            if (scroll > position) {

                navbar.addClass('navbar-sticky');

                if(navbar.hasClass('navbar-fixed') || window.innerWidth <= 767) {
                    navbar.removeClass('hidden').addClass('visible');

                } else {

                    if ($(window).scrollTop() >= window.innerHeight) {
                        navbar.removeClass('visible').addClass('hidden');
                    }
                }                

                toTop.fadeOut('fast');

            // Up
            } else {

                if(!navbar.hasClass('navbar-no-fixed')) {
                    navbar.removeClass('hidden').addClass('visible');
                }

                // Top
                if ($(window).scrollTop() <= 100 && $('.navbar-holder').length == 0) {
                    navbar.removeClass('navbar-sticky');

                } else {                   

                    if(!navbar.hasClass('navbar-no-fixed')) {
                        navbar.addClass('visible');
                    }
                }

                if (position >= window.innerHeight && window.innerWidth >= 767) {
                    toTop.fadeIn('fast');

                } else {
                    toTop.fadeOut('fast');
                }
            }
            position = scroll;
        }
    })

    $('.nav-link').each(function() {

        if(this.hasAttribute('href')) {
            let href = $(this).attr('href');
            if (href.length > 1 && href.indexOf('#') != -1) {
                $(this).addClass('smooth-anchor');
            }
        }

        let body = $('body');

        if(this.hasAttribute('href') && ! body.hasClass('home')) {
            let href = $(this).attr('href');
            if (href.length > 1 && href.indexOf('#') != -1) {
                $(this).removeClass('smooth-anchor');
                $(this).attr('href', '/'+href);
            }
        }
    })

    $(document).on('click', '.smooth-anchor', function (e) {
        e.preventDefault();

        let href   = $(this).attr('href');
        let target = $.attr(this, 'href');

        if($(target).length > 0) {
        
            if (href.length > 1 && href.indexOf('#') != -1) {
                $('html, body').animate({
                    scrollTop: $(target).offset().top
                }, 500);
            }
        }
    })

    $('.dropdown-menu').each(function () {

        let dropdown = $(this);

        dropdown.hover(function () {
            dropdown.parent().find('.nav-link').first().addClass('active');

        }, function () {
            dropdown.parent().find('.nav-link').first().removeClass('active');
        })
    })

    if($('.navbar-holder').length > 0) {
        $('.navbar').addClass('navbar-sticky');
        $('.navbar-holder').css('min-height',$('.navbar-expand').outerHeight());
    }
})

/*----------------------------------------------
4. Slides
----------------------------------------------*/

jQuery(function ($) {

    setTimeout(function() {
        $('.no-slider .left').addClass('init');
        $('.no-slider .right').addClass('init');
    }, 1200)

    var animation = function(slider) {

        let image = $(slider + ' .swiper-slide-active img');
        let title = $(slider + ' .title');
        let description = $(slider + ' .description');
        let btn = $(slider + ' .btn');
        let nav = $(slider + ' nav');

        image.toggleClass('aos-animate');
        title.toggleClass('aos-animate');
        description.toggleClass('aos-animate');
        btn.toggleClass('aos-animate');
        nav.toggleClass('aos-animate');

        setTimeout(function() {
            image.toggleClass('aos-animate');
            title.toggleClass('aos-animate');
            description.toggleClass('aos-animate');
            btn.toggleClass('aos-animate');
            nav.toggleClass('aos-animate');

            AOS.refresh();

        }, 100)

        if ($('.full-slider').hasClass('animation')) {

            $('.full-slider .left').addClass('off');
            $('.full-slider .left').removeClass('init');
            $('.full-slider .right').addClass('off');
            $('.full-slider .right').removeClass('init');

            setTimeout(function() {
                $('.full-slider .left').removeClass('off');
                $('.full-slider .right').removeClass('off');
            }, 200)

            setTimeout(function() {
                $('.full-slider .left').addClass('init');
                $('.full-slider .right').addClass('init');
            }, 1000)

        } else {
            $('.full-slider .left').addClass('init');
            $('.full-slider .right').addClass('init');
        }
    }

    var fullSlider = new Swiper('.full-slider', {

        autoplay: {
            delay: 10000,
        },
        loop: false,
        slidesPerView: 1,
        spaceBetween: 0,
        navigation: false,
        pagination: {
            el: '.full-slider .swiper-pagination',
            clickable: true
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false
        },
        on: {
            init: function() {
                animation('.full-slider');
                let pagination = $('.full-slider .swiper-pagination');
                pagination.hide();

                setTimeout(function() {
                    pagination.show();
                }, 2000)

            },
            slideChange: function() {
                animation('.full-slider')
            },
            sliderMove: function() {
                let slider = $('.full-slider');
                if (slider.hasClass('animation')) {
                    $('.full-slider .swiper-slide-next .left').addClass('off')
                    $('.full-slider .swiper-slide-next .right').addClass('off');
                    $('.full-slider .swiper-slide-prev .left').addClass('off')
                    $('.full-slider .swiper-slide-prev .right').addClass('off');
                }
            }
        }
    })

    $('.mid-slider').each(function() {

        if($(this).data('perview')) {
            var midPerView = $(this).data('perview');
        } else {
            midPerView = 3;
        }

        if($(this).data('autoplay') && $(this).data('autoplay') == true) {
            var midAutoPlay = { delay: 5000 };
        } else {
            midAutoPlay = false;
        }

        var midSlider = new Swiper(this, {

            autoplay: midAutoPlay,
            loop: true,
            slidesPerView: 1,
            spaceBetween: 30,
            breakpoints: {
                767: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1023: {
                    slidesPerView: midPerView,
                    spaceBetween: 30
                }
            },
            pagination: {
                el: '.mid-slider .swiper-pagination',
                clickable: true
            }
        })
    })

    $('.mid-slider-simple').each(function() {

        if($(this).data('perview')) {
            var midSimplePerView = $(this).data('perview');
        } else {
            midSimplePerView = 3;
        }

        if($(this).data('autoplay') && $(this).data('autoplay') == true) {
            var midSimpleAutoPlay = { delay: 5000 };
        } else {
            midSimpleAutoPlay = false;
        }

        var midSliderSimple = new Swiper(this, {

            autoplay: midSimpleAutoPlay,
            loop: false,
            centerInsufficientSlides: true,
            slidesPerView: 1,
            spaceBetween: 30,
            breakpoints: {
                767: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                1023: {
                    slidesPerView: midSimplePerView,
                    spaceBetween: 30
                }
            },
            pagination: {
                el: '.mid-slider-simple .swiper-pagination',
                clickable: true
            }
        })
    })

    var minSlider = new Swiper('.min-slider', {
        autoplay: {
            delay: 5000,
        },
        loop: false,
        centerInsufficientSlides: true,
        slidesPerView: 2,
        spaceBetween: 15,
        breakpoints: {
            424: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            767: {
                slidesPerView: 3,
                spaceBetween: 15
            },
            1023: {
                slidesPerView: 4,
                spaceBetween: 15
            },
            1199: {
                slidesPerView: 5,
                spaceBetween: 15
            }
        },
        pagination: false,
    })

    var noSlider = new Swiper('.no-slider', {

        autoplay: false,
        loop: false,
        keyboard: false,
        grabCursor: false,
        allowTouchMove: false,
        on: {
            init: function() {
                animation('.no-slider')
            }
        }
    })
})


/*----------------------------------------------
7. Shuffle
----------------------------------------------*/

jQuery(function ($) {

    'use strict';

    $('.filter-section').each(function(index) {

        var count = index + 1;

        $(this).find('.filter-items').removeClass('filter-items').addClass('filter-items-'+count);
        $(this).find('.filter-item').removeClass('filter-item').addClass('filter-item-'+count);
        $(this).find('.filter-sizer').removeClass('filter-sizer').addClass('filter-sizer-'+count);
        $(this).find('.btn-filter-item').removeClass('btn-filter-item').addClass('btn-filter-item-'+count);
        
        var Shuffle = window.Shuffle;
        var Filter  = new Shuffle(document.querySelector('.filter-items-'+count), {
            itemSelector: '.filter-item-'+count,
            sizer: '.filter-sizer-'+count,
            buffer: 1,
        })
    
        $('.btn-filter-item-'+count).on('change', function (e) {
    
            var input = e.currentTarget;
            
            if (input.checked) {
                Filter.filter(input.value);
            }
        })
    })
})

