# Exemple d'usage : CleanLocalMovieWithSelectedMovieUseCase

## Contexte métier

L’utilisateur souhaite organiser un film local en utilisant les métadonnées d’un film sélectionné dans une base externe (ex : TMDB).

## Exemple d’appel (pseudo-code TypeScript)

```ts
const useCase = new CleanLocalMovieWithSelectedMovieUseCase(
  movieDBAdapter,
  fileSystemAdapter,
  metadataAdapter,
  configurationAdapter,
  httpAdapter
)

await useCase.execute('films/old_movie.mp4', '123456') // '123456' = ID du film TMDB sélectionné
```

## Ce que fait ce use case

1. Récupère les métadonnées complètes du film TMDB d’ID `123456`.
2. Crée un dossier propre dans la bibliothèque, ex : `Le Grand Film (2020)/`.
3. Génère un fichier NFO avec les métadonnées.
4. Déplace et renomme le fichier vidéo dans ce dossier.
5. Télécharge l’affiche du film et la place dans le dossier.
6. Met à jour la configuration pour refléter le nouveau chemin et titre.

## Résultat attendu

- Le fichier `films/old_movie.mp4` est déplacé dans `Le Grand Film (2020)/Le Grand Film (2020).mp4`.
- Un fichier `Le Grand Film (2020).nfo` et une affiche sont présents dans le même dossier.
- La configuration de la bibliothèque référence désormais le film sous son nouveau chemin et titre.
