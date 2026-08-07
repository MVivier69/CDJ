# Comité de Jumelage Belleville — Salzkotten — application smartphone

Application web installable (PWA), construite sur la même architecture que
`usine-asso` et `soleil-beaujolais` : un moteur figé, un fichier de contenu,
un dossier d'images.

---

## 1. Ce que contient l'archive

| Fichier / dossier | Rôle | À modifier ? |
|---|---|---|
| `config.js` | **Tout le contenu** : textes, images, liens, couleurs | **Oui, c'est le seul** |
| `images/` | Les images, rangées par section | Oui |
| `index.html` | Le moteur : structure, styles, logique d'affichage | Non |
| `sw.js` | Service worker : cache et fonctionnement hors ligne | Non, sauf § 5 |
| `manifest.json` | Nom, icône et couleurs de l'application installée | Rarement |
| `GUIDE.md` | Ce document | — |

Arborescence des images :

```
images/
  logo.jpg              logo rond, en-tête
  banniere.jpg          bandeau pleine largeur
  alaune.jpg            encart « Fête de la Bière »
  icone-192.png         icône de l'application installée
  icone-512.png         icône haute définition
  pave/                 mission · agenda · contact
  galerie/              photo-1 (Europapark) · photo-2 · photo-3
```

Sections affichées, dans l'ordre : bannière et identité · **À la une** ·
**Comité de jumelage** (3 pavés) · **Galerie photos** (3 photos) ·
**Infos pratiques** · **Liens** · pied de page.

---

## 2. Mise en ligne sur GitHub Pages

Tout se fait depuis l'interface web de GitHub, sans ligne de commande.

1. Créer un dépôt **public**, par exemple `jumelage-belleville-salzkotten`.
2. `Add file` → `Upload files` : déposer le **contenu** du dossier
   (`index.html`, `config.js`, `sw.js`, `manifest.json`, `GUIDE.md` et le
   dossier `images`), et non le dossier lui-même.
3. `Settings` → `Pages` → *Source* : **Deploy from a branch**,
   branche `main`, dossier `/ (root)` → `Save`.
4. Au bout d'une à deux minutes, l'adresse est du type :
   `https://mvivier69.github.io/jumelage-belleville-salzkotten/`

Tous les chemins internes sont relatifs (`./`) : l'application fonctionne à la
racine d'un domaine comme dans un sous-dossier. HTTPS, fourni d'origine par
GitHub Pages, est indispensable à l'installation et au hors ligne.

---

## 3. Modifier le contenu

Ouvrir `config.js` sur GitHub, cliquer sur le crayon, modifier, `Commit changes`.

| Objectif | Où intervenir |
|---|---|
| Changer un texte ou un lien | la valeur correspondante dans `config.js` |
| Remplacer une image | déposer le nouveau fichier dans `images/…` **sous le même nom** |
| Ajouter un pavé | ajouter un bloc `{ texte, image, lien }` dans `paves.liste` |
| Ajouter une photo | ajouter un bloc dans `galerie.liste` |
| Ajouter un lien | ajouter un bloc dans `liens.liste` |
| Masquer une section | `afficher: false` en tête de la section |
| Décaler un texte | ajouter des espaces directement devant la valeur (voir § 8) |
| Changer les couleurs | bloc `couleurs` en fin de fichier |

`config.js` et le dossier `images/` sont récupérés **depuis le réseau à chaque
ouverture** : une modification apparaît dès le rechargement suivant.

---

## 4. Installer l'application sur un téléphone

La carte d'installation est **contextuelle** : elle ne s'affiche que si
l'installation peut réellement aboutir.

| Situation | Ce qui s'affiche |
|---|---|
| Android / Chrome | un bouton **Installer** déclenchant l'invite du système |
| iPhone / iPad (Safari) | la marche à suivre : *Partager* → *Sur l'écran d'accueil* |
| Navigateur intégré Facebook ou Instagram | une invitation à rouvrir la page dans Safari ou Chrome |
| Application déjà installée | rien |
| Ordinateur sans invite | rien |

Le cas Facebook est important ici : la page « À la une » et le lien « Liens »
renvoient vers Facebook. Depuis le navigateur intégré de l'application
Facebook, l'installation échoue ; un message invite alors à rouvrir la page
dans le navigateur du téléphone.

Si la personne ferme la carte, elle ne réapparaît plus. Pour la réafficher,
changer la valeur de `installation.titre` dans `config.js`, ou passer
`permettreFermeture: false`.

---

## 5. Quand faut-il incrémenter la version du cache ?

| Fichier modifié | Action |
|---|---|
| `config.js` ou `images/` | **rien** — repris depuis le réseau |
| `index.html` ou `sw.js` | incrémenter la version dans `sw.js` : `cdj-v1` → `cdj-v2` |

---

## 6. Contrôles effectués sur cette version

**Liens** — les trois adresses distinctes ont été appelées le 24 juillet 2026 :
le site Soleil Beaujolais, la page Facebook du comité
(`profile.php?id=100064649531361`) et le blog WordPress du jumelage. Toutes
répondent `200`.

**Rendu** — mesures au pixel dans un navigateur réel (Chromium via Playwright,
`device_scale_factor: 2`) sur neuf largeurs d'écran (300 → 768 px) : aucun
débordement horizontal, aucune image manquante, aucune erreur JavaScript,
aucun contenu ne touche le bord.

**Comportement** — contrôles automatisés dans un DOM réel (jsdom) : titre,
sous-titre, trois pavés, trois vignettes légendées, absence de section Watts
News, trois lignes d'infos pratiques, un lien Facebook, destinations exactes
de chaque lien, liens `tel:` et `mailto:` propres, cinq scénarios
d'installation, masquage de section, échappement des caractères spéciaux.

**Syntaxe** — `config.js`, `sw.js` et `manifest.json` validés.

---

## 7. Couleurs

Relevées directement sur les fichiers fournis, non choisies arbitrairement :

| Rôle | Valeur | Origine |
|---|---|---|
| Principale | `#003084` | bleu de la bannière (drapeau français) |
| Accent | `#F09C00` | ambre de la bannière |
| Encre | `#1C2340` | bleu marine du logo et des pictogrammes |
| Fond | `#F5F8FC` | déclinaison très claire du bleu |
| Carte | `#FFFFFF` | — |

---

## 8. Décaler un texte avec des espaces

Les espaces se saisissent directement dans `config.js`, devant la valeur : ils
sont restitués tels quels (le moteur convertit les espaces de début, de fin ou
groupés en espaces insécables, qu'un navigateur affiche sans les regrouper).
Aucun retrait n'a été appliqué sur cette application ; la possibilité reste
disponible si besoin.

---

## 9. Points à vérifier de votre côté

Trois éléments ont été repris **exactement** tels que transmis, mais méritent
une relecture :

1. **Lien du logo.** Le logo du comité renvoie vers `https://soleilbeaujolais.fr/`,
   et non vers le blog du jumelage. C'est l'adresse que vous avez indiquée ;
   je l'ai conservée. Si l'intention était de pointer vers le site du comité,
   remplacer `identite.lienLogo` par
   `https://jumelagebellevillesalzkotten.wordpress.com/`.

2. **Ligne « Contact » des infos pratiques.** Vous l'aviez intitulée
   « Contact : Stéphane Schackis - 06 01 45 71 81 ». Comme il s'agit d'un
   numéro de téléphone, la ligne est présentée avec l'étiquette
   **« Téléphone »**, le nom « Stéphane Schackis » affiché au-dessus du
   numéro, et l'appui déclenche l'appel. Si vous préfériez l'étiquette
   « Contact », c'est une petite adaptation du moteur — dites-le-moi.

3. **Sous-titre.** Le nom officiel étant long, j'ai ajouté sous le titre la
   mention « Belleville-en-Beaujolais · Salzkotten », qui figure sur le logo.
   Pour la retirer, vider la valeur `identite.baseline` (`baseline: ""`).

Par ailleurs, les photos de la galerie sont au format paysage (500 × 250) et
sont donc recadrées en carré, centré, pour s'aligner en grille. Si un sujet
important se trouve sur un bord d'une photo, il vaut mieux fournir une version
déjà carrée de cette image.
