# Créer la fiche Google Business Profile — fiche de saisie

> À utiliser avec le lien : `https://business.google.com/create/new`
> Je **ne peux pas** créer la fiche à votre place : elle doit être créée depuis un compte Google
> auquel vous seul avez accès. Voici tout ce qu'il faut saisir, dans l'ordre.

---

## 0. Avant de cliquer sur « Créer »

### 0.1 Vérifiez qu'aucune fiche n'existe déjà
C'est **le piège numéro un**. Créer une seconde fiche pour un commerce déjà présent crée un doublon,
et Google peut suspendre les deux.

Sur Google Maps, cherchez :
1. `Cabaret Barber Shop Esthétique`
2. `CUT & LOOK Casablanca`
3. les deux numéros : `0775 048 227` et `0632 827 468`

Puis regardez autour du point GPS sur la carte.

| Résultat | Ce qu'il faut faire |
|---|---|
| Une fiche existe déjà | **Ne créez rien.** Cliquez sur « Revendiquer cet établissement » sur la fiche |
| Une fiche existe avec le mauvais nom/adresse | Revendiquez-la, puis corrigez-la (une correction de nom passe par une demande de modification) |
| Aucune fiche | Continuez à l'étape 1 |

### 0.2 Préparez le compte Google
- Utilisez un compte **dédié au salon** (ex. `cabaret.barbershop@gmail.com`), pas un compte personnel.
- Ajoutez un **deuxième administrateur** dès que la fiche existe : si vous perdez l'accès au compte, la fiche est perdue.
- Ne créez pas la fiche depuis un compte partagé avec d'autres établissements.

### 0.3 Préparez les justificatifs
Google demande presque toujours une preuve d'activité. Ayez sous la main :
- une **photo de la devanture** avec l'enseigne visible ;
- un **justificatif d'adresse** au nom de l'établissement (bail, facture d'électricité ou d'eau, contrat) ;
- l'accès au téléphone du salon (pour un éventuel code de vérification).

---

## 1. Le point GPS exact

```
33.5493611, -7.7013889
```

**Vérifications effectuées (données OpenStreetMap) :**

| Contrôle | Résultat |
|---|---|
| Arrêt de bus « Moulay Thami » | à **100 m** du point → cohérent avec l'adresse communiquée |
| Secteur | El Oulfa / Al Azhar, préfecture Hay Hassani, Casablanca |
| Code postal du secteur | 20200 |
| Cohérence interne du site | coordonnées identiques partout (JSON-LD, liens Maps, carte intégrée) — écart mesuré : **0 m** |

Lien à ouvrir pour repérer l'entrée avant de placer le pin :
`https://www.google.com/maps?q=33.5493611,-7.7013889&z=19&hl=fr`

> ⚠️ **Le pin doit être posé sur l'ENTRÉE du salon**, pas au centre de la résidence Oum Rabii,
> ni sur la rue en général. Un pin à 50 m du bon bâtiment fait arriver les clients au mauvais porche.

---

## 2. L'assistant de création, étape par étape

### Étape 1 — Nom de l'entreprise
```
Cabaret Barber Shop & Esthétique
```

**Règle Google** : le nom doit correspondre à celui utilisé **réellement** sur la devanture, le site
et les documents. Deux conséquences concrètes :

- Si la vitrine n'affiche que « CUT & LOOK », la fiche risque d'être refusée ou signalée.
  Faites figurer les deux noms sur l'enseigne ou la plaque (ex. `CUT & LOOK — Cabaret Barber Shop & Esthétique`).
- **N'ajoutez aucun mot-clé** au nom (« meilleur coiffeur », « pas cher », « Casablanca »).
  C'est le motif de suspension le plus fréquent.

### Étape 2 — Catégorie
| Champ | Valeur |
|---|---|
| Catégorie principale | **Salon de coiffure** |
| Catégories secondaires (à ajouter après vérification, seulement si réellement proposées) | Barbier · Salon de beauté · Onglerie |

N'ajoutez **pas** : Immobilier, Agence immobilière, Service d'aide à domicile.
Ces activités brouilleraient la catégorie et la fiche perdrait en pertinence sur « coiffeur Casablanca ».

> Le nom contient « Cabaret » : sans catégorie explicite, Google peut classer la fiche dans une
> mauvaise famille d'établissement. « Salon de coiffure » en catégorie principale est indispensable.

### Étape 3 — « Ajoutez un lieu que les clients peuvent visiter ? »
**Oui.** C'est un commerce avec pignon sur rue. Ne choisissez pas « Je sers mes clients à leur adresse » :
cela supprimerait l'adresse de la fiche et vous feriez perdre toute la visibilité locale.

### Étape 4 — Adresse
| Champ | Valeur à saisir |
|---|---|
| Pays / région | **Maroc** |
| Adresse — ligne 1 | `Boulevard Moulay Thami` |
| Adresse — ligne 2 (facultatif) | `Résidence Oum Rabii, quartier Charaf` |
| Ville | `Casablanca` |
| Code postal | `20200` *(si Google le propose ; sinon laissez ce que Google préremplit)* |
| Région | `Casablanca-Settat` |

Si Google ne trouve pas l'adresse : cliquez sur **« Je ne trouve pas mon adresse »** et placez le
repère à la main. C'est fréquent au Maroc et **ce n'est pas un problème** pour la suite.

### Étape 5 — Placer le repère sur la carte
1. Passez en **vue satellite** (icône en bas à gauche de la carte).
2. Zoomez jusqu'à voir l'immeuble.
3. Faites glisser le repère **sur l'entrée du salon**, côté rue.
4. Vérifiez que le repère est **du bon côté de la chaussée** : sur le mauvais trottoir,
   l'itinéraire envoyé aux clients est erroné.
5. Validez.

### Étape 6 — Zone desservie
Si l'assistant propose une zone : **Casablanca uniquement**.
N'ajoutez pas Mohammedia, Rabat ou d'autres villes où le salon n'exerce pas.

### Étape 7 — Téléphone et site
| Champ | Valeur |
|---|---|
| Téléphone | `+212 775 048 227` *(format local : 07 75 04 82 27)* |
| Site web | `https://cabaretshopesthetique.vercel.app/` |

Le numéro **doit être identique** à celui affiché sur le site (c'est le cas). C'est ce qui permet à
Google de relier la fiche, le site et les citations locales.

### Étape 8 — Vérification
Google propose généralement la **vidéo** pour un nouveau commerce, parfois un code par téléphone
ou un courrier postal.

**À préparer pour la vidéo** (en une seule prise, sans coupure) :
1. Commencez **dehors**, enseigne bien visible, puis reculez pour montrer la rue.
2. Filmez l'entrée et la porte.
3. Entrez et montrez l'intérieur : fauteuils, postes de coiffure, matériel.
4. Montrez le **justificatif d'adresse** (bail ou facture) au nom de l'établissement.
5. Filmez un outil de travail lié au métier (ciseaux, tondeuse, bac de manucure…).

Munissez-vous du justificatif papier **avant** de lancer l'enregistrement : la vidéo ne peut pas être reprise.

---

## 3. Juste après la création

Reprenez la fiche depuis `business.google.com` et complétez :

### 3.1 Horaires
| Jour | Horaires |
|---|---|
| Lundi → Dimanche | `10:00 – 22:00` |

Ajoutez les **horaires spéciaux** pour le Ramadan dès qu'ils sont connus : une fiche fermée alors
qu'elle affiche « ouvert » fait perdre des clients et de la crédibilité.

### 3.2 Description (à copier-coller)
```
Cabaret Barber Shop & Esthétique est un salon de coiffure et de beauté situé à Charaf, Casablanca, ouvert tous les jours de 10h à 22h. L'équipe accueille les femmes, les hommes et les enfants pour la coiffure, le barber shop, les tresses africaines, les nattes, le twist, les dreadlocks et microlocks, le brushing protéine et la coloration. Le salon propose également l'onglerie (manucure, pédicure, pose de vernis) et des soins du visage adaptés à chaque type de peau. Chaque prestation est réalisée sur mesure, après un échange sur vos envies et la nature de vos cheveux. Les tarifs sont communiqués avant la prestation. Réservation par téléphone au 07 75 04 82 27 ou par WhatsApp au 06 32 82 74 68.
```

### 3.3 Services
Ajoutez chaque prestation avec « Sur devis » ou le prix réel :
Coiffure femme · Coupe homme · Coupe enfant · Tresses africaines · Nattes collées · Twist ·
Dreadlocks · Microlocks · Brushing protéine · Coloration · Manucure · Pédicure · Soin du visage

### 3.4 Photos (8 minimum, 3 dès la première semaine)
1. Logo (carré, 720 × 720 px)
2. **Devanture** avec l'enseigne lisible, de jour
3. Intérieur : fauteuils, miroirs, postes de travail
4. Équipe (accord écrit des personnes)
5. Réalisations : tresses, locks, coupe femme, coupe homme, onglerie
6. Détail soigné (produits, finitions)

Format : 1200 × 900 px minimum, JPEG, sans filigrane, sans capture d'écran.

### 3.5 Attributs
- « Réservation en ligne » → **uniquement** si c'est vrai (le site prépare un message WhatsApp, ce n'est pas une réservation en ligne).
- Langues : arabe, français.
- « Tenue par des femmes » / « tenue par des hommes » → seulement si le gérant le confirme.

---

## 4. Les erreurs qui font échouer (ou suspendre) une fiche

| Erreur | Conséquence |
|---|---|
| Créer une fiche alors qu'il en existe déjà une | doublon, suspension possible des deux |
| Mots-clés dans le nom | suspension |
| Pin posé au centre de la résidence ou au hasard | clients mal guidés, itinéraires faux |
| Numéro de téléphone différent de celui du site | signal local affaibli |
| Adresse en « boîte postale » ou « Résidence X » sans rue | adresse non validée |
| Catégorie principale « Bar » ou « Restaurant » | mauvaise audience, concurrence inadaptée |
| Ajouter des villes non desservies | fiche diluée, avis hors zone |
| Modifier le nom ou l'adresse juste après vérification | nouvelle vérification, voire suspension |
| Multiplier les modifications la première semaine | fiche mise en examen |

---

## 5. Points à confirmer par le gérant avant de valider

| Point | Pourquoi | Ce que j'ai constaté |
|---|---|---|
| **Quartier** : « Charaf » ou « El Oulfa / Al Azhar » ? | Google déduit le quartier du pin ; le site affiche « Charaf » | les données cartographiques situent le point à El Oulfa / Al Azhar ; « Charaf » est peut-être un nom d'usage local |
| **Ce que montre la devanture** | le nom de la fiche doit correspondre à l'enseigne | « CUT & LOOK » et « Cabaret Barber Shop & Esthétique » doivent idéalement figurer tous les deux |
| **Code postal** | Google peut le préremplir | 20200 dans les données cartographiques — à confirmer sur une facture |
| **Entrée exacte** | le pin doit être sur la porte | à valider sur place en vue satellite |
| **Barbe / rasage** | ne pas annoncer un service inexistant | non mentionné sur le site, donc non ajouté |

---

## 6. Ensuite

1. Demander un avis à chaque client satisfait, le lendemain de la prestation (modèles prêts dans `ACTIONS-PROPRIETAIRES.md` §4).
2. Publier 2 à 4 photos par mois.
3. Répondre à **tous** les avis sous 48 h.
4. Une fois la fiche validée : créer la propriété Search Console et soumettre le sitemap
   (`ACTIONS-PROPRIETAIRES.md` §2) — les deux travaillent ensemble.
