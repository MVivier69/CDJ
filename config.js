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
    nom: "Comité de Jumelage Belleville Salzkotten",
    baseline: "Belleville-en-Beaujolais · Salzkotten",
    logo: "./images/logo.png",
    lienLogo: "https://jumelagebellevillesalzkotten.wordpress.com"
  },

  /* -----------------------------------------------------------------------
     2. BANNIÈRE
     ----------------------------------------------------------------------- */
  banniere: {
    afficher: true,
    image: "./images/banniere.jpg",
    texteAlternatif: "Comité de jumelage Belleville-en-Beaujolais et Salzkotten",
    hauteur: 185,
    lien: "https://jumelagebellevillesalzkotten.wordpress.com"
  },

  /* -----------------------------------------------------------------------
     3. À LA UNE
     ----------------------------------------------------------------------- */
  alaune: {
    afficher: true,
    titreSection: "À la une",
    texte: "Fête de la Bière - 10 octobre 2026",
    image: "./images/alaune.jpg",
    lien: "./fete-biere.html"
  },

  /* -----------------------------------------------------------------------
     4. PAVÉS — COMITÉ DE JUMELAGE
     ----------------------------------------------------------------------- */
  paves: {
    afficher: true,
    titreSection: "Comité de jumelage",
    liste: [
      {
        texte: "Mission",
        image: "./images/pave/mission.png",
        lien: "https://www.facebook.com/profile.php?id=100064649531361&sk=about"
      },
      {
        texte: "Planning",
        image: "./images/pave/planning.png",
        lien: "https://www.facebook.com/profile.php?id=100064649531361&sk=events"
      },
      {
        texte: "Contact",
        image: "./images/pave/contact.png",
        lien: "https://form.jotform.com/262192300967357"
      }
    ]
  },

  /* -----------------------------------------------------------------------
     5. GALERIE PHOTOS
     Chaque vignette utilise un logo « appareil photo » ; l'appui ouvre la
     photo correspondante (fichier image, dans le dossier galerie).
     ----------------------------------------------------------------------- */
  galerie: {
    afficher: true,
    titreSection: "Galerie photos",
    liste: [
      {
        legende: "Sortie à Europapark",
        image: "./images/galerie/photo-1.jpg",
        lien: "./images/galerie/photo-1-image.jpg"
      },
      {
        legende: "Souvenirs de voyage",
        image: "./images/galerie/photo-2.jpg",
        lien: "./images/galerie/photo-2-image.jpg"
      },
      {
        legende: "Match Tennis de Table Salzkotten",
        image: "./images/galerie/photo-3.jpg",
        lien: "./images/galerie/photo-3-image.jpg"
      }
    ]
  },

  /* -----------------------------------------------------------------------
     6. INFOS PRATIQUES
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
     7. LIENS
     ----------------------------------------------------------------------- */
  liens: {
    afficher: true,
    titreSection: "Liens",
    liste: [
      { texte: "Facebook", lien: "https://www.facebook.com/profile.php?id=100064649531361", afficher: true }
    ]
  },

  /* -----------------------------------------------------------------------
     8. CARTE D'INSTALLATION
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
     9. PIED DE PAGE
     ----------------------------------------------------------------------- */
  piedDePage: {
    afficher: true,
    texte: "Comité de Jumelage Belleville — Salzkotten",
    lien: "https://jumelagebellevillesalzkotten.wordpress.com/"
  },

  /* -----------------------------------------------------------------------
     10. COULEURS
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
