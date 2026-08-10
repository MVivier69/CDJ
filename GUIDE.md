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
| `fete-biere.html` | Page « À la une » affichant l'affiche | Rarement |
| `galerie-tt.html` | Carrousel des 9 photos (ouvert par la vignette 3) | Rarement |
| `manifest.json` | Nom, icône et couleurs de l'application installée | Rarement |
| `GUIDE.md` | Ce document | — |

Arborescence des images :

```
images/
  logo.png              logo « Place de l'amitié » (poignée de main)
  banniere.jpg          bandeau pleine largeur
  alaune.jpg            vignette de l'encart « Fête de la Bière »
  fetebiere-2.jpg       affiche affichée par la page fete-biere.html
  icone-192.png         icône de l'application installée (fournie)
  icone-512.png         icône haute définition (fournie)
  pave/                 mission · planning · contact  (pictogrammes PNG créés sur mesure)
  galerie/              photo-1..3.jpg = vignettes « appareil photo »
                        photo-1..2-image.jpg = photos ouvertes au clic (vignettes 1 et 2)
                        tt/tt-1..9.jpg = les 9 photos du carrousel (vignette 3)
```

Sections affichées, dans l'ordre : bannière et identité · **À la une** ·
**Comité de jumelage** (Mission · Planning · Contact) · **Galerie photos** (3 vignettes) ·
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
| `index.html`, `sw.js`, une page `.html` ou les **icônes** | incrémenter la version dans `sw.js` : `cdj-v6` → `cdj-v7` |

---

## 6. Contrôles effectués sur cette version

**Liens** — vérifiés en direct. OneDrive (Planning) et Jotform (Contact)
répondent `200`. Le lien Facebook « événements » (Mission) renvoie `400` à un
appel automatisé : c'est la réponse habituelle de Facebook aux robots (la page
de base répond `200`). Il n'a donc pas pu être confirmé par programme — à
vérifier d'un simple tap. Les liens de la galerie et de « À la une » sont
internes (fichiers de l'application).

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

2. **Ligne téléphone.** Le nom « Stéphane Schackis » et le numéro
   « 06 01 45 71 81 » sont sur la même ligne, le numéro à côté du nom ;
   l'appui déclenche l'appel. Sur les très petits écrans (largeur ≤ 320 px),
   le numéro passe proprement à la ligne suivante, sans jamais être coupé.

3. **Sous-titre.** Le nom officiel étant long, j'ai ajouté sous le titre la
   mention « Belleville-en-Beaujolais · Salzkotten », qui figure sur le logo.
   Pour la retirer, vider la valeur `identite.baseline` (`baseline: ""`).

### Bannière plein format

La bannière s'affiche désormais **en entier**, à son format naturel, sans
aucun recadrage : la ligne « Belleville-en-Beaujolais & Salzkotten » du bas
reste toujours visible, quelle que soit la largeur de l'écran. Sa hauteur
s'ajuste automatiquement au rapport de l'image ; il n'y a plus de réglage de
hauteur à faire dans `config.js`. Pour changer la bannière, remplacer
`images/banniere.jpg` (idéalement au même rapport largeur/hauteur).

### Logo et icônes fournis

Le logo `logo.png` et les deux icônes d'installation `icone-192.png` /
`icone-512.png` que vous avez fournis sont utilisés **tels quels** (les icônes
ne sont plus générées automatiquement). Pour les changer, remplacer les
fichiers correspondants en conservant leurs noms.

### Galerie : la 3ᵉ vignette ouvre un carrousel

Les deux premières vignettes (Europapark, Souvenirs de voyage) ouvrent chacune
leur photo. La **3ᵉ vignette** (Match Tennis de Table) ouvre un **carrousel**
des 9 photos, sur la page `galerie-tt.html` : flèches, points, bande de
miniatures, glissement tactile et flèches du clavier, et bouton « Retour ».

**Le carrousel est dynamique** : il lit automatiquement le dossier
`images/galerie/tt/`, quel que soit le nombre de photos. Il n'y a plus aucun
nombre à régler.

Deux mécanismes se complètent, sans rien coder :

1. **Sur GitHub Pages** — le dossier est listé via l'API GitHub (dépôt
   public). Vous pouvez déposer les photos avec **n'importe quel nom**, en
   n'importe quel nombre ; elles apparaissent, triées par nom. Pour maîtriser
   l'ordre, préfixez les noms : `01-...`, `02-...`, `03-...`
2. **Ailleurs, ou si l'API n'est pas joignable** — repli automatique qui teste
   `tt-1.jpg`, `tt-2.jpg`, … (ou `1.jpg`, `2.jpg`, …) jusqu'à la première
   manquante. Il faut alors des noms **numérotés qui se suivent, sans trou**.

Points de fonctionnement à connaître :

- **Une seule photo** : les flèches, points et miniatures disparaissent d'eux-mêmes.
- **Aucune photo** : un message « Aucune photo pour le moment. » s'affiche.
- Le repli produit **un seul `404` en fin de liste** (la façon de repérer la
  dernière photo) : c'est normal, invisible à l'écran, sans effet.
- Les réglages (dossier, branche, préfixe du repli, ou une liste figée) sont
  regroupés et commentés en tête du script de `galerie-tt.html`, sous
  `REGLAGES`. La branche par défaut est `main` ; si votre dépôt utilise
  `master`, changer cette valeur.
- Les photos issues de smartphones sont **remises à l'endroit** (orientation
  EXIF appliquée) pour éviter tout affichage couché. Si vous ajoutez des
  photos via l'interface GitHub, la plupart des navigateurs respectent
  l'orientation ; en cas de photo couchée, la faire pivoter avant de la
  déposer.

### « À la une » : page de l'affiche

« À la une » n'ouvre plus Facebook mais une page interne, `fete-biere.html`,
qui affiche l'affiche `fetebiere-2.jpg` en grand, avec un bouton
« Retour à l'application ». Pour changer l'affiche, remplacer le fichier
`images/fetebiere-2.jpg` (même nom) ; pour changer le texte de la page,
éditer `fete-biere.html`.

### Liens internes et externes

Le moteur distingue désormais deux cas :

- **lien externe** (commence par `http`, `tel:` ou `mailto:`) : s'ouvre dans
  un **nouvel onglet**, en préservant l'application ouverte ;
- **lien interne** (chemin relatif de l'application, comme `./fete-biere.html`
  ou une image de la galerie) : s'ouvre dans le **même onglet**, pour rester
  dans l'application et permettre un retour naturel.

Cette distinction est automatique, il n'y a rien à régler dans `config.js`.

### Galerie : vignettes et photos

Chaque vignette de la galerie utilise un logo « appareil photo »
(`photo-1.jpg` à `photo-3.jpg`, mis au format carré sur fond blanc) ; l'appui
ouvre la photo correspondante (`photo-1-image.jpg` à `photo-3-image.jpg`).
Les légendes — Europapark, Souvenirs de voyage, Match Tennis de Table
Salzkotten — ont été conservées de la version précédente ; elles se changent
dans `galerie.liste`.

### Logo « Place de l'amitié »

Le logo de l'en-tête est celui que vous avez fourni (`logo.png`) : le
médaillon bleu à la poignée de main franco-allemande et au texte
« Place de l'amitié ». Les icônes d'installation ont été régénérées à partir
de ce logo.

### Ancien logo « Place de l'Amitié » (médaillon dessiné)

> Remplacé par le logo à la poignée de main ci-dessus ; conservé ici pour
> mémoire, et disponible dans `logo-place-amitie/` si vous souhaitez y revenir.

Ce médaillon avait été recréé à partir du panneau de rue fourni : un
médaillon émaillé bleu français, bordure blanche à double filet (comme la
plaque), portant les deux textes conservés — **BELLEVILLE · SALZKOTTEN** en
arc supérieur et **Place de l'Amitié** au centre (« PLACE » en capitales
serif, « de l'Amitié » en anglaise). Le motif franco-allemand est donné par
deux petits cœurs — tricolore français et noir-rouge-or allemand — et par un
rameau de laurier doré.

L'orthographe exacte du panneau (**SALZKOTTEN**) a été rétablie. Le séparateur
est un point médian « · » à la place du tiret, choix purement graphique ;
il se change dans le fichier source si besoin.

Le logo est fourni à part dans `logo-place-amitie/` : PNG 1024 et 512, et le
**SVG** source (vectoriel, modifiable sans perte — couleurs, textes, polices).
Polices utilisées : Playfair Display (serif) et Great Vibes (anglaise),
toutes deux libres (SIL Open Font License).

### Pictogrammes des pavés

Les trois pavés **Mission**, **Agenda** et **Contact** utilisent des
pictogrammes dessinés sur mesure (PNG 350 × 350, fond transparent), pensés
comme un ensemble : même style plat, mêmes coins arrondis, et une palette
franco-allemande commune — bleu français `#003084`, rouge `#CE1126` (commun
aux deux drapeaux) et or allemand `#F2A100` (proche de l'accent de l'app),
avec du bleu marine `#1C2340` pour les détails. Cette palette est celle de
l'application, ce qui fait tenir l'ensemble visuellement.

Les fichiers sources (SVG) et les PNG sont fournis à part dans le dossier
`logos-pave/` : les SVG permettent de retoucher ou recolorer les
pictogrammes proprement, sans perte, si besoin.

### Présentation des infos pratiques

Depuis cette version, les infos pratiques ne portent plus de libellé texte
(ADRESSE / TÉLÉPHONE / COURRIEL) : chaque ligne est identifiée par son seul
pictogramme (épingle, téléphone, enveloppe). Trois réglages dans `config.js` :

- **Adresse** : `intitule` (en gras) puis les `lignes` en dessous ; l'appui
  ouvre le plan.
- **Téléphone** : `intitule` (le nom) et `numero` s'affichent côte à côte.
- **Courriel** : `intitule` (ici « Ecrire au CDJ ») s'affiche juste avant
  l'adresse ; laisser `intitule: ""` pour n'afficher que l'adresse.

Par ailleurs, les photos de la galerie sont au format paysage (500 × 250) et
sont donc recadrées en carré, centré, pour s'aligner en grille. Si un sujet
important se trouve sur un bord d'une photo, il vaut mieux fournir une version
déjà carrée de cette image.
