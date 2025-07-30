# Exemple d'usage : DownloadMoviePosterFromTMDBUseCase

## Contexte métier

L'utilisateur souhaite télécharger l'affiche (poster) d'un film depuis TMDB (The Movie Database) en utilisant l'ID du film.

## Exemple d'appel (pseudo-code TypeScript)

```ts
const useCase = new DownloadMoviePosterFromTMDBUseCase(
  movieDBAdapter,
  httpAdapter
)

const posterBuffer = await useCase.execute('12345')
if (posterBuffer) {
  // Sauvegarder ou afficher l'affiche téléchargée
}
```

## Ce que fait ce use case

1. Récupère l'URL du poster depuis TMDB via l'adaptateur MovieDB.
2. Télécharge le fichier image depuis cette URL via l'adaptateur HTTP.
3. Retourne le buffer contenant l'image téléchargée.

## Résultat attendu

- Un Buffer contenant l'affiche téléchargée si disponible, sinon `undefined`.
