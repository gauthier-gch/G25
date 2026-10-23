# G25 🎉

Site d'organisation du weekend des 25 ans — du vendredi 21 au dimanche 23 mai.

Stack : Vite + React, authentification Firebase (Google ou email + mot de passe), hébergement GitHub Pages.
Une fois connecté sur un appareil, la session est conservée : pas besoin de se reconnecter.

Pensé pour le téléphone : barre d'onglets en bas de l'écran, compte à rebours sur l'accueil,
et le site peut être ajouté à l'écran d'accueil (Safari : Partager → « Sur l'écran d'accueil »)
pour s'ouvrir comme une appli.

> Les liens ouverts depuis WhatsApp / Instagram s'affichent dans leur navigateur intégré,
> où Google refuse la connexion : le site affiche alors un message pour l'ouvrir dans Safari/Chrome
> (la connexion par email fonctionne partout).

## Mise en place (une seule fois)

1. Crée un projet sur https://console.firebase.google.com
2. **Authentication > Sign-in method** : active **Google** et **Adresse e-mail/Mot de passe**
3. **Paramètres du projet > Vos applications** : ajoute une application **Web**, puis copie la config
4. `cp .env.example .env.local` et remplis les valeurs
5. `npm install`

## Développement

```bash
npm run dev
```

## Mise en ligne (GitHub Pages)

Chaque push sur `main` déploie automatiquement le site sur https://gauthier-gch.github.io/g25/
(workflow `.github/workflows/deploy.yml`).

Configuration à faire une seule fois :

1. **Settings > Pages > Source** : choisir **GitHub Actions**
2. **Settings > Secrets and variables > Actions > onglet Variables** : créer les 4 variables
   `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_APP_ID`
   (mêmes valeurs que dans `.env.local`)
3. Console Firebase > **Authentication > Paramètres > Domaines autorisés** : ajouter `gauthier-gch.github.io`

GitHub Pages n'est gratuit que pour les repos publics. La config Firebase Web n'est pas secrète
(elle est de toute façon visible dans le site en ligne), le repo peut donc être public sans risque.

## Onglets

- La ville
- Les provisions
- Le questionnaire
- La tombola
- Le planning
