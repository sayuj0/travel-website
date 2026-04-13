const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click", () => {
    // Toggle mobile menu visibility
    document.body.classList.toggle("show-mobile-menu");
    });

    // Close menu when the close button is clicked
menuCloseButton.addEventListener("click", () => menuOpenButton.click());

// Initialize Swiper
const swiper = new Swiper('.slider-wrapper', {
  loop: true,
  grabCursor: true,
  spaceBetween: 25,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // Responsive breakpoints
  breakpoints: {
    0: {
        slidesPerView: 1,
    },
    768: {
        slidesPerView: 2,
    },
    1024: {
        slidesPerView: 3,
    }
    
  }
});

const contactForm = document.querySelector(".contact-form");
const formStatusMessage = document.querySelector("#form-success");

if (contactForm) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = contactForm.querySelector(".submit-button");
    const originalButtonText = submitButton ? submitButton.textContent : "";

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method || "POST",
        body: new FormData(contactForm),
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        contactForm.reset();
        if (formStatusMessage) {
          formStatusMessage.style.display = "block";
          formStatusMessage.style.color = "var(--secondary-color)";
          formStatusMessage.textContent = "Thanks! Your message has been sent.";
        }
      } else if (formStatusMessage) {
        formStatusMessage.style.display = "block";
        formStatusMessage.style.color = "#c0392b";
        formStatusMessage.textContent = "Something went wrong. Please try again.";
      }
    } catch (error) {
      if (formStatusMessage) {
        formStatusMessage.style.display = "block";
        formStatusMessage.style.color = "#c0392b";
        formStatusMessage.textContent = "Network error. Please try again.";
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText || "Submit";
      }
    }
  });
}
