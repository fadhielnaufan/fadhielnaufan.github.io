const cursorGlow = document.querySelector(".cursor-glow");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const revealElements = document.querySelectorAll(".reveal");
const tiltCards = document.querySelectorAll(".tilt-card");
const magneticButtons = document.querySelectorAll(".magnetic");

window.addEventListener("pointermove", (event) => {
	cursorGlow.style.left = `${event.clientX}px`;
	cursorGlow.style.top = `${event.clientY}px`;
});

navToggle.addEventListener("click", () => {
	const isOpen = navLinks.classList.toggle("open");
	navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
	link.addEventListener("click", () => {
		navLinks.classList.remove("open");
		navToggle.setAttribute("aria-expanded", "false");
	});
});

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
				observer.unobserve(entry.target);
			}
		});
	},
	{ threshold: 0.18 },
);

for (const element of revealElements) {
	observer.observe(element);
}

tiltCards.forEach((card) => {
	card.addEventListener("pointermove", (event) => {
		const rect = card.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		const rotateX = (y / rect.height - 0.5) * -10;
		const rotateY = (x / rect.width - 0.5) * 10;

		card.style.setProperty("--mx", `${x}px`);
		card.style.setProperty("--my", `${y}px`);
		card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
	});

	card.addEventListener("pointerleave", () => {
		card.style.transform =
			"perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
	});
});

magneticButtons.forEach((button) => {
	button.addEventListener("pointermove", (event) => {
		const rect = button.getBoundingClientRect();
		const x = event.clientX - rect.left - rect.width / 2;
		const y = event.clientY - rect.top - rect.height / 2;
		button.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
	});

	button.addEventListener("pointerleave", () => {
		button.style.transform = "translate(0, 0)";
	});
});
