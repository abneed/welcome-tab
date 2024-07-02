const changeElementDisplay = (elems, display = 'none') => {
	for (let i = 0; i < elems.length; i++) {
		elems[i].style.display = display;
	}
};

(() => {
	const bgElem = document.getElementById("bg");
	const timeElem = document.getElementById("time");
	const welcomeElem = document.getElementById("welcome");
	const buttonElem = document.getElementById("submit");
	const clearElem = document.getElementById("clear");
	const inputElem = document.getElementById("name");

	bgElem.style.background = `url(../images/bg-${Math.floor(Math.random() * 4) + 1}.jpg)`;

	const setTime = () => {
		const current = new Date();
		const h = current.getHours();
		const m = current.getMinutes();

		timeElem.innerHTML = `${h % 12 || 12}:${m < 10 ? `0${m}` : m}`;

		setTimeout(() => {
			setTime();
		}, 500);
	};

	setTime();

	chrome.storage.sync.get(['name'], (result) => {
		if (result.name) {
			welcomeElem.innerHTML = `Hello, ${result.name}`;
			const hiddenElems = document.getElementsByClassName("no-name");
			changeElementDisplay(hiddenElems);
		} else {
			const hiddenElems = document.getElementsByClassName("has-name");
			changeElementDisplay(hiddenElems);
		}
	});

	buttonElem.addEventListener('click', () => {
		if (inputElem.value.length) {
			chrome.storage.sync.set({ name: inputElem.value }, () => {
				welcomeElem.innerHTML = `Hello, ${inputElem.value}`;
				const hiddenElems = document.getElementsByClassName("no-name");
				const visibleElems = document.getElementsByClassName("has-name");
				changeElementDisplay(hiddenElems);
				changeElementDisplay(visibleElems, 'block');
			});
		}
	});

	clearElem.addEventListener('click', () => {
		chrome.storage.sync.remove(['name'], () => {
			welcomeElem.innerHTML = "Hello, what is your name?";
			const hiddenElems = document.getElementsByClassName("has-name");
			const visibleElems = document.getElementsByClassName("no-name");
			changeElementDisplay(hiddenElems);
			changeElementDisplay(visibleElems, 'inline-block');
		});
	});
})();