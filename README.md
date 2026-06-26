# 🏆 Pronostics Coupe du Monde 2026 — Association Multisport Brochard

Application web **mono-fichier** (`index.html`) de pronostics sur la Coupe du Monde 2026,
pour les 120 collaborateurs. **Données centralisées via Firebase** (gratuit) : plus aucun code
à s'échanger, le classement se construit tout seul.

- **Phase 1** — phase de poules : pronostic des scores des 72 matchs (ouvert dès maintenant).
- **Phase 2** — phase finale : pronostic des scores, matchs créés par l'organisateur dès que
  les qualifiés sont connus.
- **Règle de fermeture** : chaque match se ferme aux pronostics **à son coup d'envoi**.
- **Barème** : bonne issue **+1** · score exact **+3**. Pas de bonus finaliste/champion.

---

## ⚙️ Étape 1 — Créer la base Firebase (gratuit, ~10 min, une seule fois)

1. Allez sur **https://console.firebase.google.com** et connectez-vous (compte Google).
2. **Ajouter un projet** → nom `pronostics-brochard` → créez-le (vous pouvez désactiver Google Analytics).
3. Dans le menu de gauche : **Créer → Firestore Database** → **Créer une base de données**.
   - Choisissez **Démarrer en mode test** (accès ouvert).
   - Emplacement : `eur3 (europe-west)`.
4. Récupérez la configuration :
   - Roue crantée ⚙️ (en haut à gauche) → **Paramètres du projet**.
   - Onglet **Général** → section **Vos applications** → cliquez sur l'icône **`</>`** (Web).
   - Donnez un surnom (`web`) → **Enregistrer**. Firebase affiche un bloc `const firebaseConfig = { … }`.
5. **Copiez les valeurs** (`apiKey`, `authDomain`, `projectId`, etc.) et collez-les dans `index.html`
   à l'endroit indiqué `🔥 CONFIGURATION FIREBASE` (remplacez les `"VOTRE_…"`).

> Tant que ce bloc n'est pas rempli, l'app tourne en **mode local (test)** : tout fonctionne
> mais les données restent sur un seul appareil. Une bannière vous le rappelle.

### Règles de sécurité (mode test)
Le mode test ouvre l'accès en lecture/écriture pendant 30 jours. Pour couvrir toute la durée du
tournoi, dans **Firestore → Règles**, collez ceci puis **Publier** :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 8, 1);
    }
  }
}
```

> Jeu interne à faible enjeu : l'accès reste simple, mais chaque joueur protège son compte par un
> **code secret** (haché côté application). Le verrouillage au coup d'envoi et l'identité de chaque
> joueur sont gérés côté application.
>
> ⚠️ Limite connue : ces règles « mode test » laissent la base **lisible** par quiconque a l'URL.
> Le code secret bloque l'usurpation courante (se connecter à la place d'un collègue), mais n'est pas
> une protection cryptographique forte contre quelqu'un qui lirait directement la base. Pour une
> sécurité réelle, il faudrait activer **Firebase Authentication** et durcir les règles Firestore.

---

## ⚙️ Étape 2 — Déployer sur GitHub Pages (tout depuis le site, sans logiciel)

> ⚠️ Le fichier doit s'appeler **exactement `index.html`** (minuscules) et se trouver **à la racine**
> du dépôt (visible directement dans la liste des fichiers, pas dans un sous-dossier).

### 2.1 — Mettre le fichier `index.html` dans le dépôt

**A) Si votre dépôt est vide ou contient un mauvais fichier (ex. `AMB`) :**

1. Ouvrez votre dépôt `pronostics-brochard` sur **github.com**.
2. Supprimez l'ancien fichier s'il y en a un de mauvais :
   - cliquez sur le fichier (ex. `AMB`) → icône **corbeille 🗑️** (ou bouton **⋯ → Delete file**) ;
   - tout en bas, bouton vert **« Commit changes »**, puis encore **« Commit changes »**.
3. Revenez à l'accueil du dépôt (cliquez sur son nom en haut), puis :
   **« Add file » ▸ « Upload files »** (bouton en haut à droite, en français « Ajouter un fichier ▸ Téléverser des fichiers »).
4. Dans l'explorateur Windows, ouvrez votre **Bureau**, sélectionnez le fichier **`index.html`**
   et **glissez-le** dans la zone de dépôt de la page (ou cliquez sur **« choose your files »**).
5. Vérifiez que le nom affiché est bien **`index.html`**, puis cliquez sur **« Commit changes »**.

> ✅ De retour sur l'accueil du dépôt, vous devez voir **`index.html`** tout en haut de la liste.

**B) Pour mettre à jour le fichier plus tard** (nouvelle version) : même chose — **Add file ▸ Upload files**,
glissez le nouveau `index.html`, **Commit changes**. GitHub remplace l'ancien automatiquement.

### 2.2 — Activer GitHub Pages

1. Dans le dépôt, cliquez sur **« Settings »** (Paramètres, onglet tout à droite du menu du dépôt
   — pas les réglages de votre compte).
2. Dans le menu de gauche, cliquez sur **« Pages »**.
3. Sous **« Build and deployment » ▸ « Source »**, choisissez **« Deploy from a branch »**
   (Déployer depuis une branche).
4. Juste en dessous, **« Branch »** : sélectionnez **`main`** (ou **`principal`** selon le nom affiché),
   et le dossier **`/ (root)`**. Cliquez sur **« Save »**.
5. Une bannière apparaît. **Patientez 1 à 2 minutes**, puis **rechargez la page Settings ▸ Pages** :
   GitHub affiche en haut **« Your site is live at … »** avec un lien.

### 2.3 — Ouvrir et partager

- L'adresse est de la forme :
  `https://VOTRE-COMPTE.github.io/pronostics-brochard/`
  (remplacez `VOTRE-COMPTE` par votre identifiant GitHub).
- Ouvrez-la (faites **Ctrl + F5** si vous voyez encore une erreur 404, le temps que la mise en ligne se termine).
- Copiez ce lien et diffusez-le aux 120 collaborateurs (mail / Teams).

> 💡 Erreur **404 « Fichier introuvable »** ? Trois causes possibles : (1) la mise en ligne n'est pas
> encore terminée → attendez 2 min et rechargez ; (2) le fichier ne s'appelle pas exactement
> `index.html` ; (3) il n'est pas à la racine du dépôt. Corrigez puis re-testez.

---

## 🎮 Utilisation

### Collaborateur — onglet « 🎯 Je joue »
- Saisit prénom + nom + e-mail + **code secret** (choisi à la 1ʳᵉ connexion, redemandé ensuite),
  puis pronostique les scores (poules, puis phase finale quand elle s'ouvre).
- Le **code secret** empêche qu'un autre joue à sa place en connaissant seulement son e-mail.
  Il est stocké **haché** (SHA-256), jamais en clair, et n'apparaît dans aucun classement.
- **Sauvegarde automatique** (indicateur « ✓ enregistré »). Aucun bouton à valider.
- Chaque match devient **non modifiable au coup d'envoi**.

### Organisateur — onglet « 🔐 Organisateur » (mot de passe)
- **Résultats poules** : saisie progressive des scores officiels.
- **Phase finale** : créez les matchs (intitulé, 2 équipes, date/heure), puis saisissez les scores.
- **Classement** : recalculé en direct, ex æquo gérés, message si aucun résultat saisi.
  - **🔑 Réinitialiser le code secret** d'un joueur (code oublié, ou compte usurpé) : ses pronostics
    sont **conservés**, et il choisira un nouveau code à sa prochaine connexion.
  - **🗑️ Supprimer** un participant · **✕** effacer un pronostic précis.

---

## 🔐 Mot de passe administrateur

- **Par défaut : `Tim050607*`** — modifiable via la constante `ADMIN_PASSWORD` dans `index.html`.

---

## 🛠️ Personnalisation (`index.html`)

| Élément | Où |
|---|---|
| Config Firebase | objet `firebaseConfig` |
| Mot de passe admin | `ADMIN_PASSWORD` |
| Barème | objet `SCALE` |
| Délai de fermeture | constante `DAY` / fonction `deadlineMs` |
| Équipes / groupes / matchs | `FLAGS`, `GROUPS`, `RAW` |

> Calendrier : tirage officiel du 5 décembre 2025 (USA / Canada / Mexique). Heures de coup d'envoi
> stockées en UTC dans `RAW` ; l'affichage et le verrouillage s'adaptent au fuseau du navigateur.
