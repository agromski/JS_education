// page init
$(function(){
	/*$(window).on('scroll', function() {
		console.log(this.scrollY)
	});*/
	sticky();
});


function sticky() {
	var parent = $('body');
	var stickyBlock = $('#header');
	var stickyBlockHeight = stickyBlock.innerHeight();
	console.dir(stickyBlockHeight);
	$(window).on('scroll', function() {
		currentPosition=this.scrollY;
		console.dir(currentPosition);
		if (currentPosition >= stickyBlockHeight) {
			parent.addClass('hide');
			setTimeout(function(){
				parent.addClass('fixed');
			}, 500);
		} else if (currentPosition == 0) {
			parent.removeClass('fixed');
			parent.removeClass('hide');
		};
	});
}
