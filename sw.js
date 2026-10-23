/* =========================================================================
   SOLEIL BEAUJOLAIS — SERVICE WORKER
   -------------------------------------------------------------------------
   Deux comportements distincts :

   1. LE MOTEUR (index.html, sw.js, manifest.json) est mis en cache.
      Il ne change que rarement. Quand il change, il FAUT incrementer
      le numero de version ci-dessous : sb-v1 -> sb-v2, etc.

   2. LE CONTENU (config.js, tout le dossier images/ et les dossiers
      « CDJ News » et « CDJ Actus », mis a jour chaque semaine) est recupere
      en priorite depuis le reseau. Une modification de texte, de lien
      ou d'image apparait donc des le rechargement suivant, SANS avoir
      a toucher a la version. Le cache ne sert que de secours hors ligne.
   ========================================================================= */

var VERSION = "cdj-v16";

/* SOCLE : le strict necessaire au demarrage de l'application. Ces fichiers
   sont charges d'un bloc : si l'un d'eux manque sur GitHub, l'installation
   echoue ENTIEREMENT et l'application perd son fonctionnement hors ligne.
   N'ajouter ici que des fichiers dont on est certain qu'ils existent. */
var SOCLE = [
  "./",
  "./index.html",
  "./carousel.html",
  "./manifest.json",
  "./images/icone-192.png",
  "./images/icone-512.png"
];

/* PAGES : les pages de contenu, pre-chargees pour etre consultables hors
   ligne SANS avoir ete ouvertes au prealable. Elles sont lourdes (leur
   affiche est integree dans le fichier), environ 10,7 Mo au total.
   Elles sont chargees UNE PAR UNE et un echec est tolere : une page
   absente, renommee, ou une coupure de reseau en cours de telechargement
   n'empeche pas l'application de s'installer et de fonctionner.
   Pour ajouter une page : ecrire son nom ici, exactement comme sur GitHub
   (les majuscules comptent), et incrementer la VERSION ci-dessus. */
var PAGES = [
  "./MatchTdT.html",
  "./MissionCDJ.html",
  "./AgendaCDJ.html",
  "./ContactCDJ.html",
  "./CDJ%20Actus/CDJ%20Actus.html"
];

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(VERSION)
      .then(function (c) {
        return c.addAll(SOCLE).then(function () {
          return Promise.all(PAGES.map(function (u) {
            return c.add(u).catch(function () { /* page ignoree */ });
          }));
        });
      })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (noms) {
      return Promise.all(noms.map(function (n) {
        return n === VERSION ? null : caches.delete(n);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET") return;

  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // La page carrousel est identique quel que soit le paramètre « ?c= » :
  // on sert la version cachée (sans paramètre) pour que toutes les catégories
  // fonctionnent hors ligne dès la première visite de n'importe laquelle.
  if (url.pathname.slice(-13) === "carousel.html") {
    var clef = url.origin + url.pathname;
    e.respondWith(
      caches.match(clef).then(function (rep) {
        return rep || fetch(req).then(function (r) {
          var copie = r.clone();
          caches.open(VERSION).then(function (c) { c.put(clef, copie); });
          return r;
        });
      })
    );
    return;
  }

  var contenu = url.pathname.indexOf("config.js") !== -1 ||
                url.pathname.indexOf("/images/") !== -1 ||
                decodeURIComponent(url.pathname).indexOf("/CDJ News/") !== -1 ||
                decodeURIComponent(url.pathname).indexOf("/CDJ Actus/") !== -1;

  if (contenu) {
    /* reseau d'abord, cache en secours */
    e.respondWith(
      fetch(req).then(function (rep) {
        var copie = rep.clone();
        caches.open(VERSION).then(function (c) { c.put(req, copie); });
        return rep;
      }).catch(function () {
        return caches.match(req);
      })
    );
    return;
  }

  /* cache d'abord, reseau en secours */
  e.respondWith(
    caches.match(req).then(function (rep) {
      return rep || fetch(req).then(function (r) {
        var copie = r.clone();
        caches.open(VERSION).then(function (c) { c.put(req, copie); });
        return r;
      });
    }).catch(function () { return caches.match("./index.html"); })
  );
});
