const nav = document.getElementById("nav");
const toggle = document.getElementById("menuToggle");
if (toggle) {
  toggle.addEventListener("click", () => nav.classList.toggle("open"));
}
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const year = document.getElementById("year");
if (year) year.textContent = String(new Date().getFullYear());

const params = new URLSearchParams(window.location.search);

const status = document.getElementById("formStatus");
if (status && params.get("submitted") === "true") {
  status.textContent = "Thank you! Your inquiry has been sent to Katelyn.";
}

const reviewStatus = document.getElementById("reviewStatus");
if (reviewStatus && params.get("review-submitted") === "true") {
  reviewStatus.textContent = "Thank you! Your review has been sent to Katelyn.";
}
