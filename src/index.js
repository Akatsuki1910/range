{
	//Create Element
	const elm = document.getElementById("range");

	const grooveElm = document.createElement("div");
	grooveElm.setAttribute("id", "rangeGroove");
	grooveElm.setAttribute("class", "range-groove");
	elm.appendChild(grooveElm);

	const grooveBeforeElm = document.createElement("div");
	grooveBeforeElm.setAttribute("id", "rangeGrooveBefore");
	grooveBeforeElm.setAttribute("class", "range-groove-before");
	grooveElm.appendChild(grooveBeforeElm);

	const knobElm = document.createElement("div");
	knobElm.setAttribute("id", "rangeKnob");
	knobElm.setAttribute("class", "range-knob");
	elm.appendChild(knobElm);

	//def
	const gEl = returnElm(document.getElementById("rangeGroove"));
	let gwidth = returnCssValue(gEl.width, "px");
	const gfEl = returnElm(document.getElementById("rangeGrooveBefore"));
	let gfwidth = returnCssValue(gfEl.width, "px");
	const kEl = returnElm(document.getElementById("rangeKnob"));
	let kwidth = returnCssValue(kEl.width, "px");

	//rotate
	const rotateFlg = false;

	//first value
	const min = +elm.getAttribute("data-min") || 0;
	const max = +elm.getAttribute("data-max") || 100;
	const value = +elm.getAttribute("data-value") || 50;
	const minValue = kwidth / 2;
	const maxValue = gwidth - minValue * 2;
	knobElm.style.left = ((maxValue) * Math.min(1, (value / (max - min)))) + minValue + "px";
	grooveBeforeElm.style.width = returnCssValue(kEl.left, "px") + "px";

	//mouse over
	const defBgColor = knobElm.style.backgroundColor;
	const defGrooveColor = grooveElm.style.backgroundColor;
	const defGrooveBorderColor = grooveElm.style.borderColor;
	knobElm.onmouseenter = () => {
		knobElm.style.backgroundColor = "rgb(0,92,200)";
		colorOver();
	}
	knobElm.onmouseleave = () => {
		knobElm.style.backgroundColor = defBgColor;
		colorOverOut();
	}
	grooveBeforeElm.onmouseenter = () => colorOver();
	grooveBeforeElm.onmouseleave = () => colorOverOut();
	grooveElm.onmouseenter = () => colorOver();
	grooveElm.onmouseleave = () => colorOverOut();


	function colorOver() {
		grooveBeforeElm.style.backgroundColor = "rgb(0,92,200)";
		grooveElm.style.backgroundColor = "rgb(229,229,229)";
		grooveElm.style.borderColor = "rgb(154,154,154)";
	}

	function colorOverOut() {
		grooveBeforeElm.style.backgroundColor = defBgColor;
		grooveElm.style.backgroundColor = defGrooveColor;
		grooveElm.style.borderColor = defGrooveBorderColor;
	}

	function colorClick() {
		knobElm.style.backgroundColor = "rgb(55,147,255)";
		grooveBeforeElm.style.backgroundColor = "rgb(55,147,255)";
		grooveElm.style.backgroundColor = "rgb(245,245,245)";
		grooveElm.style.borderColor = "rgb(193,193,193)";
	}

	function colorClickOut() {
		knobElm.style.backgroundColor = defBgColor;
		colorOverOut();
	}

	//mouse click
	let grooveClick = false;
	let mousePosimem = 0;

	knobElm.onmousedown = (e) => {
		grooveClick = true;
		mousePosimem = (rotateFlg) ? e.clientY : e.clientX;
		colorClick();
	}

	gfwidth = returnCssValue(gfEl.width, "px");
	kwidth = returnCssValue(kEl.width, "px");
	let knobLeft = gfwidth;
	window.onmousemove = (e) => {
		if (grooveClick) {
			const kwidth = returnCssValue(kEl.width, "px");
			const posi = (rotateFlg) ? (-e.clientY + mousePosimem) : (e.clientX - mousePosimem);
			knobElm.style.left = (knobLeft + posi) + "px";
			if (returnCssValue(kEl.left, "px") + kwidth / 2 > gwidth) {
				knobElm.style.left = (gwidth - kwidth / 2) + "px";
			} else if (returnCssValue(kEl.left, "px") < kwidth / 2) {
				knobElm.style.left = kwidth / 2 + "px";
			}
			grooveBeforeElm.style.width = returnCssValue(kEl.left, "px") + "px";

			colorClick();
			//return value
			document.getElementById("value").innerText = returnValue();
		}
	}

	window.onmouseup = () => {
		grooveClick = false;
		knobLeft = returnCssValue(kEl.left, "px");
		colorClickOut();
	}
	window.onmouseleave = () => {
		grooveClick = false;
		knobLeft = returnCssValue(kEl.left, "px");
		colorClickOut();
	}

	function returnValue() {
		const gfwidth = returnCssValue(gfEl.width, "px");
		return ((gfwidth - minValue) / maxValue) * (max - min) + min;
	}

	function returnElm(element) {
		return element.currentStyle || document.defaultView.getComputedStyle(element, '');
	}

	function returnCssValue(style, unit) {
		const regexp = new RegExp(unit, 'g');
		return +(style.replace(regexp, ""));
	}

}