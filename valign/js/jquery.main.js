// page init
$(function(){
	valign('.valign', 'img');
});


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
