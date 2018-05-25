// page init
$(function(){
	toDoList();
});


/*var array = [{
		title: "Выгулять кота",
		done: false,
	},
	{
		title: "Постирать",
		done: false,
	},
	{
		title: "Вынести мусор",
		done: true,
	},
	{
		title: "Попылесосить",
		done: true,
	},
	{
		title: "Убрать тёплые вещи",
		done: true,
}];*/



function toDoList() {
	var array = JSON.parse(localStorage.getItem('array')) || [];
	var form = $('.add-form');
	var input = form.find('input');
	var listContainer = $('.my-list');
	var total = $('.total-value');
	var subtotal = $('.subtotal-value');
	var btnHide = $('.btn-hide');
	var newArray = array.slice(0);
	var hideCompletedFlag = false;
	var btnCheckAll = $('.check-all');
	var defText = $('.default-text');

	renderList();

	form.on('submit', function(e){
		e.preventDefault();
		if (!input.val()) return;
		addItem(input.val());
		form[0].reset();
	});

	$(listContainer).on('click', '.btn-delete', function(e){
		e.preventDefault();
		removeItem(this.dataset.index);
	});

	$(listContainer).on('click', '.checkbox', function(){
		editValue(this.dataset.index);
	});

	btnHide.on('click', function() {
		toogleFlag();
	});

	btnCheckAll.on('click', function() {
		checkAll();
	});

	// renderList
	function renderList() {
		var list = '';

		if (hideCompletedFlag) {
			newArray = array.filter(function(el) { return !el.done; });
			btnHide.html('show completed');
		} else {
			newArray = array;
			btnHide.html('hide completed');
		};

		$(newArray).each(function (index, item) {
			var checkbox = (item.done) ? '<span class="checkbox" data-index="' + index + '"><i class="far fa-check-square"></i></span>' : '<span class="checkbox" data-index="' + index + '"><i class="far fa-square"></i></span>';
			list = list + '<li>' + checkbox + item.title + '<a href="#" data-index="' + index + '" class="btn-delete"><i class="fa fa-times"></i></a>' + '</li>';
		});

		total.html(array.length);
		subtotal.html(array.filter(function(el) { return !el.done; }).length);

		listContainer.html(list);

		if (array.length == 0) listContainer.html('<li class="default-text">No todo</li>');

		localStorage.setItem('array', JSON.stringify(array));
	};

	// addItem
	function addItem(value) {
		var o = {
			title: value,
			done: false
		};
		array.push(o);
		renderList();
	};

	//removeItem
	function removeItem(index) {
		array.splice(index, 1);
		renderList();
	};

	// editValue
	function editValue(index) {
		array[index].done=!array[index].done;
		renderList();
	};

	function toogleFlag() {
		hideCompletedFlag = !hideCompletedFlag;
		renderList();
	};

	function checkAll() {
		$(array).each(function (index, item) {
			item.done = true;
		});
		renderList();
	};

};







