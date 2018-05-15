// page init
$(function(){
	get();
	get();
	get();
});


var toDoList = [{
		title: "Выгулять кота",
		done: "false",
	},
	{
		title: "Постирать",
		done: "true",
	},
	{
		title: "Вынести мусор",
		done: "true",
	},
	{
		title: "Попылесосить",
		done: "false",
	},
	{
		title: "Убрать тёплые вещи",
		done: "false",
}];


function get() {
	$('.my-list').html('');
	$(toDoList).each(function (index, item) {
		var definition = item.title;
		var li = $('<li>' + definition + '</li>'+'<li>' + definition + '</li>');
		$('.my-list').append(li);
	});

};

