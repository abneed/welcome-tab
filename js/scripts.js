(() => {
	const bgElem = document.getElementById("bg");
	const timeElem = document.getElementById("time");

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
})();