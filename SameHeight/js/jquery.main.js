// page init
$(function(){
	sameHeight('.sameheight', '.block');
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















