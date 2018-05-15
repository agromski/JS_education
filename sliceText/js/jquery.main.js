// page init
$(function(){
	sliceText('.description p', '20');
});


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