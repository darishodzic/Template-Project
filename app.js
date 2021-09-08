let controller;
let slideScene;
let pageScene;
const mouse =
	document.querySelector(".cursor");
const mouseTxt =
	mouse.querySelector("span");
const burger =
	document.querySelector(".burger");

//even listener

window.addEventListener(
	"mousemove",
	cursor
);

window.addEventListener(
	"mouseover",
	activeCursor
);

burger.addEventListener(
	"click",
	navToggle
);

//function

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
		gsap.to(".title-swipe", 1, {
			y: "0%",
		});
		mouseTxt.innerText = "Tap";
	} else {
		mouse.classList.remove(
			"explore-active"
		);
		mouseTxt.innerText = "";
		gsap.to(".title-swipe", 1, {
			y: "100%",
		});
	}
}

function navToggle(e) {
	if (
		!e.target.classList.contains(
			"active"
		)
	) {
		e.target.classList.add("active");
		gsap.to(".line1", 0.5, {
			rotate: "45",
			y: 5,
			background: "black",
		});
		gsap.to(".line2", 0.5, {
			rotate: "-45",
			y: -5,
			background: "black",
		});
		gsap.to("#logo", 1, {
			color: "black ",
		});
		gsap.to(".nav-bar", 1, {
			clipPath:
				"circle(2500px at 100% -10%)",
		});
		document.body.classList.add("hide");
	} else {
		e.target.classList.remove("active");
		gsap.to(".line1", 0.5, {
			rotate: "0",
			y: 0,
			background: "white",
		});
		gsap.to(".line2", 0.5, {
			rotate: "0",
			y: 0,
			background: "white",
		});
		gsap.to("#logo", 1, {
			color: "white ",
		});
		gsap.to(".nav-bar", 1, {
			clipPath:
				"circle(50px at 100% -10%)",
		});
		document.body.classList.remove(
			"hide"
		);
	}
}

//Barba page transition

barba.init({
	views: [
		{
			namespace: "home",
			beforeEnter() {
				animateSlides();
			},
			beforeLeave() {
				slideScene.destroy();
				pageScene.destroy();
				controller.destroy();
			},
		},
		{
			namespace: "fashion",
		},
	],
	transition: [
		{
			leave({ current, next }) {
				let done = this.async();

				//animation
				const tl = gsap.timeline({
					defaults: {
						ease: "power2.inOut",
					},
				});
				tl.fromTo(
					current.container,
					1,
					{ opacity: 1 },
					{
						opacity: 0,
						onComplete: done,
					}
				);
			},
			enter({ current, next }) {
				let done = this.async();
				//animation
				const tl = gsap.timeline({
					defaults: {
						ease: "power2.inOut",
					},
				});
				tl.fromTo(
					next.container,
					1,
					{ opacity: 0 },
					{
						opacity: 1,
						onComplete: done,
					}
				);
			},
		},
	],
});
