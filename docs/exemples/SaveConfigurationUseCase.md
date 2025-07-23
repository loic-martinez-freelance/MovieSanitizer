# Exemple d'usage : SaveConfigurationUseCase

## Contexte métier

L’utilisateur souhaite sauvegarder la configuration de l’application, et réinitialiser la bibliothèque si le chemin a changé.

## Exemple d’appel (pseudo-code TypeScript)

```ts
const useCase = new SaveConfigurationUseCase(
  configurationAdapter,
  initializeNewLibraryUseCase
)

useCase.execute({ libraryPath: '/nouveau/chemin', movies: [] })
```

## Ce que fait ce use case

1. Sauvegarde la configuration reçue.
2. Si le chemin de la bibliothèque a changé, réinitialise la bibliothèque.

## Résultat attendu

- La configuration est mise à jour, et la bibliothèque est réinitialisée si le chemin a changé.
