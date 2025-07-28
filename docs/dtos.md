# Documentation des DTOs

## Configuration (src/main/domain/ports/dtos/Configuration.ts)

```ts
export type Configuration = {
  libraryPath: string
  movies: Movie[]
  locale: string
}
```

- **libraryPath** : Chemin absolu du dossier de la bibliothèque de films.
- **movies** : Liste des films connus, chacun étant de type `Movie`.
- **locale** : Code de langue de l'interface utilisateur (ex: 'en', 'fr').

---

## Movie (src/main/domain/ports/dtos/Movie.ts)

```ts
export type Movie = {
  relativePath: string
  title: string
}
```

- **relativePath** : Chemin relatif du fichier vidéo par rapport à la bibliothèque.
- **title** : Titre du film (extrait des métadonnées ou du nom de fichier).

### MovieWithMetadata

```ts
export type MovieWithMetadata = Movie & {
  metadata?: MovieFullMetadata
}
```

- **metadata** : Métadonnées complètes du film (optionnelles).

### MovieFullMetadata

```ts
export type MovieFullMetadata = {
  title: string
  sortTitle?: string
  originalTitle?: string
  year?: string
  rating?: number
  votes?: number
  top250?: number
  set?: string
  plot?: string
  outline?: string
  tagline?: string
  runtime?: string
  thumb?: string
  fanart?: string
  mpaa?: string
  certification?: string
  id?: string
  imdbId?: string
  tmdbId?: string
  trailer?: string
  genres: string[]
  tags: string[]
  studios: string[]
  countries: string[]
  directors: string[]
  writers: string[]
  actors: {
    name: string
    role?: string
    thumb?: string
  }[]
  dateAdded?: string
  fileInfo?: {
    streamDetails?: {
      video?: {
        codec?: string
        aspect?: string
        width?: number
        height?: number
        durationInSeconds?: number
        stereoMode?: string
      }
      audio?: {
        codec?: string
        language?: string
        channels?: number
      }[]
      subtitle?: {
        language?: string
      }[]
    }
  }
}
```

- **title** : Titre du film.
- **sortTitle** : Titre pour le tri (optionnel).
- **originalTitle** : Titre original (optionnel).
- **year** : Année de sortie (optionnel).
- **rating** : Note (optionnelle).
- **votes** : Nombre de votes (optionnel).
- **top250** : Classement IMDB Top 250 (optionnel).
- **set** : Collection/saga (optionnel).
- **plot** : Résumé (optionnel).
- **outline** : Description courte (optionnel).
- **tagline** : Slogan (optionnel).
- **runtime** : Durée (optionnel).
- **thumb** : URL ou chemin de la miniature (optionnel).
- **fanart** : URL ou chemin du fanart (optionnel).
- **mpaa** : Classification MPAA (optionnel).
- **certification** : Certification (optionnel).
- **id, imdbId, tmdbId** : Identifiants divers (optionnels).
- **trailer** : Lien vers la bande-annonce (optionnel).
- **genres, tags, studios, countries, directors, writers** : Listes associées.
- **actors** : Liste d'acteurs (nom, rôle, miniature).
- **dateAdded** : Date d'ajout (optionnel).
- **fileInfo** : Informations techniques sur le fichier vidéo (optionnel).
  - **streamDetails** :
    - **video** : Détails vidéo (codec, résolution, durée, etc.).
    - **audio** : Détails audio (codec, langue, canaux).
    - **subtitle** : Détails des sous-titres (langue).
