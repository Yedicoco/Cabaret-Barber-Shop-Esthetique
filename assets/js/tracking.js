/* CUT & LOOK — Cabaret Barber Shop & Esthétique
   Mesure des conversions sans collecte de données personnelles.
   Événements poussés dans dataLayer (GA4 / GTM) : whatsapp_click, phone_click,
   directions_click, booking_request_prepared.
   Aucun identifiant de suivi publicitaire n’est chargé ici. */
(function () {
  "use strict";

  var config = window.CUTLOOK_ANALYTICS || {};
  window.dataLayer = window.dataLayer || [];

  function tracker(eventName, params) {
    window.dataLayer.push(Object.assign({ event: eventName }, params || {}));
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, params || {});
    }
  }
  window.cutlookTrack = tracker;

  /* GA4 : chargé uniquement si un identifiant G-XXXX est renseigné
     dans la balise de configuration (voir README-SEO.md). */
  var ga4Id = typeof config.ga4Id === "string" ? config.ga4Id.trim() : "";
  if (/^G-[A-Z0-9]{6,}$/.test(ga4Id)) {
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", ga4Id, { send_page_view: true });
    var script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(ga4Id);
    document.head.appendChild(script);
  }

  function ctaLocation(link) {
    var explicit = link.getAttribute("data-cta");
    if (explicit) return explicit;
    var section = link.closest ? link.closest("section") : null;
    return section && section.id ? section.id : "";
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest ? event.target.closest("a") : null;
    if (!link) return;
    var href = link.getAttribute("href") || "";
    var label = (link.textContent || "").replace(/\s+/g, " ").trim().slice(0, 80);
    var params = { cta_location: ctaLocation(link), link_text: label };

    if (href.indexOf("wa.me") !== -1 || href.indexOf("api.whatsapp.com") !== -1) {
      tracker("whatsapp_click", params);
    } else if (href.indexOf("tel:") === 0) {
      tracker("phone_click", params);
    } else if (href.indexOf("google.com/maps") !== -1) {
      tracker("directions_click", params);
    }
  }, true);

  /* Le formulaire prépare un message WhatsApp : ce n’est pas encore une demande
     envoyée, l’événement est nommé en conséquence. */
  document.addEventListener("submit", function (event) {
    var form = event.target;
    if (!form || form.id !== "contact-form") return;
    var service = form.querySelector("#service");
    tracker("booking_request_prepared", {
      service: service && service.value ? service.value : "",
      has_date: Boolean(form.querySelector("#date") && form.querySelector("#date").value)
    });
  }, true);
})();
