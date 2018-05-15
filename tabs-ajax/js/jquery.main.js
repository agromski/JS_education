// page init
$(function(){
	tabs();
});


function tabs() {
	var link_holder = $('.tabset');
	var links = link_holder.find('a');
	var tabHolder = $('.tab-content');
	var spinner = $('<div class="preloader"><img src="./images/spinner.gif"></div>')
	var activeTabLink;
	
	links.each(function (index, item) {
		var link = $(item);
		var value = link.attr('href');
		item.url = value;
		if ( link.is('.active') ) {
			activeTabLink = item;
			$.get( activeTabLink.url, function( data ) {
				tabHolder.html( data );
			});
		};
		link.on('click', clickFn);
	});


	// console.dir(links);
	function clickFn(e) {
		e.preventDefault();
		var that = this;
		tabHolder.html(spinner);
		$.get( 
			that.url,
			function( data ) {
				tabHolder.html( data );
				$(activeTabLink).removeClass('active');
				$(that).addClass('active');
				activeTabLink = that;
			}
		);
		console.log('click');
	}

}