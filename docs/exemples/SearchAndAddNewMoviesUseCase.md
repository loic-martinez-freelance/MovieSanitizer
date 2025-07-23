# Exemple d'usage : SearchAndAddNewMoviesUseCase

## Contexte métier

L’utilisateur souhaite détecter et ajouter automatiquement à la configuration les nouveaux films présents dans le dossier de la bibliothèque.

## Exemple d’appel (pseudo-code TypeScript)

```ts
const useCase = new SearchAndAddNewMoviesUseCase(
  getMovieMetadataUseCase,
  listNewMoviesUseCase,
  configurationAdapter
)

useCase.execute()
```

## Ce que fait ce use case

1. Liste les nouveaux fichiers vidéo non encore présents dans la configuration.
2. Pour chaque nouveau fichier, récupère les métadonnées et extrait le titre.
3. Fusionne les nouveaux films avec ceux déjà présents dans la configuration.
4. Sauvegarde la nouvelle configuration.

## Résultat attendu

- Les nouveaux films sont ajoutés à la configuration avec leur titre et chemin relatif.
