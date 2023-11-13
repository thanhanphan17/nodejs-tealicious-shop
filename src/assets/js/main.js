'use strict'
;(function ($) {
    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $('.loader').fadeOut()
        $('#preloder').delay(200).fadeOut('slow')
    })

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg')
        $(this).css('background-image', 'url(' + bg + ')')
    })

    //Offcanvas Menu
    $('.canvas-open').on('click', function () {
        $('.offcanvas-menu-wrapper').addClass('show-offcanvas-menu-wrapper')
        $('.offcanvas-menu-overlay').addClass('active')
    })

    $('.canvas-close, .offcanvas-menu-overlay').on('click', function () {
        $('.offcanvas-menu-wrapper').removeClass('show-offcanvas-menu-wrapper')
        $('.offcanvas-menu-overlay').removeClass('active')
    })

    // Search model
    $('.search-switch').on('click', function () {
        $('.search-model').fadeIn(400)
    })

    $('.search-close-switch').on('click', function () {
        $('.search-model').fadeOut(400, function () {
            $('#search-input').val('')
        })
    })

    /*------------------
		Navigation
	--------------------*/
    $('.mobile-menu').slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    })

    /*------------------
        Hero Slider
    --------------------*/
    $('.hero-slider').owlCarousel({
        loop: true,
        margin: 0,
        items: 1,
        dots: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        mouseDrag: false
    })

    /*------------------------
		Testimonial Slider
    ----------------------- */
    $('.testimonial-slider').owlCarousel({
        items: 1,
        dots: false,
        autoplay: true,
        loop: true,
        smartSpeed: 1200,
        nav: true,
        navText: ["<i class='arrow_left'></i>", "<i class='arrow_right'></i>"]
    })

    /*------------------
        Magnific Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    })

    /*------------------
		Date Picker
	--------------------*/
    $('.date-input').datepicker({
        minDate: 0,
        dateFormat: 'dd MM, yy'
    })

    /*------------------
		Nice Select
	--------------------*/
    $('select').niceSelect()

    var rangeOne = document.querySelector('input[name="rangeOne"]'),
        rangeTwo = document.querySelector('input[name="rangeTwo"]'),
        outputOne = document.querySelector('.outputOne'),
        outputTwo = document.querySelector('.outputTwo'),
        inclRange = document.querySelector('.incl-range'),
        updateView = function () {
            if (this.getAttribute('name') === 'rangeOne') {
                outputOne.innerHTML = this.value
                outputOne.style.left = (this.value / this.getAttribute('max')) * 100 + '%'
            } else {
                outputTwo.style.left = (this.value / this.getAttribute('max')) * 100 + '%'
                outputTwo.innerHTML = this.value
            }
            if (parseInt(rangeOne.value) > parseInt(rangeTwo.value)) {
                inclRange.style.width = ((rangeOne.value - rangeTwo.value) / this.getAttribute('max')) * 100 + '%'
                inclRange.style.left = (rangeTwo.value / this.getAttribute('max')) * 100 + '%'
            } else {
                inclRange.style.width = ((rangeTwo.value - rangeOne.value) / this.getAttribute('max')) * 100 + '%'
                inclRange.style.left = (rangeOne.value / this.getAttribute('max')) * 100 + '%'
            }
        }

    document.addEventListener('DOMContentLoaded', function () {
        updateView.call(rangeOne)
        updateView.call(rangeTwo)
        $('input[type="range"]')
            .on('mouseup', function () {
                this.blur()
            })
            .on('mousedown input', function () {
                updateView.call(this)
            })
    })

    /*------------------
		CART
	--------------------*/
    var sitePlusMinus = function () {
        var value,
            quantity = document.getElementsByClassName('quantity-container')

        function createBindings(quantityContainer) {
            var quantityAmount = quantityContainer.getElementsByClassName('quantity-amount')[0]
            var increase = quantityContainer.getElementsByClassName('increase')[0]
            var decrease = quantityContainer.getElementsByClassName('decrease')[0]
            increase.addEventListener('click', function (e) {
                increaseValue(e, quantityAmount)
            })
            decrease.addEventListener('click', function (e) {
                decreaseValue(e, quantityAmount)
            })
        }

        function init() {
            for (var i = 0; i < quantity.length; i++) {
                createBindings(quantity[i])
            }
        }

        function increaseValue(event, quantityAmount) {
            value = parseInt(quantityAmount.value, 10)

            console.log(quantityAmount, quantityAmount.value)

            value = isNaN(value) ? 0 : value
            value++
            quantityAmount.value = value
        }

        function decreaseValue(event, quantityAmount) {
            value = parseInt(quantityAmount.value, 10)

            value = isNaN(value) ? 0 : value
            if (value > 0) value--

            quantityAmount.value = value
        }

        init()
    }
    sitePlusMinus()
})(jQuery)
