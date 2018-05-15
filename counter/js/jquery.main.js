// page init
$(function(){
	timer('.timer-block');
	timer2('.timer-block2');
});

// timer
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
					clearInterval(runCounter);
					isRunning = false;
				}
			}, 1000);
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

	timerElement.change(function() {
		curTime = timerElement.val();
	});
}



// timer2
function timer2 (timerHolder) {
	var timerContainer = $(timerHolder);
	var timerElement = timerContainer.find('input');
	var btnMin = timerContainer.find('.btn-min');
	var btnSec = timerContainer.find('.btn-sec');
	var btnStartPause = timerContainer.find('.btn-start');
	var btnReset = timerContainer.find('.btn-reset');
	var m = 0;
	var s = 0;
	setFormatTime();
	var isRunning = false;
	var runCounter;

	btnMin.on('click', function(e){
		e.preventDefault();
		++m;
		setFormatTime();
	});

	btnSec.on('click', function(e){
		e.preventDefault();
		if (s < 59) {
			++s;
			setFormatTime();
		} else{
			s = 0;
			++m;
			setFormatTime();
		};
	});

	btnStartPause.on('click', function(e){
		e.preventDefault();
		if (!isRunning) {
			runCounter = setInterval(function(){
				if (s !=0) {
					--s;
					setFormatTime();
					isRunning = true;
				} else {
					if (m !=0) {
						--m;
						s = 59;
						setFormatTime();
					} else {
						clearInterval(runCounter);
						isRunning = false;
					}
				}
			}, 500);
		} else {
			clearInterval(runCounter);
			isRunning = false;
		};
	});

	function setFormatTime() {
		var mm = (m < 10) ? '0' + m : m;
		var ss = (s < 10) ? '0' + s : s;
		var str = mm + ':' + ss;
		timerElement.val(str);
	}

	btnReset.on('click', function(e){
		e.preventDefault();
		m = 0;
		s = 0;
		setFormatTime();
		clearInterval(runCounter);
		isRunning = false;
	});

}















