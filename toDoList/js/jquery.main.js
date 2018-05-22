// page init
$(function(){
	toDoList();
});


var array = [{
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
}];

function toDoList() {

	var form = $('.add-form');
	var input = form.find('input');
	var listContainer = $('.my-list');
	var total = $('.total-value');
	var subtotal = $('.subtotal-value');


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
		reverseValue(this.dataset.index);
	});


	// renderList
	function renderList() {
		var list = '';
		$(array).each(function (index, item) {
			var checkbox = (item.done) ? '<span class="checkbox" data-index="' + index + '">[x]</span>' : '<span class="checkbox" data-index="' + index + '">[ ]</span>';
			list = list + '<li>' + checkbox + item.title + '<a href="#" data-index="' + index + '" class="btn-delete">Delete</a>' + '</li>';
		});
		listContainer.html(list);
		total.html(array.length);
		subtotal.html(array.filter(function(el) { return !el.done; }).length);
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

	// reverseValue
	function reverseValue(index) {
		array[index].done=!array[index].done;
		renderList();
	};

};







