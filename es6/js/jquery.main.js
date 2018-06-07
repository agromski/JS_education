document.addEventListener('DOMContentLoaded', function () {
	popupOnClick();
}, false);

function popupOnClick() {
	const opener = document.querySelectorAll('.btn');

	opener.forEach( (item, index) => {
		item.addEventListener('click', function(e) {
			e.preventDefault();
			addClass(this.dataset.target);
		});
	});


	const addClass = (data) => {
		document.getElementById(data).classList.toggle('active')
	};

};
