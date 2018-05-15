// page init
$(function(){
	sameHeight('.sameheight', '.block');
	valign('.valign', 'img');
	onClickPopup_simple('.popup-block_simple', '.popup', '.btn');
	onClickPopup('.popup-block_with_add_class', '.btn');
	sliceText('.description p', '20');
	fadeGallery('.fade-carousel', '.slideset', '.slide');
	timer('.timer-block');
});


// sameHeight
function sameHeight(parent, child){

	var parentDir = $(parent);
	$(parentDir).each(function(index, item){
		var col = $(item).find(child);
		setHeight(col);
		resizeControl(col);
	});

	function setHeight(c){
		var maxHeight = 0;
		c.each(function(index, item){
			currentHeight = $(item).innerHeight();
			if (currentHeight > maxHeight) {
				maxHeight = currentHeight;
			};
		});
		c.innerHeight(maxHeight);
	}

	function resizeControl(c){
		$(window).resize(function(){
			setTimeout(function(){
				c.css('height', 'auto');
				setHeight(c);
			}, 30);
		});
	}
};

// valign
function valign(parent, child) {

	var alignContainer = $(parent);

	alignContainer.each(function(index, item){

		var alignElement = $(item).find(child);

		var parentWidth = $(item).width(),
				parentHeight = $(item).height();

		var childWidth = alignElement.width(),
				childHeight = alignElement.height();

		var marginLeft = (parentWidth - childWidth) / 2,
				marginTop = (parentHeight - childHeight) / 2;

		alignElement .css({
			"margin-left": marginLeft,
			"margin-top": marginTop
		});
	});

}

// onClickPopup simple
function onClickPopup_simple(holderName, popupName, btnName){
	var btn = $(holderName).find(btnName);
	
	var holder = $(holderName);

	var popup = $(holderName).find(popupName);

	var currentState = false;

	btn.on('click', function(e){
		e.preventDefault();
		if (currentState == false) {
			popup.css({
				'display': 'block'
			});
			currentState = true;
		} else{
			popup.css({
				'display': 'none'
			});
			currentState = false;
		};
	});
}

// onClickPopup with add class
function onClickPopup(holderName, btnName){

	$(holderName).each(function(index, item){
		addClass($(item));
	});

	function addClass(c){
		var currentState = false;
		var btn = c.find(btnName);
		btn.on('click', function(e){
			e.preventDefault();
			if (currentState == false) {
				c.addClass('active');
				currentState = true;
			} else{
				c.removeClass('active');
				currentState = false;
			};
		});
	}
}

// slice text
function sliceText(holderName, srtLength){
	$(holderName).each(function(index, item){
		slice($(item));
	});

	function slice(c){
		var initialText = c.text();
		var sliceText = c.text().slice(0,srtLength);
		c.text(sliceText);
		var link = $('<a href="#">...</a>');
		c.append(link);
		link.on('click', function(e){
			e.preventDefault();
			c.text(initialText);
		});
	}
}

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

// counter
function timer (timerHolder) {
	var timerContainer = $(timerHolder);
	var timerElement = timerContainer.find('input');
	var btnIncrease = timerContainer.find('.btn-inc');
	var btnDecrease = timerContainer.find('.btn-dec');
	var btnStartPause = timerContainer.find('.btn-start');
	var btnreset = timerContainer.find('.btn-reset');
	var curTime = 0;
	timerElement.val(curTime);
	var isRunning = false;
	var runCounter;

	btnIncrease.on('click', function(e){
		e.preventDefault();
		timerElement.val(++curTime);
	});

	btnDecrease.on('click', function(e){
		e.preventDefault();
		if (curTime !=0) {
			timerElement.val(--curTime);
		};
	});


	btnStartPause.on('click', function(e){
		e.preventDefault();
		if (!isRunning) {
			runCounter = setInterval(function(){
				if (curTime !=0) {
					timerElement.val(--curTime);
					isRunning = true;
				} else {
					clearInterval();
					isRunning = false;
				}
			}, 500);
		} else {
			clearInterval(runCounter);
			isRunning = false;
		};
	});

	btnreset.on('click', function(e){
		e.preventDefault();
		curTime = 0;
		timerElement.val(curTime);
	});

	timerElement.keypress(function(eventObject){
		console.dir(eventObject.which);
	});
	timerElement = (eventObject.which);
}















