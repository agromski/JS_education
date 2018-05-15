// page init
$(function(){
	tabs();
});


function tabs() {
	var link_holder = $('.tabset');
	var links = link_holder.find('a');
	var activeTabLink;
	
	// цикл each

	links.each(function (index, item) {
		var link = $(item);
		var value = link.attr('href');
		var tab = $(value);
		item.tab = tab;
		if ( link.is('.active') ) {
			activeTabLink = item;
		} else{
			tab.css('display', 'none');
		};
		link.on('click', clickFn);
	});

	// цикл for

	/*for (var i = 0; i < links.length; i++) {
		var link = $(links[i]);
		var value = link.attr('href');
		var tab = $(value); // найденный таб
		links[i].tab = tab;
		if ( link.is('.active') ) {
			activeTabLink = links[i];
		} else{
			tab.css('display', 'none');
		};

		link.on('click', clickFn);
	};*/

	// console.dir(links);
	function clickFn(e) {
		e.preventDefault();
		$(activeTabLink).removeClass('active');
		activeTabLink.tab.css('display', 'none');
		$(this).addClass('active');
		this.tab.css('display', 'block');
		activeTabLink = this;
	}

}