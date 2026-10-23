# Audit & optimisation SEO — Cabaret Barber Shop & Esthétique

**Site audité :** https://cabaretshopesthetique.vercel.app/
**Dépôt :** `Yedicoco/Cabaret-Barber-Shop-Esthetique`
**Date de l'audit :** 23 octobre 2026
**Branche de travail :** `arena/64d96253-cabaret-barber-shop-esthetique`

---

## Résumé exécutif

Le site était **propre visuellement mais invisible pour Google local** : aucun `robots.txt`, aucun `sitemap.xml`, aucune balise `canonical`, un `H1` d'accueil sans le moindre mot-clé, huit prestations entassées sur une seule URL, et des données structurées partiellement invalides.

Les corrections appliquées portent sur :

| Chantier | Avant | Après |
|---|---|---|
| `robots.txt` + `sitemap.xml` | absents (404 confirmé) | présents, 10 URL déclarées |
| Balises `canonical` | 0 page | 11 pages |
| URL dédiées aux prestations | 0 | 6 pages distinctes |
| Open Graph | image relative, pas d'`og:url` | absolu, `og:url`, `og:image:alt`, Twitter Card |
| Données structurées | images relatives, incohérentes | graphe `BeautySalon` + `WebSite` + `WebPage` + `BreadcrumbList` + `Service` + `FAQPage` |
| Poids images accueil | ~1,9 Mo (JPEG) | WebP + `srcset` (~66 Ko sur mobile pour le visuel principal) |
| Contrastes WCAG AA | 5 échecs mesurés | 0 échec sur les textes porteurs d'information |
| Mesure des conversions | aucune | 4 événements (WhatsApp, appel, itinéraire, demande préparée) |
| 404 | page Vercel générique | page 404 aux couleurs du salon |

**Aucune position Google n'est garantie ni promise.** Ce qui est mesurable et vérifiable, c'est ce qui figure en section **H**.

---

## Méthode et limites de l'audit

### Ce qui a été réellement vérifié
- Lecture intégrale du code source (HTML, CSS, JS) du dépôt correspondant au site publié (titres et contenus identiques à la page servie).
- Récupération HTTP de la page d'accueil, de `robots.txt`, `sitemap.xml` et du fichier de vérification Google sur le domaine Vercel.
- Calculs objectifs : poids et dimensions réelles des images (lecture des en-têtes JPEG), ratios de contraste WCAG, longueur des balises, présence des attributs.
- Validation automatique de la structure HTML, du JSON-LD, des liens internes et des ancres.
- Serveur local : toutes les pages et ressources testées en HTTP 200.

### Ce qui n'a pas pu être vérifié (et pourquoi)
| Élément | Raison |
|---|---|
| En-têtes HTTP réels et redirections | l'accès réseau de cet environnement autorise `fetch_page` mais bloque `curl` vers Vercel ; seules les réponses de pages ont été lues |
| Core Web Vitals **terrain** (CrUX) | aucun accès à la Search Console ni à PageSpeed Insights API |
| Statut et catégories de la fiche Google Business Profile | nécessite un accès propriétaire au compte Google |
| Volume de recherche des mots-clés | aucun outil de données de volume (Ahrefs, Semrush, Keyword Planner) accessible |
| Analyse concurrentielle SERP | non réalisée ; **aucune donnée concurrente n'est citée dans ce rapport** |
| Classements actuels du site | non accessibles sans Search Console |
| Fonctionnement réel du formulaire dans un navigateur | testé par lecture du code uniquement (`preventDefault` + ouverture WhatsApp) |

### Hypothèses signalées comme telles
- Le déploiement Vercel publie bien le contenu de ce dépôt (titres et textes identiques, très forte probabilité — non confirmé par un accès au projet Vercel).
- Les horaires, numéros et services utilisés sont ceux **fournis par le propriétaire** dans la demande. Ils restent listés section **I** comme éléments à reconfirmer.

---

## A. Diagnostic initial

### A.1 Architecture technique
| Élément | Constat |
|---|---|
| Type | Site statique, 4 pages HTML, aucun framework, aucun build |
| Pages | `index.html`, `services.html`, `about.html`, `contact.html` |
| CSS | 1 fichier `assets/css/style.css` (540 lignes avant intervention) |
| JS | 1 fichier `assets/js/main.js` — navigation mobile, année dynamique, formulaire → WhatsApp |
| Images | 10 JPEG dans `assets/images/` (aucun WebP, aucun `srcset`) |
| Hébergement | Vercel (statique) + miroir GitHub Pages sur une ancienne branche |
| Formulaire | Pas de backend : le JS prépare un message WhatsApp. Aucun envoi automatique, aucune fausse confirmation — c'est un choix honnête à conserver |

### A.2 Métadonnées avant intervention
| Page | `<title>` | Longueur | `<meta description>` | Canonical |
|---|---|---|---|---|
| Accueil | CUT & LOOK \| Cabaret Barber Shop & Esthétique à Casablanca | 58 | 203 car. (tronquée) | ❌ |
| Prestations | Nos prestations \| CUT & LOOK Casablanca | 39 | 209 car. (tronquée) | ❌ |
| Le salon | Le salon \| CUT & LOOK — Cabaret Barber Shop & Esthétique | 56 | 202 car. (tronquée) | ❌ |
| Contact | Contact & itinéraire \| CUT & LOOK Casablanca | 44 | 200 car. (tronquée) | ❌ |

Toutes les `og:image` étaient en **chemin relatif** (`assets/images/...`), ce qui casse l'aperçu sur WhatsApp, Facebook et LinkedIn — précisément le canal de conversion principal du salon.

### A.3 Structure des titres avant intervention
- Accueil : `H1` = « Votre style. / Notre signature. » → **zéro mot-clé, zéro ville, zéro activité**.
- Toutes les pages : un seul `H1` (bon point), hiérarchie `H2/H3` globalement correcte.
- Aucune page ne ciblait une requête comme « tresses africaines Casablanca » ou « barber shop Casablanca » avec une URL dédiée.

### A.4 Exploration et indexation
- `https://cabaretshopesthetique.vercel.app/robots.txt` → **404 confirmé**
- `https://cabaretshopesthetique.vercel.app/sitemap.xml` → **404 confirmé**
- Fichier de vérification Google `googlee184c103eb04f93a.html` → **200 confirmé**, contenu exact.
- Aucune balise `canonical` : `/` et `/index.html` renvoient tous deux la même page.
- Aucune page 404 personnalisée.

### A.5 Images
| Fichier | Dimensions réelles | Poids avant | Déclaré dans le HTML | Problème |
|---|---|---|---|---|
| `cover-salon.jpg` | 1086 × 1448 | 441 Ko | 1086 × 1448 | très lourd pour le LCP |
| `hero-salon.jpg` | 1376 × 768 | 285 Ko | **1200 × 800** | dimensions fausses → décalage de mise en page |
| `service-*.jpg` (8) | 1200 × 896 | 126–212 Ko | 1200 × 896 | correct, mais aucun format moderne |

Total images de l'accueil : **~1,9 Mo**. Aucun WebP, aucun `srcset`, aucun `sizes`.

### A.6 Accessibilité et contrastes (mesurés, ratio WCAG)
| Élément | Couleurs | Ratio | Seuil AA | Verdict |
|---|---|---|---|---|
| `.section-kicker`, `.service-index` | #9a753c / #fffdf9 | 4,15 | 4,5 | ❌ |
| `.visual-note` | #8a8479 / #fffdf9 | 3,65 | 4,5 | ❌ |
| `.practical-details small` | #8d806a / #f0e7d7 | 3,15 | 4,5 | ❌ |
| `.footer-bottom` | #756f65 / #11100e | 3,82 | 4,5 | ❌ |
| `.value-number` | #a17b41 / #f5f1e9 | 3,44 | 4,5 | ❌ |
| Texte principal | #282620 / #fffdf9 | 14,89 | 4,5 | ✅ |

Points positifs déjà en place : `skip-link`, `aria-current`, `aria-expanded` sur le menu, `role="status"` + `aria-live` sur les messages du formulaire, `alt` sur toutes les images, `title` sur les iframes, focus visible personnalisé, `prefers-reduced-motion`.

### A.7 Données structurées avant intervention
- Type `HealthAndBeautyBusiness` (valide mais moins précis que `BeautySalon`).
- `"image": "assets/images/cover-salon.jpg"` → **URL relative, inexploitable par Google**.
- Absence de `url`, de `@id`, de `sameAs`, de fil d'Ariane.
- Blocs **différents** entre l'accueil (avec `contactPoint` + `hasOfferCatalog`) et les autres pages → signaux incohérents.
- Le catalogue d'un commerce de beauté listait « Immobilier » et « Aide à domicile » → dilution sémantique.

---

## B. Problèmes confirmés et risques

Légende statut : **✅ réalisé** · **🟡 proposé** · **🔵 à valider propriétaire** · **⛔ bloqué (accès manquant)**

### Priorité critique
| # | Problème | Impact attendu | Statut |
|---|---|---|---|
| 1 | `robots.txt` et `sitemap.xml` en 404 | Exploration lente, découverte des pages dépendante du maillage interne | ✅ |
| 2 | Aucune `canonical` (duplication `/` vs `/index.html`) | Signaux dilués entre deux URL | ✅ |
| 3 | `H1` d'accueil sans mot-clé ni ville | Perte du signal le plus fort de la page | ✅ |
| 4 | Aucune URL dédiée aux prestations à forte intention | Impossible de se positionner sur « tresses africaines Casablanca » ou « barber shop Casablanca » | ✅ |

### Priorité élevée
| # | Problème | Impact attendu | Statut |
|---|---|---|---|
| 5 | JSON-LD avec images relatives + blocs incohérents | Données structurées non exploitables, entité mal comprise | ✅ |
| 6 | `og:image` relative, pas d'`og:url` ni Twitter Card | Aperçus cassés lors des partages WhatsApp — canal de réservation n°1 | ✅ |
| 7 | Descriptions de 200–209 caractères | Troncature du message commercial dans les résultats | ✅ |
| 8 | 1,9 Mo d'images, aucun WebP/`srcset` | LCP dégradé, surtout en 4G mobile | ✅ |
| 9 | Dimensions fausses de `hero-salon.jpg` | Décalage de mise en page (CLS) | ✅ |
| 10 | 5 contrastes sous le seuil AA | Lisibilité mobile, signal d'accessibilité | ✅ |
| 11 | Aucun suivi des conversions | Impossible de savoir si le SEO génère des rendez-vous | ✅ |
| 12 | Pas de page 404 personnalisée | Visiteur perdu, aucune reprise de contact | ✅ |

### Priorité moyenne
| # | Problème | Impact attendu | Statut |
|---|---|---|---|
| 13 | Images d'**illustration**, aucune photo réelle | Confiance, E-E-A-T, conversion | 🔵 |
| 14 | Aucune FAQ (les internautes cherchent « faut-il réserver », « quel tarif ») | Couverture de requêtes conversationnelles | ✅ |
| 15 | Aucun profil social vérifié → pas de `sameAs` | Entité moins complète pour Google | 🔵 |
| 16 | `Immobilier` / `Aide à domicile` sur un site de beauté | Dilution thématique (conservé à la demande du propriétaire) | 🔵 |
| 17 | Pas de version arabe | Une partie de la clientèle casablancaise est arabophone | 🟡 |
| 18 | Tailles de police < 12 px (`.topbar`, `.brand-copy small`) | Confort de lecture mobile | 🟡 |

### Priorité faible
| # | Problème | Statut |
|---|---|---|
| 19 | `meta keywords` obsolète | ✅ supprimé |
| 20 | Pas de `max-image-preview:large` | ✅ ajouté |
| 21 | Miroir GitHub Pages sur une ancienne branche | 🟡 à désactiver (voir §Déploiement) |

### Risques identifiés, non corrigés par le code
- **Cohérence de nom.** L'enseigne affiche « CUT & LOOK », la fiche et le site utilisent « Cabaret Barber Shop & Esthétique ». Vous avez confirmé que le **nom officiel** est *Cabaret Barber Shop & Esthétique* et que *CUT & LOOK* est l'enseigne. Si la fiche Google Business Profile porte un autre nom, **c'est la fiche qui doit être alignée**, pas le site.
- **Avis Google.** Aucun `aggregateRating` n'a été ajouté : fabriquer une note est contraire aux règles Google et expose à une action manuelle.
- **Tarifs.** Aucun prix n'a été inventé. Toutes les pages affichent « Sur devis ».

---

## C. Plan SEO priorisé

| Ordre | Action | Impact | Effort | Statut |
|---|---|---|---|---|
| 1 | `robots.txt` + `sitemap.xml` | Critique | Faible | ✅ |
| 2 | `canonical` + métadonnées complètes | Critique | Faible | ✅ |
| 3 | Réécriture des `title` / descriptions | Élevé | Faible | ✅ |
| 4 | `H1` de l'accueil + textes orientés requête locale | Critique | Moyen | ✅ |
| 5 | 6 pages prestations distinctes | Élevé | Élevé | ✅ |
| 6 | JSON-LD reconstruit | Élevé | Moyen | ✅ |
| 7 | Images WebP + `srcset` + dimensions exactes | Élevé | Moyen | ✅ |
| 8 | Suivi des conversions WhatsApp / téléphone | Élevé | Faible | ✅ |
| 9 | Maillage interne vers les pages prestations (header, footer, cartes, fil d'Ariane) | Moyen | Faible | ✅ |
| 10 | Contrastes et accessibilité | Moyen | Faible | ✅ |
| 11 | 404 personnalisée | Faible | Faible | ✅ |
| 12 | Photos réelles + fiche Google optimisée | **Élevé** | Moyen | 🔵 |
| 13 | Search Console + soumission du sitemap | Élevé | Faible | 🔵 (accès propriétaire) |
| 14 | Avis Google authentiques | Élevé | Moyen | 🔵 |

---

## D. Titles et meta descriptions (implémentés)

Toutes les longueurs ont été contrôlées : `title` ≤ 60 caractères, description entre 132 et 153.

| Page | URL | `<title>` | `<meta description>` |
|---|---|---|---|
| Accueil | `/` | Coiffure, barber shop & beauté à Casablanca \| Cabaret | Salon de coiffure et beauté à Charaf, Casablanca : coiffure, barber shop, tresses, locks, onglerie et soins du visage. Ouvert 7j/7, 10h—22h. |
| Prestations | `/services.html` | Prestations coiffure, tresses, locks & onglerie \| Casablanca | Coiffure femme et homme, tresses africaines, dreadlocks, onglerie, soins du visage. Tarifs communiqués avant la prestation, à Charaf, Casablanca. |
| Coiffure femme | `/coiffure-femme-casablanca.html` | Coiffure femme à Casablanca : coupe & brushing \| Charaf | Coupe femme, brushing, coloration et coiffure de cérémonie à Casablanca. Prestation sur devis à Charaf, boulevard Moulay Thami. Rendez-vous par WhatsApp. |
| Barber shop | `/barber-shop-homme-casablanca.html` | Barber shop homme à Casablanca : coupe \| Charaf | Barber shop à Casablanca : coupe homme, dégradés, contours et coupe enfant à Charaf. Tarif sur devis, rendez-vous par téléphone ou WhatsApp, 7j/7. |
| Tresses | `/tresses-africaines-casablanca.html` | Tresses africaines à Casablanca : nattes & twist \| Charaf | Tresses africaines, nattes collées, twist et coiffures protectrices à Casablanca. Salon à Charaf, rendez-vous par WhatsApp, 7j/7 de 10h à 22h. |
| Locks | `/dreadlocks-microlocks-casablanca.html` | Dreadlocks & microlocks à Casablanca \| Charaf | Création de dreadlocks et microlocks, entretien et retouche des racines à Casablanca. Salon à Charaf, devis par WhatsApp, ouvert 7j/7. |
| Onglerie | `/onglerie-manucure-casablanca.html` | Onglerie à Casablanca : manucure & pédicure \| Charaf | Manucure, pédicure et soins des ongles à Casablanca. Onglerie à Charaf, rendez-vous par téléphone ou WhatsApp, ouvert 7 jours sur 7. |
| Soins du visage | `/soins-visage-casablanca.html` | Soins du visage à Casablanca \| Cabaret Barber Shop | Soins du visage à Casablanca : nettoyage, hydratation et soin éclat adaptés à votre peau. Salon à Charaf, rendez-vous par WhatsApp, 7j/7. |
| Le salon | `/about.html` | Le salon Cabaret Barber Shop & Esthétique à Charaf | Découvrez le salon Cabaret Barber Shop & Esthétique à Charaf, Casablanca : équipe, prestations beauté, engagements et informations pratiques. |
| Contact | `/contact.html` | Contact & itinéraire à Charaf, Casablanca \| CUT & LOOK | Adresse, horaires et contacts du salon à Charaf, Casablanca. Réservez par téléphone, WhatsApp ou via le formulaire. Ouvert 7j/7 de 10h à 22h. |
| 404 | `/404.html` | Page introuvable (404) \| Cabaret Barber Shop & Esthétique | Cette page n'existe pas ou a été déplacée. Retrouvez les prestations, l'adresse et les contacts du salon à Charaf, Casablanca. |

### Objectifs de recherche par page
| Page | Requête principale visée | Intention |
|---|---|---|
| Accueil | salon de coiffure Casablanca | locale / navigation |
| Prestations | prestations salon beauté Casablanca | exploration |
| Coiffure femme | coiffure femme Casablanca, coupe femme Casablanca | transactionnelle |
| Barber shop | barber shop Casablanca, coiffeur homme Casablanca | transactionnelle |
| Tresses | tresses africaines Casablanca | transactionnelle |
| Locks | dreadlocks Casablanca, microlocks Casablanca | transactionnelle |
| Onglerie | onglerie Casablanca, manucure Casablanca | transactionnelle |
| Soins du visage | soins du visage Casablanca | transactionnelle |
| Contact | salon coiffure Charaf Casablanca itinéraire | navigation |

> **Aucun volume de recherche n'est affirmé** : ces requêtes sont des **hypothèses de travail** issues de la structure de l'offre et de l'intention d'achat, à valider avec les données réelles de Search Console après 4 à 8 semaines.

---

## E. Textes optimisés

### Accueil — nouveau message principal
- **`H1`** : « Salon de coiffure & barber shop *à Casablanca* » (avant : « Votre style. Notre signature. »).
- **Accroche** : « **Cabaret Barber Shop & Esthétique**, enseigne **CUT & LOOK**, vous accueille à Charaf pour la coiffure femme et homme, le barber shop, les tresses africaines, les locks, l'onglerie et les soins du visage. »
- **Repères visibles** : « Femmes, hommes & enfants » · « Ouvert 7j/7 · 10h—22h » · « Résidence Oum Rabii, Charaf ».
- **Bloc local** conservé et enrichi (adresse, GPS, horaires, itinéraire).
- **FAQ ajoutée** (5 questions) : localisation, horaires, prise de rendez-vous, réservation, prestations.

### Pages prestations — structure commune
1. Fil d'Ariane visible + `BreadcrumbList`.
2. `H1` avec la requête et la ville.
3. Encadré prestation : « Sur devis » + liste des variantes réellement proposées.
4. Trois étapes de déroulement (diagnostic → prestation → conseils).
5. Contenu explicatif original (2 blocs par page, rédigés page par page, sans duplication).
6. Politique tarifaire transparente : devis communiqué avant la prestation.
7. FAQ propre à chaque prestation (3 questions).
8. Maillage vers 3 autres prestations + retour au hub.

**Aucune donnée inventée** : pas de prix, pas d'année d'expérience, pas de nombre de clients, pas de certification, pas de note moyenne.

### Reformulations sensibles
- Les visuels sont annoncés comme illustrations : « Visuel d'illustration — les photos des réalisations du salon seront publiées prochainement. » Cette mention est conservée et **doit disparaître dès l'arrivée de vraies photos**.
- « Réserver cette prestation » ne promet aucune disponibilité : le formulaire prépare un message WhatsApp, l'utilisateur valide lui-même.

---

## F. Données structurées (JSON-LD)

Un **graphe unique** est désormais présent sur chaque page, avec des `@id` stables :

```
BeautySalon  @id https://cabaretshopesthetique.vercel.app/#business
WebSite      @id https://cabaretshopesthetique.vercel.app/#website
WebPage      @id <url de la page>#webpage
BreadcrumbList @id <url>#breadcrumb
Service      @id <url>#service        (pages prestations)
FAQPage      @id <url>#faq            (accueil + pages prestations)
ItemList     @id /services.html#prestations
```

### Champs volontairement **exclus**
| Champ | Raison |
|---|---|
| `aggregateRating` / `review` | aucune note vérifiée ; fabriquer une note viole les règles Google |
| `priceRange` / `offers.price` | aucun tarif confirmé par le propriétaire |
| `sameAs` | aucun profil social officiel confirmé |
| `openingHoursSpecification` pour le Ramadan | horaires spécifiques non communiqués |
| `hasOfferCatalog` → Immobilier / Aide à domicile | hors du champ sémantique d'un `BeautySalon` (les sections restent visibles sur le site) |

### Extrait implémenté (accueil, tronqué)
```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BeautySalon",
      "@id": "https://cabaretshopesthetique.vercel.app/#business",
      "name": "Cabaret Barber Shop & Esthétique",
      "alternateName": "CUT & LOOK",
      "url": "https://cabaretshopesthetique.vercel.app/",
      "telephone": "+212775048227",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Résidence Oum Rabii, Boulevard Moulay Thami, quartier Charaf",
        "addressLocality": "Casablanca",
        "addressRegion": "Casablanca-Settat",
        "addressCountry": "MA"
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 33.5493611, "longitude": -7.7013889 },
      "hasMap": "https://www.google.com/maps/search/?api=1&query=33.5493611%2C-7.7013889",
      "openingHoursSpecification": [{
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "10:00",
        "closes": "22:00"
      }],
      "areaServed": [{ "@type": "City", "name": "Casablanca" }],
      "currenciesAccepted": "MAD",
      "knowsLanguage": ["fr", "ar"]
    },
    { "@type": "WebSite", "@id": "https://cabaretshopesthetique.vercel.app/#website", "url": "https://cabaretshopesthetique.vercel.app/", "name": "Cabaret Barber Shop & Esthétique", "inLanguage": "fr-MA" },
    { "@type": "FAQPage", "@id": "https://cabaretshopesthetique.vercel.app/#faq", "mainEntity": [ /* 5 questions visibles sur la page */ ] }
  ]
}
```

> **Attente réaliste :** `LocalBusiness`/`BeautySalon` peut améliorer la compréhension de l'entité, mais **ne déclenche pas de résultat enrichi garanti**. Les `FAQPage` ne génèrent plus de rich result pour un commerce local depuis les restrictions Google de 2023 — le balisage reste utile sémantiquement et ne pénalise pas.

---

## G. Corrections techniques réalisées

### Fichiers créés
| Fichier | Rôle |
|---|---|
| `robots.txt` | exploration autorisée + déclaration du sitemap |
| `sitemap.xml` | 10 URL, `lastmod`, priorités, image pour l'accueil |
| `vercel.json` | en-têtes de sécurité + cache des assets |
| `404.html` | page 404 aux couleurs du salon avec reprise de contact |
| `assets/js/tracking.js` | mesure des conversions (dataLayer / GA4 optionnel) |
| `coiffure-femme-casablanca.html` | page prestation dédiée |
| `barber-shop-homme-casablanca.html` | page prestation dédiée |
| `tresses-africaines-casablanca.html` | page prestation dédiée |
| `dreadlocks-microlocks-casablanca.html` | page prestation dédiée |
| `onglerie-manucure-casablanca.html` | page prestation dédiée |
| `soins-visage-casablanca.html` | page prestation dédiée |
| `README-SEO.md` | ce rapport |

### Fichiers modifiés
| Fichier | Modifications |
|---|---|
| `index.html` | `H1` et accroche réécrits, 9 cartes prestations reliées aux pages dédiées, FAQ, en-tête/pied de page reconstruits (5 colonnes), JSON-LD, images WebP |
| `services.html` | liens « En savoir plus » vers les 6 pages, boutons de réservation, JSON-LD, images WebP |
| `about.html` | `H1` recentré sur le nom officiel, métadonnées, JSON-LD, images WebP |
| `contact.html` | métadonnées, JSON-LD `ContactPoint`, images WebP, formulaire inchangé (fonctionnel) |
| `assets/css/style.css` | 5 contrastes corrigés, échelle des `H1`, styles FAQ/pages prestations, pied de page 5 colonnes, `picture` responsive |
| `assets/images/*` | 10 JPEG recomprimés + 30 variantes WebP (480/720/800/1024/1086/1200 px) |

### Détail des images
- `srcset` + `sizes` sur chaque visuel, `<picture>` avec WebP prioritaire et JPEG en repli.
- Préchargement du visuel principal de l'accueil (`<link rel="preload" type="image/webp">`) pour le LCP.
- `loading="lazy"` conservé hors écran, `fetchpriority="high"` sur le visuel d'accueil.
- **Correction CLS** : `hero-salon.jpg` déclarait 1200 × 800 pour 1376 × 768 réels → dimensions désormais exactes partout.

### JavaScript
- `main.js` **inchangé** : menu mobile, année dynamique, date minimale, préparation du message WhatsApp.
- `tracking.js` ajouté, sans dépendance externe, sans cookie, sans donnée personnelle.

---

## H. Contrôles effectués et résultats

Contrôles automatisés exécutés sur les 11 pages HTML :

| Contrôle | Résultat |
|---|---|
| Structure HTML (balises fermées, imbrication) | **0 erreur** sur 11 pages |
| JSON-LD (parsing JSON) | **0 erreur**, 11 blocs valides |
| Liens internes cassés | **0** |
| Ancres internes absentes | **0** |
| `canonical` absolu et unique | **11/11** |
| `og:image` absolu | **11/11** |
| `title` ≤ 60 caractères | **11/11** (max 60) |
| Description entre 70 et 160 caractères | **11/11** |
| Un seul `H1` par page | **11/11** |
| `alt` sur toutes les images | **11/11** |
| `width` + `height` sur toutes les images | **11/11** |
| Titres/descriptions dupliqués | **0** |
| Sitemap ↔ fichiers réels | **10/10 URL correspondent à un fichier** |
| Pages indexables absentes du sitemap | **0** |
| `robots.txt` : sitemap déclaré, aucun `Disallow` bloquant | **OK** |
| Toutes les pages et assets en HTTP 200 (serveur local) | **19/19** |
| Contrastes des textes informatifs ≥ 4,5:1 | **OK** (les 5 échecs corrigés) |

### Poids transféré estimé (calcul sur fichiers réels)
| Contexte | Avant | Après |
|---|---|---|
| Premier écran mobile | ~600 Ko (JPEG 441 Ko) | **~152 Ko** (WebP 480 px) |
| Premier écran desktop (2×) | ~600 Ko | **~347 Ko** (WebP 1086 px) |
| Images de la page d'accueil (toutes) | ~1,9 Mo | ~1,1 Mo chargés à la demande |

> Ces chiffres sont des **estimations calculées sur les fichiers**, pas des mesures Lighthouse. Les Core Web Vitals terrain doivent être relevés dans la Search Console après 28 jours de trafic.

---

## I. Éléments nécessitant la validation du propriétaire

| # | Élément | Pourquoi | Ce qui est en place aujourd'hui |
|---|---|---|---|
| 1 | **Nom officiel sur la fiche Google** | L'enseigne affiche « CUT & LOOK », le site utilise « Cabaret Barber Shop & Esthétique » | Nom officiel = Cabaret Barber Shop & Esthétique, `alternateName` = CUT & LOOK |
| 2 | **Horaires réels** (et Ramadan) | Un horaire faux pénalise la fiche et la confiance | 7j/7 · 10h—22h partout, y compris JSON-LD |
| 3 | **Numéros** : +212 775 048 227, WhatsApp +212 632 827 468 et +33 7 73 20 76 52 | Un numéro mort tue la conversion | Les trois conservés comme vous l'avez confirmé |
| 4 | **Prestations réellement proposées** | Ne pas annoncer un service non disponible | Liste issue du site existant, sans ajout |
| 5 | **Barbe / rasage** | Non mentionné sur le site actuel — je ne l'ai **pas** ajouté | Absent |
| 6 | **Poses techniques d'onglerie** (gel, résine, semi-permanent) | Non confirmées | Seule la « pose de vernis » est annoncée |
| 7 | **Tarifs** | Aucun prix inventé | « Sur devis » partout |
| 8 | **Photos authentiques** | Les visuels actuels sont des illustrations | Mention d'illustration affichée |
| 9 | **Profils sociaux officiels** (Instagram, Facebook, TikTok) | Pour `sameAs` et la cohérence d'entité | Aucun lien inventé |
| 10 | **Accès Google Business Profile** | Catégories, photos, description, avis | Recommandations fournies (§GBP) |
| 11 | **Accès Search Console / Vercel** | Soumettre le sitemap, vérifier l'indexation | Fichier de vérification déjà en ligne |
| 12 | **Domaine définitif** | Toutes les URL canoniques pointent vers l'URL Vercel | Vercel, conformément à votre choix |

---

## J. Plan d'action 30 / 60 / 90 jours

### Jours 1 → 30 — Fondations
1. Déployer cette version sur Vercel (voir §Déploiement). **Priorité absolue.**
2. Dans Search Console : valider la propriété (le fichier `googlee184c103eb04f93a.html` répond déjà en 200), soumettre `sitemap.xml`, demander l'indexation des 10 URL.
3. Vérifier que la fiche Google Business Profile est **revendiquée** et que NAP (nom, adresse, téléphone) est identique au site, caractère pour caractère.
4. Remplacer les illustrations par **8 à 12 photos réelles** : devanture, intérieur, coupe femme, coupe homme, tresses, locks, onglerie, soin du visage.
5. Désactiver le miroir GitHub Pages s'il n'est plus utilisé (évite un contenu dupliqué hébergé ailleurs).
6. Photographier la devanture avec l'enseigne visible : c'est ce qui aide Google à faire le lien enseigne ↔ établissement.

**Indicateurs à relever (situation de référence) :** pages indexées, impressions, clics, positions moyennes, clics WhatsApp/téléphone.

### Jours 31 → 60 — Contenu et preuve sociale
7. Lancer une **demande d'avis** systématique (voir §GBP) — objectif : 10 à 15 avis authentiques les trois premiers mois.
8. Publier 2 à 4 photos par mois sur la fiche Google.
9. Ajouter les tarifs réels sur les pages prestations (fourchette « à partir de ») : c'est le premier frein à la réservation.
10. Vérifier dans Search Console les requêtes réellement captées et **ajuster les `H1`/contenus** en conséquence.
11. Corriger les éventuelles erreurs d'exploration signalées.

### Jours 61 → 90 — Extension
12. Créer une version arabe des pages principales si la clientèle le justifie (avec `hreflang` correctement configuré).
13. Ouvrir une fiche Google secondaire ou une page dédiée pour **Immobilier / Aide à domicile** afin de sortir ces activités du site beauté.
14. Structurer une page « Réalisations » avec de vraies photos avant/après (uniquement avec accord des clientes).
15. Suivre le tableau mensuel (§Mesure) et arbitrer : investir sur les 2 requêtes qui convertissent le mieux.

---

## Google Business Profile — recommandations

> Je n'ai **aucun accès** à la fiche Google. Ces recommandations sont à appliquer par le propriétaire depuis le compte Google concerné.

### Catégories
- **Catégorie principale :** `Salon de coiffure` (*Hair salon*) — c'est la catégorie qui correspond le mieux à l'activité déclarée et au plus grand volume de recherche locale.
- **Catégories secondaires (à ajouter seulement si le service est réellement proposé au quotidien) :**
  - `Barbier` (*Barber shop*)
  - `Salon de beauté` (*Beauty salon*)
  - `Onglerie` (*Nail salon*)
  - `Institut de beauté` (*Beauty parlour*) — seulement si les soins du visage sont une activité régulière
- **À éviter :** `Immobilier`, `Agence immobilière`, `Service d'aide à domicile`. Ces catégories diluent la pertinence beauté et brouillent le classement local.

### Nom
Utiliser exactement **`Cabaret Barber Shop & Esthétique`**. Ne pas ajouter de mots-clés au nom (« meilleur coiffeur Casablanca », « pas cher »…) : c'est un motif de suspension de fiche.

### Description (proposition, 750 caractères max)
> Cabaret Barber Shop & Esthétique est un salon de coiffure et de beauté situé à Charaf, Casablanca, ouvert tous les jours de 10h à 22h. L'équipe accueille les femmes, les hommes et les enfants pour la coiffure, le barber shop, les tresses africaines, les nattes, le twist, les dreadlocks et microlocks, le brushing protéine et la coloration. Le salon propose également l'onglerie (manucure, pédicure, pose de vernis) et des soins du visage adaptés à chaque type de peau. Chaque prestation est réalisée sur mesure, après un échange sur vos envies et la nature de vos cheveux. Les tarifs sont communiqués avant la prestation. Réservation par téléphone au 06 77 50 48 227 ou par WhatsApp au 06 32 82 74 68.

### Photos à publier (dans cet ordre)
1. **Logo** (carré, 720 × 720 minimum)
2. **Photo de couverture** : devanture avec l'enseigne visible, de jour
3. Intérieur : espace coiffure, fauteuils, miroirs
4. Extérieur / rue pour situer l'entrée
5. Équipe (avec accord écrit des personnes)
6. Réalisations : tresses, locks, coupe femme, coupe homme, onglerie — **photos réelles, pas d'illustrations**
7. Ambiance / détails soignés

Format conseillé : 1200 × 900 px minimum, JPEG ou WebP, pas de filigrane, pas de capture d'écran.

### Obtenir des avis authentiques (sans enfreindre les règles)
- Demander **à la fin de la prestation**, oralement, puis envoyer le lien direct de la fiche par WhatsApp le lendemain.
- Ne **jamais** offrir de réduction ou de cadeau en échange d'un avis, ne jamais rédiger d'avis à la place du client, ne jamais filtrer les clients mécontents en leur demandant de ne pas publier.
- Répondre à **tous** les avis sous 48 h, y compris les négatifs, avec une réponse factuelle et courtoise.
- Afficher le QR code de la fiche à la caisse (autorisation Google : le lien « Demander des avis »).

### Autres champs à remplir
- Section **Services** : ajouter chaque prestation avec une description courte et, si possible, un prix (ou « sur devis »).
- **Attributs** : « Réservation en ligne » uniquement si c'est vrai ; « Tenue par des femmes » / « Langues : arabe, français » si applicable.
- **Message** : activer la messagerie uniquement si quelqu'un peut répondre dans la journée, sinon la désactiver.
- **Zone desservie** : Casablanca uniquement — ne pas ajouter de quartiers où le salon n'exerce pas.

---

## Mesure : Search Console et GA4

### Search Console (à faire par le propriétaire)
1. Ajouter la propriété **Domaine** `cabaretshopesthetique.vercel.app` (ou la propriété d'URL préfixée).
2. La validation par fichier HTML est **déjà en place** : `https://cabaretshopesthetique.vercel.app/googlee184c103eb04f93a.html` répond en 200 avec le contenu exact.
3. Soumettre `https://cabaretshopesthetique.vercel.app/sitemap.xml`.
4. Menu **Inspection de l'URL** → demander l'indexation pour les 10 pages.
5. Relever la situation de référence à J+7 : pages indexées, impressions, clics, requêtes.

### GA4 (optionnel, respectueux de la confidentialité)
Le site ne charge **aucun** outil de mesure par défaut. Pour l'activer, ajouter un identifiant GA4 dans le `<head>` de chaque page, **avant** `tracking.js` :

```html
<script>
  window.CUTLOOK_ANALYTICS = { ga4Id: "G-XXXXXXXXXX" };
</script>
```

`tracking.js` charge alors `gtag.js` et transmet les événements. **Aucun cookie ni identifiant publicitaire n'est posé sans cette configuration.** Si vous activez GA4, prévoyez un bandeau de consentement conforme à la loi 09-08 marocaine.

### Événements suivis
| Événement | Déclencheur | Paramètres |
|---|---|---|
| `whatsapp_click` | clic sur un lien `wa.me` | `cta_location`, `link_text` |
| `phone_click` | clic sur un lien `tel:` | `cta_location`, `link_text` |
| `directions_click` | clic vers Google Maps | `cta_location`, `link_text` |
| `booking_request_prepared` | envoi du formulaire (message WhatsApp préparé) | `service`, `has_date` |

> `booking_request_prepared` est **volontairement** nommé ainsi : le message n'est pas envoyé automatiquement, l'utilisateur doit encore appuyer sur « Envoyer » dans WhatsApp. Aucune fausse conversion n'est enregistrée.

### Tableau de suivi mensuel
| Indicateur | Mois 1 | Mois 2 | Mois 3 |
|---|---|---|---|
| Pages indexées | | | |
| Impressions Google | | | |
| Clics organiques | | | |
| Requêtes locales (top 10) | | | |
| Clics WhatsApp | | | |
| Clics téléphone | | | |
| Clics itinéraire | | | |
| Demandes préparées | | | |
| Erreurs d'exploration | | | |
| Appels / messages reçus (manuel) | | | |

**Le trafic n'est pas un objectif.** L'objectif est le **nombre de demandes de rendez-vous**. Un site qui reçoit 200 visites et 15 demandes vaut mieux qu'un site à 2 000 visites et 2 demandes.

---

## Déploiement sur Vercel

Je **n'ai pas** accès au projet Vercel : aucune publication n'a été effectuée.

**Si le projet Vercel est connecté à ce dépôt GitHub** (cas le plus probable) :
1. Fusionner la branche dans `main`.
2. Vercel redéploie automatiquement en production.
3. `vercel.json`, `robots.txt` et `sitemap.xml` sont pris en compte sans configuration supplémentaire.

**Sinon**, depuis un poste avec la CLI :
```bash
vercel --prod
```

**Après déploiement, vérifier :**
- `https://cabaretshopesthetique.vercel.app/robots.txt` → 200
- `https://cabaretshopesthetique.vercel.app/sitemap.xml` → 200
- `https://cabaretshopesthetique.vercel.app/googlee184c103eb04f93a.html` → 200 (le fichier doit rester accessible)
- une URL inexistante → page 404 aux couleurs du salon
- ouverture de la page d'accueil sur un téléphone réel

### Si le domaine change plus tard
Toutes les URL canoniques, le sitemap et le JSON-LD pointent vers `https://cabaretshopesthetique.vercel.app`. Pour basculer sur un domaine définitif :

```bash
grep -rl "cabaretshopesthetique.vercel.app" --include="*.html" --include="*.xml" --include="*.txt" . \
  | xargs sed -i 's#https://cabaretshopesthetique.vercel.app#https://votre-domaine.ma#g'
```

Puis redéployer et re-soumettre le sitemap. **Choisissez le domaine définitif avant de soumettre à Search Console** pour éviter un changement d'adresse prématuré.

---

## Ce qui reste à faire et qui dépend d'un accès

| Action | Bloquée par |
|---|---|
| Soumettre le sitemap à Search Console | accès propriétaire |
| Revendiquer / optimiser la fiche Google | accès propriétaire |
| Publier de vraies photos | propriétaire (photos) |
| Confirmer les tarifs | propriétaire |
| Mesurer les Core Web Vitals terrain | Search Console (délai de 28 jours de données) |
| Analyse concurrentielle SERP | outil de suivi de positions |

---

## Contenu du dépôt après intervention

```
index.html                              accueil optimisé + FAQ
services.html                           hub des prestations
coiffure-femme-casablanca.html          page prestation
barber-shop-homme-casablanca.html       page prestation
tresses-africaines-casablanca.html      page prestation
dreadlocks-microlocks-casablanca.html   page prestation
onglerie-manucure-casablanca.html       page prestation
soins-visage-casablanca.html            page prestation
about.html / contact.html / 404.html
robots.txt / sitemap.xml / vercel.json
googlee184c103eb04f93a.html             vérification Search Console (ne pas supprimer)
assets/css/style.css
assets/js/main.js                       inchangé
assets/js/tracking.js                   mesure des conversions
assets/images/                          10 JPEG optimisés + 30 variantes WebP
README-SEO.md                           ce rapport
```
