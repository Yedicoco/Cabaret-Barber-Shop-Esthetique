/* CUT & LOOK — Navigation, rendez-vous WhatsApp et détails d’interface */
(function () {
  "use strict";

  var header = document.getElementById("header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");

  function closeMenu(returnFocus) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Ouvrir le menu");
    toggle.classList.remove("is-open");
    nav.classList.remove("is-open");
    if (returnFocus) toggle.focus();
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu(false);
      } else {
        toggle.setAttribute("aria-expanded", "true");
        toggle.setAttribute("aria-label", "Fermer le menu");
        toggle.classList.add("is-open");
        nav.classList.add("is-open");
      }
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { closeMenu(false); });
    });

    document.addEventListener("click", function (event) {
      if (nav.classList.contains("is-open") && header && !header.contains(event.target)) {
        closeMenu(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) closeMenu(true);
    });

    var desktopQuery = window.matchMedia("(min-width: 961px)");
    var handleDesktop = function (event) { if (event.matches) closeMenu(false); };
    if (desktopQuery.addEventListener) desktopQuery.addEventListener("change", handleDesktop);
    else if (desktopQuery.addListener) desktopQuery.addListener(handleDesktop);
  }

  /* Ombre discrète du header après défilement. */
  function updateHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 16);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* Année dynamique dans le pied de page. */
  var currentYear = String(new Date().getFullYear());
  document.querySelectorAll("[data-current-year]").forEach(function (element) {
    element.textContent = currentYear;
  });

  /* Empêche la sélection d’une date passée, sans décalage de fuseau horaire. */
  var dateInput = document.getElementById("date");
  if (dateInput) {
    var now = new Date();
    var localToday = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().split("T")[0];
    dateInput.min = localToday;
  }

  /* Le formulaire prépare un vrai message WhatsApp : aucune fausse confirmation d’envoi. */
  var form = document.getElementById("contact-form");
  var formMessage = document.getElementById("form-message");

  if (form && formMessage) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      formMessage.classList.remove("error");

      if (!form.checkValidity()) {
        formMessage.textContent = "Merci de compléter les champs obligatoires avant de continuer.";
        formMessage.classList.add("error");
        form.reportValidity();
        return;
      }

      var data = new FormData(form);
      var name = String(data.get("name") || "").trim();
      var phone = String(data.get("phone") || "").trim();
      var service = String(data.get("service") || "").trim();
      var date = String(data.get("date") || "").trim();
      var time = String(data.get("time") || "").trim();
      var details = String(data.get("message") || "").trim();
      var lines = [
        "Bonjour CUT & LOOK, je souhaite faire une demande de rendez-vous.",
        "",
        "Nom : " + name,
        "Téléphone : " + phone,
        "Prestation : " + service
      ];

      if (date) {
        var readableDate = new Intl.DateTimeFormat("fr-FR", {
          day: "2-digit", month: "long", year: "numeric"
        }).format(new Date(date + "T12:00:00"));
        lines.push("Date souhaitée : " + readableDate);
      }
      if (time) lines.push("Horaire souhaité : " + time);
      if (details) lines.push("Précisions : " + details);
      lines.push("", "Merci de me confirmer les disponibilités et le tarif.");

      var whatsappNumber = form.getAttribute("data-whatsapp") || "212632827468";
      var whatsappUrl = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(lines.join("\n"));

      formMessage.textContent = "Votre demande est prête. WhatsApp va s’ouvrir : vérifiez le message puis appuyez sur Envoyer.";
      var whatsappWindow = window.open(whatsappUrl, "_blank");
      if (whatsappWindow) {
        whatsappWindow.opener = null;
      } else {
        window.location.href = whatsappUrl;
      }
    });
  }
})();
