/* ==========================================================================
   Cabaret Barber Shop & Esthétique — Scripts
   ========================================================================== */

(function () {
  "use strict";

  /* --- Menu mobile --- */
  var toggle = document.querySelector(".nav-toggle");
  var navList = document.querySelector(".nav-list");
  var navContact = document.querySelector(".nav-contact");

  if (toggle && navList && navContact) {
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", !expanded);
      toggle.classList.toggle("open");
      navList.classList.toggle("open");
      navContact.classList.toggle("open");
    });

    // Fermer le menu en cliquant sur un lien
    document.querySelectorAll(".nav-link").forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.setAttribute("aria-expanded", "false");
        toggle.classList.remove("open");
        navList.classList.remove("open");
        navContact.classList.remove("open");
      });
    });
  }

  /* --- Formulaire de contact (démo — affiche un message) --- */
  var form = document.getElementById("contact-form");
  var message = document.getElementById("form-message");
  var submitBtn = document.getElementById("submit-btn");

  if (form && message && submitBtn) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var btnText = submitBtn.textContent;
      submitBtn.textContent = "Envoi en cours...";
      submitBtn.disabled = true;
      message.textContent = "";
      message.style.color = "";

      // Simule un envoi (à brancher sur un vrai backend ou Formspree)
      setTimeout(function () {
        message.textContent =
          "Merci ! Votre demande a bien été envoyée. Nous vous recontacterons rapidement par téléphone ou WhatsApp.";
        message.style.color = "#1e7e34";
        form.reset();
        submitBtn.textContent = btnText;
        submitBtn.disabled = false;
      }, 1200);
    });
  }

  /* --- Mise à jour automatique de l'année dans le footer --- */
  var yearEl = document.querySelector(".footer-bottom p");
  if (yearEl) {
    var now = new Date().getFullYear();
    if (!yearEl.textContent.includes(String(now))) {
      yearEl.textContent = "© " + now + " Cabaret Barber Shop & Esthétique — Casablanca. Tous droits réservés.";
    }
  }

  /* --- Sticky header au scroll --- */
  var header = document.getElementById("header");
  var lastScroll = 0;
  window.addEventListener("scroll", function () {
    var current = window.pageYOffset;
    if (current > 100) {
      header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
    } else {
      header.style.boxShadow = "none";
    }
    lastScroll = current;
  });
})();
