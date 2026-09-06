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

// Approved reviews shown publicly on the website.
// Add future approved submissions here after Katelyn reviews them.
const approvedReviews = [
  {
    name: "Emmy",
    rating: null,
    date: "",
    review:
      "From the moment we started chatting with her, we knew that Katelyn would likely be the one. Her gentle nature and kind spirit drew us right in. She has been a great communicator and made the entire process so easy and stress free. Katelyn is kind, patient, organized, and a great communicator. We couldn’t recommend working with Katelyn enough."
  }
];

const reviewShowcase = document.querySelector("#kind-words .quote-block");

if (reviewShowcase && approvedReviews.length) {
  const reviewStyles = document.createElement("style");
  reviewStyles.textContent = `
    #kind-words .quote-block.review-showcase {
      position: relative;
      overflow: hidden;
      padding: clamp(30px, 5vw, 60px);
    }
    .reviews-heading {
      display: flex;
      align-items: end;
      justify-content: space-between;
      gap: 24px;
      margin-bottom: 28px;
    }
    .reviews-heading h2 {
      color: #fff;
      margin: 0;
      max-width: 620px;
    }
    .reviews-rating-summary {
      flex: 0 0 auto;
      padding: 10px 14px;
      border: 1px solid rgba(255,255,255,.22);
      border-radius: 999px;
      background: rgba(255,255,255,.08);
      font-size: .86rem;
      color: rgba(255,255,255,.9);
      white-space: nowrap;
    }
    .reviews-rating-summary .stars,
    .review-stars {
      color: #f4d6a1;
      letter-spacing: .08em;
    }
    .review-viewport {
      overflow: hidden;
      border-radius: 22px;
    }
    .review-track {
      display: flex;
      transition: transform .45s cubic-bezier(.22,.61,.36,1);
      will-change: transform;
    }
    .review-card {
      flex: 0 0 100%;
      min-width: 100%;
      background: rgba(255,255,255,.96);
      color: var(--ink);
      border-radius: 22px;
      padding: clamp(24px, 4vw, 42px);
      box-shadow: 0 18px 45px rgba(0,0,0,.12);
    }
    .review-stars {
      font-size: 1rem;
      margin-bottom: 12px;
    }
    .review-card blockquote {
      color: var(--ink);
      font-size: clamp(1.25rem, 2.4vw, 1.85rem);
      line-height: 1.45;
    }
    .review-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      margin-top: 22px;
      color: var(--ink-soft);
      font-size: .92rem;
    }
    .review-name {
      color: var(--forest);
      font-weight: 600;
    }
    .review-controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 18px;
      margin-top: 20px;
    }
    .review-arrows {
      display: flex;
      gap: 8px;
    }
    .review-arrow {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,.25);
      background: rgba(255,255,255,.08);
      color: #fff;
      cursor: pointer;
      font-size: 1.2rem;
      transition: background .2s ease, transform .2s ease;
    }
    .review-arrow:hover {
      background: rgba(255,255,255,.16);
      transform: translateY(-1px);
    }
    .review-dots {
      display: flex;
      gap: 8px;
      align-items: center;
    }
    .review-dot {
      width: 8px;
      height: 8px;
      padding: 0;
      border: 0;
      border-radius: 50%;
      background: rgba(255,255,255,.38);
      cursor: pointer;
      transition: width .2s ease, border-radius .2s ease, background .2s ease;
    }
    .review-dot.active {
      width: 24px;
      border-radius: 999px;
      background: #fff;
    }
    .review-controls.single-review {
      display: none;
    }
    @media (max-width: 700px) {
      .reviews-heading {
        align-items: flex-start;
        flex-direction: column;
      }
      .reviews-rating-summary {
        white-space: normal;
      }
      .review-meta {
        align-items: flex-start;
        flex-direction: column;
        gap: 4px;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .review-track { transition: none; }
    }
  `;
  document.head.appendChild(reviewStyles);

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const cards = approvedReviews
    .map((review, index) => {
      const stars = review.rating
        ? `<div class="review-stars" aria-label="${review.rating} out of 5 stars">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</div>`
        : "";
      const date = review.date ? `<span>${escapeHtml(review.date)}</span>` : "";
      return `
        <article class="review-card" aria-label="Review ${index + 1} of ${approvedReviews.length}">
          ${stars}
          <blockquote>“${escapeHtml(review.review)}”</blockquote>
          <div class="review-meta">
            <span class="review-name">— ${escapeHtml(review.name)}</span>
            ${date}
          </div>
        </article>`;
    })
    .join("");

  const dots = approvedReviews
    .map(
      (_, index) =>
        `<button class="review-dot${index === 0 ? " active" : ""}" type="button" aria-label="Show review ${index + 1}" data-review-index="${index}"></button>`
    )
    .join("");

  reviewShowcase.classList.add("review-showcase");
  reviewShowcase.innerHTML = `
    <div class="reviews-heading">
      <div>
        <p class="section-kicker">Kind words</p>
        <h2>What couples say about working with Katelyn.</h2>
      </div>
      <div class="reviews-rating-summary" aria-label="Rated 5.0 on The Knot">
        <span class="stars">★★★★★</span> &nbsp;5.0 on The Knot
      </div>
    </div>
    <div class="review-viewport">
      <div class="review-track">${cards}</div>
    </div>
    <div class="review-controls${approvedReviews.length === 1 ? " single-review" : ""}">
      <div class="review-dots">${dots}</div>
      <div class="review-arrows">
        <button class="review-arrow review-prev" type="button" aria-label="Previous review">←</button>
        <button class="review-arrow review-next" type="button" aria-label="Next review">→</button>
      </div>
    </div>
  `;

  if (approvedReviews.length > 1) {
    const track = reviewShowcase.querySelector(".review-track");
    const dotButtons = [...reviewShowcase.querySelectorAll(".review-dot")];
    const prevButton = reviewShowcase.querySelector(".review-prev");
    const nextButton = reviewShowcase.querySelector(".review-next");
    let currentReview = 0;
    let autoAdvance;

    const showReview = (index) => {
      currentReview = (index + approvedReviews.length) % approvedReviews.length;
      track.style.transform = `translateX(-${currentReview * 100}%)`;
      dotButtons.forEach((dot, dotIndex) => {
        dot.classList.toggle("active", dotIndex === currentReview);
        dot.setAttribute("aria-current", dotIndex === currentReview ? "true" : "false");
      });
    };

    const startAutoAdvance = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      clearInterval(autoAdvance);
      autoAdvance = setInterval(() => showReview(currentReview + 1), 7000);
    };

    prevButton.addEventListener("click", () => {
      showReview(currentReview - 1);
      startAutoAdvance();
    });
    nextButton.addEventListener("click", () => {
      showReview(currentReview + 1);
      startAutoAdvance();
    });
    dotButtons.forEach((dot) => {
      dot.addEventListener("click", () => {
        showReview(Number(dot.dataset.reviewIndex));
        startAutoAdvance();
      });
    });

    reviewShowcase.addEventListener("mouseenter", () => clearInterval(autoAdvance));
    reviewShowcase.addEventListener("mouseleave", startAutoAdvance);
    reviewShowcase.addEventListener("focusin", () => clearInterval(autoAdvance));
    reviewShowcase.addEventListener("focusout", startAutoAdvance);

    showReview(0);
    startAutoAdvance();
  }
}
