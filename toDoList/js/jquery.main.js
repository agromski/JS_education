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
		done: true,
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



	function renderList() {
		var list = '';
		$(array).each(function (index, item) {
			var checkbox = (item.done) ? '<input type="checkbox" checked>' : '<input type="checkbox">';
			list = list + '<li>' + checkbox + item.title + '<a href="#" data-index="' + index + '" class="btn-delete">Delete</a>' + '</li>';
		});
		listContainer.html(list);
	};

	function addItem(value) {
		var o = {
			title: value,
			done: false
		};
		array.push(o);
		renderList();
	};

	function removeItem(index) {
		array.splice(index, 1);
		renderList();
	}

};







