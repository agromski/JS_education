// page init
$(function(){
	fadeGallery('.fade-carousel', '.slideset', '.slide');
});

// fade carousel
function fadeGallery(galleryContainer, gallerySlideset, gallerySlide){
	var slider = $(galleryContainer);

	slider.each(function(index, item){
		switchSlides($(item));
	});

	// switchSlides
	function switchSlides (c){
		var slideset = c.find(gallerySlideset);
		var slides = c.find(gallerySlide);
		var btnNext = c.find('.btn-next');
		var btnPrev = c.find('.btn-prev');
		var btnPause = c.find('.btn-pause');
		var current = 0;
		var interval;
		var playing = false;

		var htmlOptions = c.data('options');

		var options = $.extend({}, {interval: 1000}, htmlOptions);

		if (options.autorotation) {
			btnPause.text('pause');
			interval = setInterval(autorotation, options.interval);
			playing = true;
		};

		refreshState();
		resizeControl();

		// autorotation
		function autorotation() {
			current = (current < slides.length-1) ? current + 1 : 0;
			refreshState();
		}

		// forward 
		btnNext.on('click', function(e){
			e.preventDefault();
			current = (current < slides.length-1) ? current + 1 : 0;
			refreshState();
		});

		// backward
		btnPrev.on('click', function(e){
			e.preventDefault();
			current = (current > 0) ? current - 1 : slides.length-1;
			refreshState();
		});

		// pause
		btnPause.on('click', function(e){
			e.preventDefault();
			if (playing) {
				btnPause.text('play');
				clearInterval(interval);
				playing = false;
			} else{
				btnPause.text('pause');
				interval = setInterval(autorotation, options.interval);
				playing = true;
			};
		});

		// refreshState
		function refreshState(){
			slides.css({'opacity' : '0', 'z-index': '0'});
			var currentSlideHeight = slides.eq(current).outerHeight();
			slides.eq(current).css({'opacity' : '1', 'z-index': '1'});
			slideset.outerHeight(currentSlideHeight);
			// c.outerHeight(currentSlideHeight);
		}

		function resizeControl(){
			$(window).resize(function(){
				setTimeout(function(){
					var currentSlideHeight = slides.eq(current).outerHeight();
					slideset.outerHeight(currentSlideHeight);
				}, 30);
			});
		}
	}
}