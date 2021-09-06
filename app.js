let controller;
let slideScene;
let pageScene;
let mouse =
	document.querySelector(".cursor");
let mouseTxt =
	mouse.querySelector("span");
window.addEventListener(
	"mousemove",
	cursor
);

window.addEventListener(
	"mouseover",
	activeCursor
);

function animateSlides() {
	//Init controller
	controller =
		new ScrollMagic.Controller();
	//select somthings
	const sliders =
		document.querySelectorAll(".slide");
	const nav = document.querySelector(
		".nav-header"
	);
	//Loop over each slide
	sliders.forEach(
		(slide, index, slides) => {
			const revealImage =
				slide.querySelector(
					".reveal-img"
				);
			const img =
				slide.querySelector("img");
			const revealText =
				slide.querySelector(
					".reveal-text"
				);
			//GSAP
			const slideTl = gsap.timeline({
				defaults: {
					duration: 1,
					ease: "power2.inOut",
				},
			});
			slideTl.fromTo(
				revealImage,
				{ x: "0%" },
				{ x: "100%" }
			);
			slideTl.fromTo(
				img,
				{ scale: 2 },
				{ scale: 1 },
				"-=1"
			);
			slideTl.fromTo(
				revealText,
				{ x: "0%" },
				{ x: "100%" },
				"-=0.75  "
			);
			slideTl.fromTo(
				nav,
				{ y: "-100%" },
				{ y: "0%" },
				"-=0.5"
			);
			//Create Scene
			slideScene =
				new ScrollMagic.Scene({
					triggerElement: slide,
					triggerHook: 0.25,
					reverse: false,
				})
					.setTween(slideTl)
					.addIndicators()
					.addTo(controller);
			//New animation
			const pageTl = gsap.timeline();
			let nextSlide =
				slides.length - 1 === index
					? "end"
					: slides[index + 1];
			pageTl.fromTo(
				nextSlide,
				{ y: "0%" },
				{ y: "50%" }
			);
			pageTl.fromTo(
				slide,
				{ opacity: 1, scale: 1 },
				{ opacity: 0, scale: 0.5 }
			);
			pageTl.fromTo(
				nextSlide,
				{ y: "50%" },
				{ y: "0%" },
				"-=0.5"
			);
			//create new scene
			pageScene = new ScrollMagic.Scene(
				{
					triggerElement: slide,
					triggerHook: 0,
					duration: "100%",
				}
			)
				.addIndicators({
					colorStart: "white",
					colorTrigger: "yellow",
					name: "page",
					indent: "200",
				})
				.setPin(slide, {
					pushFollowers: false,
				})
				.setTween(pageTl)
				.addTo(controller);
		}
	);
}

function cursor(e) {
	mouse.style.top = e.pageY + "px";
	mouse.style.left = e.pageX + "px";
}

function activeCursor(e) {
	const item = e.target;
	if (
		item.id === "logo" ||
		item.classList.contains("burger")
	) {
		mouse.classList.add("nav-active");
	} else {
		mouse.classList.remove(
			"nav-active"
		);
	}
	if (
		item.classList.contains("explore")
	) {
		mouse.classList.add(
			"explore-active"
		);
		mouseTxt.innerText = "Tap";
	} else {
		mouse.classList.remove(
			"explore-active"
		);
		mouseTxt.innerText = "";
	}
}

animateSlides();
