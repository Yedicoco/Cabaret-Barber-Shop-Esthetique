#!/usr/bin/env bash
#
# optimize-images.sh — régénère les variantes WebP après ajout de photos réelles.
#
# Prérequis : ImageMagick (`magick` ou `convert`).
#   macOS  : brew install imagemagick
#   Ubuntu : sudo apt install imagemagick
#   Windows: installer ImageMagick puis utiliser WSL ou Git Bash
#
# Utilisation :
#   1. Déposer les photos dans assets/images/ en respectant les noms de fichiers :
#        cover-salon.jpg        (visuel principal — portrait, min. 1086 px de large)
#        hero-salon.jpg         (ambiance — paysage, min. 1376 px)
#        service-coiffure.jpg   (paysage 4:3, min. 1200 px)
#        service-tresses.jpg
#        service-dreadlocks.jpg
#        service-coloration.jpg
#        service-onglerie.jpg
#        service-visage.jpg
#        service-immobilier.jpg
#        service-aide-domicile.jpg
#   2. Lancer : ./tools/optimize-images.sh
#
# Les photos plus étroites que la largeur attendue sont signalées : elles
# produiront une image floue en grand écran.

set -euo pipefail

cd "$(dirname "$0")/.."
cd assets/images

if command -v magick >/dev/null 2>&1; then
  IM="magick"            # ImageMagick 7
  IM_IDENTIFY="magick identify"
elif command -v convert >/dev/null 2>&1 && command -v identify >/dev/null 2>&1; then
  IM="convert"           # ImageMagick 6
  IM_IDENTIFY="identify"
else
  echo "ImageMagick introuvable. Installez-le puis relancez." >&2
  exit 1
fi

width_of() { $IM_IDENTIFY -format "%w" "$1"; }

# fichier : largeurs attendues par le srcset du HTML
process() {
  local file="$1"; shift
  local widths=("$@")
  local base="${file%.jpg}"
  local native
  native="$(width_of "$file")"

  echo "$file (${native} px)"
  for w in "${widths[@]}"; do
    if [ "$native" -lt "$w" ]; then
      echo "   ⚠ source plus étroite que ${w} px — variante ignorée"
      rm -f "${base}-${w}.webp"
      continue
    fi
    "$IM" "$file" -resize "${w}x" -quality 76 -define webp:method=6 "${base}-${w}.webp"
    printf '   %s px → %s Ko\n' "$w" "$(( $(wc -c < "${base}-${w}.webp") / 1024 ))"
  done

  # JPEG de repli, allégé et sans métadonnées
  "$IM" "$file" -strip -interlace Plane -quality 82 -sampling-factor 4:2:0 "${base}.tmp.jpg"
  mv "${base}.tmp.jpg" "$file"
  printf '   repli JPEG : %s Ko\n' "$(( $(wc -c < "$file") / 1024 ))"
}

[ -f cover-salon.jpg ]        && process cover-salon.jpg        480 720 1086
[ -f hero-salon.jpg ]         && process hero-salon.jpg         640 1024 1376
for f in service-coiffure.jpg service-tresses.jpg service-dreadlocks.jpg \
         service-coloration.jpg service-onglerie.jpg service-visage.jpg \
         service-immobilier.jpg service-aide-domicile.jpg; do
  [ -f "$f" ] && process "$f" 480 800 1200
done

echo
echo "Terminé. Vérifiez ensuite :"
echo "  - le poids total : du -sh assets/images"
echo "  - le rendu sur mobile et ordinateur"
echo "  - que chaque alt d'image décrit bien la photo réelle (fichiers HTML)"
echo
echo "Pensez à remplacer les mentions « Visuel d'illustration » dans les pages"
echo "prestations une fois les vraies photos en place."
