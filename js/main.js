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

const form = document.getElementById("inquiryForm");
const status = document.getElementById("formStatus");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    const body = [
      `Hi Katelyn, we'd like to inquire about a ceremony.`,
      ``,
      `Names: ${data.names || ""}`,
      `Email: ${data.email || ""}`,
      `Phone: ${data.phone || ""}`,
      `Date: ${data.date || "TBD"}`,
      `Package: ${data.package || "Not sure yet"}`,
      `Venue / city: ${data.venue || ""}`,
      ``,
      data.message || ""
    ].join("\n");

    const sms = `sms:4436173483?&body=${encodeURIComponent(body)}`;
    const mail = `mailto:katelyncoverstreet@gmail.com?subject=${encodeURIComponent("Wedding inquiry from " + (data.names || "a couple"))}&body=${encodeURIComponent(body)}`;

    window.location.href = sms;
    setTimeout(() => {
      window.location.href = mail;
    }, 400);

    if (status) {
      status.textContent = "Opening a text and email so you can send this inquiry directly to Katelyn.";
    }
    form.reset();
  });
}
