#!/usr/bin/env bash
#
# set-domain.sh — change le domaine canonique du site partout.
#
# Usage :
#   ./tools/set-domain.sh https://cabaretshopesthetique.vercel.app
#   ./tools/set-domain.sh https://cutandlook.ma
#   ./tools/set-domain.sh https://yedicoco.github.io/Cabaret-Barber-Shop-Esthetique
#
# Le script réécrit canonical, og:url, JSON-LD, sitemap.xml et robots.txt.
# Sans argument, il affiche simplement le domaine actuellement configuré.

set -euo pipefail

cd "$(dirname "$0")/.."

CURRENT="$(grep -ho 'https://cabaretshopesthetique\.vercel\.app' index.html | head -1 || true)"
if [ -z "$CURRENT" ]; then
  CURRENT="$(grep -ho 'https://[^"<)]*' index.html | grep -v 'schema.org\|googletagmanager\|wa.me\|google.com\|w3.org' | head -1 || true)"
fi

if [ $# -eq 0 ]; then
  echo "Domaine actuellement configuré : ${CURRENT:-inconnu}"
  echo "Usage : ./tools/set-domain.sh https://votre-domaine.tld"
  exit 0
fi

NEW="${1%/}"
OLD="$CURRENT"

if [ -z "$OLD" ]; then
  echo "Impossible de détecter le domaine actuel." >&2
  exit 1
fi

if [ "$NEW" = "$OLD" ]; then
  echo "Rien à faire : le domaine est déjà $NEW"
  exit 0
fi

if ! printf '%s' "$NEW" | grep -Eq '^https://'; then
  echo "Le domaine doit commencer par https:// (reçu : $NEW)" >&2
  exit 1
fi

echo "Remplacement :"
echo "  ancien : $OLD"
echo "  nouveau: $NEW"
echo

FILES=$(grep -rl "$OLD" --include="*.html" --include="*.xml" --include="*.txt" . || true)

if [ -z "$FILES" ]; then
  echo "Aucun fichier ne contient $OLD" >&2
  exit 1
fi

COUNT_BEFORE=$(grep -ro "$OLD" --include="*.html" --include="*.xml" --include="*.txt" . | wc -l | tr -d ' ')

# sed -i diffère entre GNU (Linux) et BSD (macOS)
if sed --version >/dev/null 2>&1; then
  SED_INPLACE=(-i)
else
  SED_INPLACE=(-i '')
fi

echo "$FILES" | while IFS= read -r file; do
  sed "${SED_INPLACE[@]}" "s#${OLD}#${NEW}#g" "$file"
  echo "  mis à jour : $file"
done

COUNT_AFTER=$(grep -ro "$OLD" --include="*.html" --include="*.xml" --include="*.txt" . | wc -l | tr -d ' ')

echo
echo "$COUNT_BEFORE occurrences remplacées, $COUNT_AFTER restantes."
echo
echo "Étapes suivantes :"
echo "  1. Vérifier : grep -rc '$NEW' index.html sitemap.xml robots.txt"
echo "  2. Commit + push sur main (le déploiement GitHub Pages se fait automatiquement)."
echo "  3. Si le domaine est nouveau : le déclarer dans Vercel (Domains) et re-soumettre"
echo "     le sitemap dans Search Console."
echo "  4. Mettre à jour la fiche Google Business Profile avec la nouvelle URL."
