## Présentation du projet

Ce projet est un projet en Next.js basé sur le thème des films. Il permet de rechercher des films, de les consulter et de les ajouter à une liste de favoris.

## Installation

Pour installer le projet, il suffit de cloner le dépôt et d'installer les dépendances avec la commande suivante :

```bash
npm install
```

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
- Recherche de films `/ui/search`
- Affichage des détails d'un film `/ui/movie/:id` WIP
- Ajout d'un film à la liste de favoris `/ui/favorites` WIP
- Affichage de la liste de favoris `/ui/favorites` WIP
- Suppression d'un film de la liste de favoris `/ui/favorites` WIP
- Authentification `/ui/login` (pas encore de local storage)
- Inscription `/ui/register` (pas encore de local storage)
- Déconnexion `/ui/logout`

D'autres fonctionnalités arriveront prochainement.

Tous les test unitaires sur les routes de l'API sont fonctionnels.

## Auteurs

- [Mattox0](https://github.com/Mattox0)