/* =========================================================================
   COMITÉ DE JUMELAGE BELLEVILLE — SALZKOTTEN — FICHIER DE CONTENU
   =========================================================================
   C'est le SEUL fichier à modifier pour faire vivre l'application.
   Le fichier index.html est le moteur : il n'a pas à être touché.

   Règles d'écriture :
     - chaque valeur texte est entre guillemets droits : "comme ceci"
     - une apostrophe dans un texte ne pose aucun problème : "l'amitié"
     - chaque ligne se termine par une virgule, sauf la dernière d'un bloc
     - les chemins d'images commencent toujours par ./images/
     - pour masquer une section entière : afficher: false
     - pour décaler un texte, saisir des espaces juste devant sa valeur :
       ils sont affichés tels quels (voir le GUIDE, § « décaler un texte »).

   Après modification : enregistrer le fichier, le renvoyer sur GitHub,
   puis recharger l'application. Aucune autre manipulation n'est nécessaire
   (config.js et images/ sont rechargés depuis le réseau à chaque ouverture).
   ========================================================================= */

window.SB_CONFIG = {

  /* -----------------------------------------------------------------------
     1. IDENTITÉ
     ----------------------------------------------------------------------- */
  identite: {
    nom: "Comité de Jumelage",
    baseline: "Belleville-en-Beaujolais · Salzkotten",
    logo: "./images/logo.png",
    lienLogo: "https://jumelagebellevillesalzkotten.wordpress.com/"
  },

  /* -----------------------------------------------------------------------
     2. BANNIÈRE
     Image pleine largeur en haut de l'écran, affichée en ENTIER (son format
     est respecté, il n'y a aucun recadrage). Fournir de préférence une image
     déjà au bon rapport largeur/hauteur.
     ----------------------------------------------------------------------- */
  banniere: {
    afficher: true,
    image: "./images/banniere.jpg",
    texteAlternatif: "Comité de jumelage Belleville-en-Beaujolais et Salzkotten",
    lien: "https://jumelagebellevillesalzkotten.wordpress.com/"
  },

  /* -----------------------------------------------------------------------
     3. À LA UNE
     ----------------------------------------------------------------------- */
  alaune: {
    afficher: true,
    titreSection: "À la une",
    texte: "Ascension 2027 - Match de tennis de table",
    image: "./images/alaune.png",
    lien: "./MatchTdT.html"
  },

  /* -----------------------------------------------------------------------
     4. PAVÉS — COMITÉ DE JUMELAGE
     ----------------------------------------------------------------------- */
  paves: {
    afficher: true,
    titreSection: "Comité de jumelage",
    liste: [
      {
        texte: "",
        image: "./images/pave/mission.png",
        lien: "./MissionCDJ.html"
      },
      {
        texte: "",
        image: "./images/pave/agenda.png",
        lien: "./AgendaCDJ.html"
      },
      {
        texte: "",
        image: "./images/pave/contact.png",
        lien: "./ContactCDJ.html"
      }
    ]
  },

  /* -----------------------------------------------------------------------
     5. ACTUS
     Actualités des jumelages franco-allemands, publiées chaque semaine.
     Même structure que « À la une » et « News » : un logo, un texte, un lien.
     Pour masquer cette zone : afficher: false
     ----------------------------------------------------------------------- */
  actus: {
    afficher: true,
    titreSection: "Actus",
    texte: "Actualités Franco/Allemandes",
    image: "./images/actus.png",
    lien: "./CDJ%20Actus/CDJ%20Actus.html"
  },

  /* -----------------------------------------------------------------------
     6. NEWS
     Même structure que « À la une » : un logo, un texte, un lien.
     Pour masquer cette zone : afficher: false
     ----------------------------------------------------------------------- */
  news: {
    afficher: true,
    titreSection: "News",
    texte: "News de l'univers des jumelages",
    image: "./images/news.png",
    lien: "https://mvivier69.github.io/CDJ/CDJ%20News/CDJ%20News%20-%20Synth%C3%A8se.html"
  },

  /* -----------------------------------------------------------------------
     7. GALERIE PHOTOS
     Chaque pavé ouvre un carrousel (page carousel.html) qui affiche
     automatiquement les photos de son dossier.

     COMMENT LE LIEN FONCTIONNE
       Le paramètre « c= » du lien doit correspondre EXACTEMENT, majuscules
       comprises, à une clé déclarée dans CATEGORIES, en tête de
       carousel.html. Si le nom ne correspond pas, le carrousel retombe
       silencieusement sur sa catégorie par défaut : le pavé semble marcher
       mais montre les mauvaises photos.

       lien du pavé     clé dans carousel.html   dossier des photos
       ---------------  -----------------------  ---------------------------
       ?c=Jumelage      Jumelage                 images/galerie/jumelage/
       ?c=DinerBlanc    DinerBlanc               images/galerie/dinerblanc/
       ?c=FeteBiere     FeteBiere                images/galerie/fetebiere/
       ?c=Souvenirs     Souvenirs                images/galerie/souvenirs/
       ?c=Tennis        Tennis                   images/galerie/tennis/
       ?c=Deutsch       Deutsch                  images/galerie/deutsch/
       ?c=Sorties       Sorties                  images/galerie/sorties/

     Les quatre premiers pavés s'affichent sur UNE SEULE LIGNE.
     Les deux derniers sont prêts mais masqués : passer leur « afficher »
     à true suffit à les activer (ils iront alors à la ligne suivante).
     ----------------------------------------------------------------------- */
  galerie: {
    afficher: true,
    titreSection: "Galerie photos",
    liste: [
      { legende: "", image: "./images/galerie/jumelage.png",  lien: "./carousel.html?c=Jumelage" },
      { legende: "", image: "./images/galerie/diner.png",     lien: "./carousel.html?c=DinerBlanc" },
      { legende: "", image: "./images/galerie/biere.png",     lien: "./carousel.html?c=FeteBiere" },
      { legende: "", image: "./images/galerie/souvenirs.png", lien: "./carousel.html?c=Souvenirs" },

      /* --- réservés pour plus tard : mettre afficher à true pour activer --- */
      { legende: "", image: "./images/galerie/tennis.png",  lien: "./carousel.html?c=Tennis",  afficher: false },
      { legende: "", image: "./images/galerie/deutsch.png", lien: "./carousel.html?c=Deutsch", afficher: false }
    ]
  },

  /* -----------------------------------------------------------------------
     8. INFOS PRATIQUES
     ----------------------------------------------------------------------- */
  infos: {
    afficher: true,
    titreSection: "Infos pratiques",
    adresse: {
      afficher: true,
      intitule: "Comité de Jumelage",
      lignes: [
        "105 rue de la République",
        "69220 Belleville-en-Beaujolais"
      ]
    },
    telephone: {
      afficher: true,
      intitule: "Stéphane Schackis",
      numero: "06 01 45 71 81"
    },
    mail: {
      afficher: true,
      /* texte affiché juste avant l'adresse ; laisser "" pour n'afficher que l'adresse */
      intitule: "Ecrire au CDJ",
      adresse: "comitejumelagebelleville@gmail.com"
    }
  },

  /* -----------------------------------------------------------------------
     9. LIENS
     ----------------------------------------------------------------------- */
  liens: {
    afficher: true,
    titreSection: "Liens",
    liste: [
      { texte: "Facebook", lien: "https://www.facebook.com/profile.php?id=100064649531361", afficher: true }
    ]
  },

  /* -----------------------------------------------------------------------
     10. CARTE D'INSTALLATION
     ----------------------------------------------------------------------- */
  installation: {
    afficher: true,
    titre: "Installer l'application",
    texte: "Ajoutez le Comité de Jumelage à votre écran d'accueil pour y accéder en un geste.",
    libelleBouton: "Installer",
    position: "bas",
    permettreFermeture: true
  },

  /* -----------------------------------------------------------------------
     11. PIED DE PAGE
     ----------------------------------------------------------------------- */
  piedDePage: {
    afficher: true,
    texte: "Comité de Jumelage Belleville — Salzkotten",
    lien: "https://jumelagebellevillesalzkotten.wordpress.com/"
  },

  /* -----------------------------------------------------------------------
     12. COULEURS
     Relevées sur les fichiers fournis : bleu marine du logo et des
     pictogrammes, bleu et ambre de la bannière (thème franco-allemand).
     ----------------------------------------------------------------------- */
  couleurs: {
    principale: "#003084",   /* bleu de la bannière        */
    accent:     "#F09C00",   /* ambre de la bannière       */
    encre:      "#1C2340",    /* bleu marine du logo, textes */
    fond:       "#F5F8FC",   /* fond général               */
    carte:      "#FFFFFF"     /* fond des pavés             */
  }

};
