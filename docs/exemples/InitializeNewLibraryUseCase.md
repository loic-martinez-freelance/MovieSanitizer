# Exemple d'usage : InitializeNewLibraryUseCase

## Contexte métier

L’utilisateur souhaite initialiser la bibliothèque de films à partir des fichiers présents dans le dossier configuré.

## Exemple d’appel (pseudo-code TypeScript)

```ts
const useCase = new InitializeNewLibraryUseCase(
  getMovieMetadataUseCase,
  listNewMoviesUseCase,
  configurationAdapter
)

useCase.execute()
```

## Ce que fait ce use case

1. Liste tous les nouveaux fichiers vidéo.
2. Pour chaque fichier, extrait le titre (via métadonnées ou nom de fichier).
3. Sauvegarde la configuration avec la liste complète des films trouvés.

## Résultat attendu

- La configuration contient désormais tous les films présents dans le dossier de la bibliothèque.
