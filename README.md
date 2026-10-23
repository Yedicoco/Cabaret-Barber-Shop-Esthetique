# Cabaret Barber Shop & Esthétique — CUT & LOOK

Site vitrine du salon de coiffure et de beauté situé à Charaf, Casablanca
(Résidence Oum Rabii, boulevard Moulay Thami).

- **Site en production :** https://cabaretshopesthetique.vercel.app/
- **Horaires :** 7j/7, 10h—22h
- **Téléphone :** +212 775 048 227 — **WhatsApp :** +212 632 827 468

## Stack

Site statique sans framework ni build : HTML, CSS et JavaScript natifs.
Hébergement Vercel. Aucune dépendance externe, aucun cookie par défaut.

## Pages

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil |
| `services.html` | Hub des prestations |
| `coiffure-femme-casablanca.html` | Coiffure femme |
| `barber-shop-homme-casablanca.html` | Barber shop homme |
| `tresses-africaines-casablanca.html` | Tresses africaines |
| `dreadlocks-microlocks-casablanca.html` | Dreadlocks & microlocks |
| `onglerie-manucure-casablanca.html` | Onglerie |
| `soins-visage-casablanca.html` | Soins du visage |
| `about.html` | Le salon |
| `contact.html` | Contact, formulaire et itinéraire |
| `404.html` | Page d'erreur personnalisée |

## SEO et mesure

- Audit complet, décisions et plan d'action : **[README-SEO.md](README-SEO.md)**
- `robots.txt` et `sitemap.xml` à la racine — à maintenir à jour à chaque nouvelle page.
- Données structurées JSON-LD (`BeautySalon`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service`, `FAQPage`).
- Mesure des conversions : `assets/js/tracking.js` (événements `whatsapp_click`, `phone_click`, `directions_click`, `booking_request_prepared`).

## Modifier le site

1. Modifier les fichiers HTML/CSS concernés.
2. Mettre à jour `sitemap.xml` si une page est ajoutée ou renommée.
3. Mettre à jour le JSON-LD si le nom, l'adresse, le téléphone ou les horaires changent — **les mêmes informations doivent être identiques sur la fiche Google Business Profile**.
4. Pousser sur `main` : Vercel redéploie automatiquement.

## Règles de contenu

- Ne jamais publier un prix, un horaire, une note ou un avis non confirmés par le gérant.
- Les numéros de téléphone et de WhatsApp affichés doivent être actifs.
- Les visuels actuels sont des illustrations : les remplacer progressivement par de vraies photos du salon.
