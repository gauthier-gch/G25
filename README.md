# G25 🎉

Site d'organisation du weekend des 25 ans — du vendredi 21 au dimanche 23 mai.

Stack : Vite + React, authentification Firebase (Google ou email + mot de passe), hébergement Firebase Hosting.
Une fois connecté sur un appareil, la session est conservée : pas besoin de se reconnecter.

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

## Mise en ligne

```bash
npm install -g firebase-tools
firebase login
firebase use --add   # choisis ton projet
npm run deploy
```

Le site sera accessible sur `https://<ton-projet>.web.app`.
Pense à ajouter ce domaine (et ton domaine perso éventuel) dans **Authentication > Settings > Authorized domains**.

## Onglets

- La ville
- Les provisions
- Le questionnaire
- La tombola
- Le planning
