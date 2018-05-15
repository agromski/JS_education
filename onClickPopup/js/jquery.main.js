// page init
$(function(){
	onClickPopup_simple('.popup-block_simple', '.popup', '.btn');
	onClickPopup('.popup-block_with_add_class', '.btn');
});


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
