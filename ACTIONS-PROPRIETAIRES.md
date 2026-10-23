# Ce qu'il reste à faire — guide propriétaire

Tout ce qui dépendait d'un accès au compte Google ou de photos professionnelles est regroupé ici.
**Chaque étape est autonome et se fait en quelques minutes.**

---

## 0. Où en est le site aujourd'hui

| Version | URL | État |
|---|---|---|
| **Production (canonique)** | https://cabaretshopesthetique.vercel.app/ | ✅ **à jour, vérifié le 23/10/2026** |
| Miroir de secours | https://yedicoco.github.io/Cabaret-Barber-Shop-Esthetique/ | ✅ à jour, redéployé automatiquement |

La version optimisée est donc **en ligne sur le domaine canonique**. Plus rien ne bloque côté hébergement.

Vérifications effectuées sur Vercel : accueil (nouveau `title`, nouveau `H1`, 9 cartes, FAQ),
6 pages prestations, `robots.txt`, `sitemap.xml`, page 404 personnalisée et fichier de
vérification Google — tous conformes.

> L'étape 1 ci-dessous n'est plus nécessaire ; elle est conservée comme référence si
> l'hébergement devait être reconnecté un jour.

---

## 1. Vercel — ✅ fait (conservé pour référence)

> Cette section est conservée au cas où l'hébergement serait un jour reconnecté.
> **Rien à faire aujourd'hui.**

### 1.1 Le projet est-il connecté à GitHub ?
Vercel → votre projet → **Settings** → **Git**.
- Si un dépôt est affiché : branche = **`main`**, puis **Redeploy**.
- Si aucun dépôt n'est affiché : passez au 1.2.

### 1.2 Connecter le dépôt
1. Vercel → **Add New…** → **Project** → **Import Git Repository**
2. Choisir `Yedicoco/Cabaret-Barber-Shop-Esthetique`
3. Framework Preset : **Other** — Build Command : *(vide)* — Output Directory : *(vide)*
4. **Deploy**
5. Settings → **Domains** → rattacher `cabaretshopesthetique.vercel.app` au nouveau projet si Vercel a créé une nouvelle URL.

Chaque `push` sur `main` redéploiera ensuite automatiquement.

### 1.3 Alternative : rendre GitHub Pages définitif
```bash
./tools/set-domain.sh https://yedicoco.github.io/Cabaret-Barber-Shop-Esthetique
git commit -am "Domaine canonique : GitHub Pages"
git push origin main
```
Le déploiement se relance seul. À réserver au cas où Vercel ne serait pas utilisé.

### 1.4 Vérifier après déploiement
- https://cabaretshopesthetique.vercel.app/ → titre **« Coiffure, barber shop & beauté à Casablanca | Cabaret »**
- `/robots.txt` → 200
- `/sitemap.xml` → 200
- `/googlee184c103eb04f93a.html` → doit **rester accessible** (vérification Google)

---

## 2. Google Search Console (10 minutes)

Le fichier de vérification est **déjà en ligne** sur les deux hôtes.

1. https://search.google.com/search-console → **Ajouter une propriété**
2. Choisir **Préfixe d'URL** → `https://cabaretshopesthetique.vercel.app/`
3. Méthode de validation : **Balise HTML** → onglet « Fichier HTML » : Google fournit un nom de fichier.
   - Si c'est **le même identifiant** (`googlee184c103eb04f93a.html`), la validation passe immédiatement.
   - Si Google en fournit **un autre**, envoyez-moi le nom du fichier : je l'ajoute en une minute.
4. Une fois validé : **Sitemaps** → ajouter `sitemap.xml`
5. **Inspection de l'URL** → coller chacune des 10 adresses → **Demander une indexation**

| Page | URL |
|---|---|
| Accueil | `https://cabaretshopesthetique.vercel.app/` |
| Prestations | `/services.html` |
| Coiffure femme | `/coiffure-femme-casablanca.html` |
| Barber shop | `/barber-shop-homme-casablanca.html` |
| Tresses africaines | `/tresses-africaines-casablanca.html` |
| Dreadlocks & microlocks | `/dreadlocks-microlocks-casablanca.html` |
| Onglerie | `/onglerie-manucure-casablanca.html` |
| Soins du visage | `/soins-visage-casablanca.html` |
| Contact | `/contact.html` |
| Le salon | `/about.html` |

**À relever après 7 jours** (situation de référence) : pages indexées, impressions, clics, requêtes.

---

## 3. Fiche Google Business Profile (20 minutes)

> **Création d'une nouvelle fiche : voir [FICHE-GOOGLE-BUSINESS.md](FICHE-GOOGLE-BUSINESS.md)** —
> valeurs exactes champ par champ, placement du repère, préparation de la vérification vidéo.
>
> À faire depuis le compte Google du salon. Si la fiche n'est pas encore revendiquée : https://business.google.com

### 3.1 Nom — important
**`Cabaret Barber Shop & Esthétique`**
Ne rien ajouter (pas de « meilleur », « pas cher », mots-clés). Un nom surchargé entraîne une suspension.

### 3.2 Catégories
| Type | Valeur |
|---|---|
| Principale | **Salon de coiffure** |
| Secondaires (si réellement pratiquées) | Barbier · Salon de beauté · Onglerie |

❌ Ne pas ajouter : Immobilier, Agence immobilière, Aide à domicile.

### 3.3 Description — à copier-coller
```
Cabaret Barber Shop & Esthétique est un salon de coiffure et de beauté situé à Charaf, Casablanca, ouvert tous les jours de 10h à 22h. L'équipe accueille les femmes, les hommes et les enfants pour la coiffure, le barber shop, les tresses africaines, les nattes, le twist, les dreadlocks et microlocks, le brushing protéine et la coloration. Le salon propose également l'onglerie (manucure, pédicure, pose de vernis) et des soins du visage adaptés à chaque type de peau. Chaque prestation est réalisée sur mesure, après un échange sur vos envies et la nature de vos cheveux. Les tarifs sont communiqués avant la prestation. Réservation par téléphone au 07 75 04 82 27 ou par WhatsApp au 06 32 82 74 68.
```

### 3.4 Services à déclarer
Coiffure femme · Coupe homme · Barbe *(uniquement si proposée)* · Coupe enfant · Tresses africaines · Nattes collées · Twist · Dreadlocks · Microlocks · Brushing protéine · Coloration · Manucure · Pédicure · Soin du visage

Pour chacun : cocher « Sur devis » ou saisir le prix réel.

### 3.5 Coordonnées et horaires — identiques au site, caractère pour caractère
- **Adresse** : Résidence Oum Rabii, boulevard Moulay Thami, quartier Charaf, Casablanca
- **Téléphone principal** : +212 775 048 227
- **Horaires** : lundi → dimanche, 10:00 – 22:00
- **Site** : https://cabaretshopesthetique.vercel.app/
- **Zone desservie** : Casablanca uniquement

### 3.6 Photos à ajouter (8 minimum, dont 3 dès la première semaine)
1. Logo (carré, 720 × 720 px)
2. Devanture avec l'enseigne **CUT & LOOK** bien lisible, de jour
3. Intérieur : fauteuils, miroirs, espace coiffure
4. Équipe (accord écrit des personnes)
5. Réalisations : tresses, locks, coupe femme, coupe homme, onglerie
6. Détail soigné (produits, finition, ambiance)

**Spécifications** : 1200 × 900 px minimum, JPEG, sans filigrane, sans capture d'écran, sans texte ajouté.
Publier 2 à 4 photos par mois — Google valorise la fraîcheur.

---

## 4. Obtenir des avis authentiques

### 4.1 Message à envoyer le lendemain de la prestation (WhatsApp)
```
Bonjour [prénom], merci pour votre visite chez Cabaret Barber Shop & Esthétique.
Si vous avez été satisfait(e), un avis Google nous aide beaucoup :
[LIEN DE LA FICHE]
Bonne journée et à bientôt au salon.
```
Lien à récupérer : fiche Google → bouton **Demander des avis**.

### 4.2 Variante SMS
```
Cabaret Barber Shop & Esthétique — Merci pour votre visite.
Votre avis nous aide : [LIEN]. À bientôt !
```

### ⚠️ Interdit — motif de sanction de la fiche
- Offrir une réduction, un cadeau ou un service gratuit contre un avis
- Rédiger un avis à la place d'un client
- Demander uniquement aux clients satisfaits
- Faire supprimer un avis négatif par un tiers

### 4.3 Réponses types

**Avis 5★**
```
Merci beaucoup [prénom], ravi que la prestation vous ait plu. À très bientôt au salon !
```

**Avis 3★**
```
Merci pour votre retour [prénom]. Nous prenons en compte votre remarque sur [point].
N'hésitez pas à nous écrire au +212 775 048 227 pour en parler.
```

**Avis 1-2★**
```
Bonjour [prénom], nous sommes désolés de cette expérience. Ce que vous décrivez ne
correspond pas à ce que nous souhaitons offrir. Contactez-nous au +212 775 048 227
afin que nous comprenions ce qui s'est passé et trouvions une solution.
```
Répondre **sous 48 h** à tous les avis, y compris négatifs. Une réponse calme rassure
davantage les futurs clients que l'absence d'avis négatif.

---

## 5. Photos réelles : comment les intégrer

Le site utilise aujourd'hui des **illustrations**. Les remplacer est le levier de conversion
le plus rentable — bien avant toute optimisation technique supplémentaire.

1. Photographier avec un téléphone récent, en lumière naturelle, sans flash direct.
2. Cadrage paysage **4:3**, largeur **≥ 1200 px** pour les prestations, portrait ≥ 1086 px pour l'accueil.
3. Nommer les fichiers exactement comme ceci, puis les déposer dans `assets/images/` :

```
cover-salon.jpg          hero-salon.jpg
service-coiffure.jpg     service-tresses.jpg
service-dreadlocks.jpg   service-coloration.jpg
service-onglerie.jpg     service-visage.jpg
```

4. Régénérer les variantes WebP :
```bash
./tools/optimize-images.sh
```
5. Remplacer les mentions « Visuel d'illustration » dans les pages prestations.
6. Mettre à jour les textes `alt` des images dans les fichiers HTML si le contenu de la photo change.

> **Autorisation** : toute personne reconnaissable sur une photo doit avoir donné son accord
> écrit (message WhatsApp suffit, conservé). Ne jamais publier une photo prise « en douce ».

---

## 6. Tarifs

Aucun prix n'a été inventé. Pour les afficher, envoyez simplement une liste sous cette forme :

```
Coupe femme — à partir de 150 DH
Coupe homme — 60 DH
Tresses — sur devis selon longueur
Manucure — 80 DH
```

Ils seront ajoutés dans les pages prestations **et** dans les données structurées,
sans supprimer le « sur devis » pour les prestations qui varient.

---

## 7. Réseaux sociaux

Aucun lien n'a été inventé. Envoyez les URL exactes (Instagram, Facebook, TikTok) :
elles seront ajoutées dans le pied de page et dans les données structurées (`sameAs`),
ce qui renforce la cohérence de l'entité pour Google.

---

## 8. Ce qui se débloque dès que vous envoyez…

| Vous envoyez | Je peux alors faire |
|---|---|
| Le nom exact du fichier HTML fourni par Search Console (s'il diffère) | Ajouter le fichier en 1 minute |
| Le domaine définitif | Basculer tout le site en une commande |
| 8–12 photos | Optimisation, `alt`, suppression des mentions d'illustration |
| La grille tarifaire | Affichage des prix + `offers.price` |
| Les URL des réseaux sociaux | `sameAs` + liens de pied de page |
| Les identifiants GA4 + accord de consentement | Activation de la mesure |

---

## 9. Récapitulatif de vos 30 premiers jours

- [ ] **Jour 1** — Connecter Vercel (ou valider GitHub Pages comme domaine définitif)
- [ ] **Jour 1** — Search Console : valider + soumettre le sitemap
- [ ] **Jour 2** — Fiche Google : catégories, description, horaires, site
- [ ] **Jour 3** — 3 photos minimum sur la fiche
- [ ] **Semaine 1** — Demander un avis à chaque client satisfait
- [ ] **Semaine 2** — 8 photos réelles envoyées pour le site
- [ ] **Semaine 3** — Grille tarifaire publiée
- [ ] **Semaine 4** — Premier relevé Search Console (impressions / clics / requêtes)
