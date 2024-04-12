## Présentation du projet

Ce projet est un projet en Next.js basé sur le thème des films. Il permet de rechercher des films, de les consulter et de les ajouter à une liste de favoris.

## Installation

Pour installer le projet, il suffit de cloner le dépôt et d'installer les dépendances avec la commande suivante :

```bash
npm install
```

Il vous faudra une base de donnée mongodb disponible sur [MongoDb](https://www.mongodb.com/fr-fr)

## Configuration

Pour configurer le projet, il suffit de créer un fichier `.env.local` à la racine du projet et d'y ajouter les variables d'environnement suivantes :

```bash
MONGODB_URI=YOUR_MONGODB_URI // Mongo db URI
API_KEY=YOUR_API_KEY // The Movie Database API key
API_TOKEN=YOUR_API_TOKEN // The Movie Database API key
JWT_SECRET=YOUR_JWT_SECRET // JWT secret
```

## Utilisation

Pour lancer le projet, il suffit de lancer la commande suivante :

```bash
npm run dev
```

Le projet est ensuite accessible à l'adresse suivante : [http://localhost:3000](http://localhost:3000)

## Fonctionnalités

- Affichage des films populaires `/ui/movies`
- Recherche de films `/ui/search?query=:query`
- Affichage des détails d'un film `/ui/details?idMovie=:id`
- Authentification `/ui/sign-in` 
- Inscription `/ui/sign-up`
- Déconnexion `/ui/logout`

D'autres fonctionnalités arriveront prochainement.

Et un swagger est disponible sur `/swagger` pour tester les routes de l'API.

## Tests unitaires

Tous les tests unitaires de l'API sont disponibles dans le dossier `__tests__`.
Pour lancer les tests unitaires, il suffit de lancer la commande suivante :

```bash
npm run test
```

## Auteurs

- [Mattox0](https://github.com/Mattox0)