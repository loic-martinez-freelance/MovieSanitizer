# Exemple d'usage : ListNewMoviesUseCase

## Contexte métier

L’utilisateur souhaite lister les nouveaux fichiers vidéo présents dans le dossier de la bibliothèque mais absents de la configuration.

## Exemple d’appel (pseudo-code TypeScript)

```ts
const useCase = new ListNewMoviesUseCase(
  fileSystemAdapter,
  configurationAdapter
)

const newMovies = useCase.execute()
console.log(newMovies)
```

## Ce que fait ce use case

1. Récupère la liste des films déjà connus (configuration).
2. Liste les fichiers vidéo présents dans le dossier de la bibliothèque.
3. Retourne ceux qui ne sont pas encore enregistrés.

## Résultat attendu

- Un tableau de chemins relatifs des nouveaux fichiers vidéo détectés.
