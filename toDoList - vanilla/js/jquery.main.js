// page init
document.addEventListener('DOMContentLoaded', function() {
	toDoList();
}, false);


/* toDoList */

function toDoList() {


	// VARIABLES
	let array = JSON.parse(localStorage.getItem('array')) || [];
	const list = document.querySelector('.my-list');
	const form = document.querySelector('.add-form');
	const checkAllButton = document.querySelector('.check-all');
	const hideButton = document.querySelector('.btn-hide');
	const totalValue = document.querySelector('.total-value');
	const subTotalValue = document.querySelector('.subtotal-value');
	let hideCompletedFlag = false;

	// LOGIC

	renderList();
	const btnDelete = list.querySelector('.btn-delete');

	form.addEventListener('submit', function(e) {
			e.preventDefault();
			addItem(e.target[0].value);
			this.reset();
	});

	list.addEventListener('click', function(e) {
		if (e.target.classList.contains('btn-delete')) {
			removeItem(e.target.dataset.index);
		};
	});
	

	list.addEventListener('click', function(e) {
		if (e.target.classList.contains('checkbox')) {
			editValue(e.target.dataset.index);
		};
	});

	checkAllButton.addEventListener('click', function(e) {
		e.preventDefault();
		checkAll();
	})

	hideButton.addEventListener('click', function(e) {
		e.preventDefault();
		toogleFlag();
	})



	// METHODS

	// renderList
	function renderList() {

		let newArray;
		list.innerHTML = '';
		const fragment = document.createDocumentFragment();

		if (hideCompletedFlag) {
			newArray = array.filter( obj => !obj.done );
		} else {
			newArray = array;
		}

		newArray.forEach( (item, index) => {
			const li = document.createElement('li');
			const className = (item.done) ? 'fa-check-square' : 'fa-square';
			li.innerHTML = `<i class="checkbox far ${className}" data-index="${index}"></i> ${item.title} <span class="btn-delete fa fa-times" data-index="${index}"></span>`;
			fragment.append(li);
		});

		list.append(fragment);

		totalValue.innerHTML = array.length;

		subTotalValue.innerHTML = array.filter( obj => !obj.done ).length;

		localStorage.setItem('array', JSON.stringify(array));

	};

	// addItem
	function addItem(value) {
		const o = {
			title: value,
			done: false
		}
		array.push(o);
		renderList();
	}

	// removeItem
	function removeItem(index) {
		array.splice(index, 1);
		renderList();
	}

	// editValue
	function editValue(index) {
		if (array[index].done) {
			array[index].done = false;
		} else {
			array[index].done = true;
		}
		renderList();
	}

	// checkAll
	function checkAll() {
		array.forEach( (item, index) => {
			item.done = true;
		});
		renderList();
	}

	// toogleFlag
	function toogleFlag() {
		hideCompletedFlag = !hideCompletedFlag;
		renderList();
	}


}









