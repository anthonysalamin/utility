/*
 * PORTFOLIO | custom cursor v2
 * build 22.02.24 @23:03
 */
document.addEventListener("DOMContentLoaded", () => {
    console.log("PORTFOLIO | custom cursor v2");
	const targets = "a"; // [data-cursor]
	const color = {
		dot: "black",
		border: "black"
	};
	injectCursorCSS(color.dot, color.border);
	injectCursorHTML();
	initCursor(targets);
	trackAndHideCursor();
});

// cursor HTML
function injectCursorHTML() {
	const cursorHTML = `<div class=cursor><div class="cursor__inner cursor__inner--circle"></div><div class="cursor__inner cursor__inner--dot"></div></div>`;
	document.body.insertAdjacentHTML("beforeend", cursorHTML);
}

// cursor CSS
function injectCursorCSS(colorDot, colorBorder) {
	const cursorCSS = `<style>body{cursor:none}*,*::after,*::before{box-sizing:border-box;cursor:none !important}.cursor.hidden{display:none}.cursor__inner{z-index:999999;pointer-events:none;position:absolute;top:0;left:0;border-radius:50%}.cursor__inner--dot{width:6px;height:6px;background:${colorDot}}.cursor__inner--circle{width:20px;height:20px;border:1px solid ${colorBorder}}</style>`;
	document.head.insertAdjacentHTML("beforeend", cursorCSS);
}

// track cursor on view/out of view
function trackAndHideCursor() {
	const cursor = document.querySelector(`.cursor`);

	const handleMouseLeave = () => {
		const viewportWidth =
			window.innerWidth || document.documentElement.clientWidth;
		if (viewportWidth >= 768) {
			cursor.classList.add("hidden");
		}
	};

	const handleMouseEnter = () => {
		const viewportWidth =
			window.innerWidth || document.documentElement.clientWidth;
		if (viewportWidth >= 768) {
			cursor.classList.remove("hidden");
		}
	};

	const handleViewportChange = () => {
		const viewportWidth =
			window.innerWidth || document.documentElement.clientWidth;

		if (viewportWidth < 768) {
			cursor.classList.add("hidden");
		} else {
			cursor.classList.remove("hidden");
		}
	};

	document.body.addEventListener("mouseleave", handleMouseLeave);
	document.body.addEventListener("mouseenter", handleMouseEnter);
	window.addEventListener("resize", handleViewportChange);
	handleViewportChange();
}

// cursor animation
function initCursor(targets) {
	const lerp = (a, b, n) => (1 - n) * a + n * b;
	const body = document.body;
	const getMousePos = (e) => {
		let posx = 0;
		let posy = 0;
		if (!e) e = window.event;
		if (e.pageX || e.pageY) {
			posx = e.pageX;
			posy = e.pageY;
		} else if (e.clientX || e.clientY) {
			posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
		}
		return { x: posx, y: posy };
	};

	// Custom mouse cursor
	class CursorFx {
		constructor(el) {
			this.DOM = { el: el };
			this.DOM.dot = this.DOM.el.querySelector(".cursor__inner--dot");
			this.DOM.circle = this.DOM.el.querySelector(".cursor__inner--circle");
			this.bounds = {
				dot: this.DOM.dot.getBoundingClientRect(),
				circle: this.DOM.circle.getBoundingClientRect()
			};
			this.scale = 1;
			this.opacity = 1;
			this.mousePos = { x: 0, y: 0 };
			this.lastMousePos = { dot: { x: 0, y: 0 }, circle: { x: 0, y: 0 } };
			this.lastScale = 1;
			this.lastOpacity = 1;
			this.initEvents();
			requestAnimationFrame(() => this.render());
		}

		initEvents() {
			window.addEventListener(
				"mousemove",
				(ev) => (this.mousePos = getMousePos(ev))
			);
		}

		render() {
			this.lastMousePos.dot.x = lerp(
				this.lastMousePos.dot.x,
				this.mousePos.x - this.bounds.dot.width / 2,
				1
			);
			this.lastMousePos.dot.y = lerp(
				this.lastMousePos.dot.y,
				this.mousePos.y - this.bounds.dot.height / 2,
				1
			);
			this.lastMousePos.circle.x = lerp(
				this.lastMousePos.circle.x,
				this.mousePos.x - this.bounds.circle.width / 2,
				0.15
			);
			this.lastMousePos.circle.y = lerp(
				this.lastMousePos.circle.y,
				this.mousePos.y - this.bounds.circle.height / 2,
				0.15
			);
			this.lastScale = lerp(this.lastScale, this.scale, 0.15);
			this.lastOpacity = lerp(this.lastOpacity, this.opacity, 0.1);
			gsap.set(this.DOM.dot, {
				x: this.lastMousePos.dot.x,
				y: this.lastMousePos.dot.y
			});
			gsap.set(this.DOM.circle, {
				x: this.lastMousePos.circle.x,
				y: this.lastMousePos.circle.y,
				scale: this.lastScale,
				opacity: this.lastOpacity
			});
			requestAnimationFrame(() => this.render());
		}

		enter() {
			this.scale = 2.7;
		}

		leave() {
			this.scale = 1;
		}

		click() {
			this.lastScale = 1;
			this.lastOpacity = 0;
		}
	}

	const cursor = new CursorFx(document.querySelector(".cursor"));

	// Custom cursor changes state when hovering on targets
	[...document.querySelectorAll(targets)].forEach((target) => {
		target.addEventListener("mouseenter", () => cursor.enter());
		target.addEventListener("mouseleave", () => cursor.leave());
		target.addEventListener("click", () => cursor.click());
	});
} // end initCursor()