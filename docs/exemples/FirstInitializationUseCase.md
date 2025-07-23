# Exemple d'usage : FirstInitializationUseCase

## Contexte métier

L’application doit effectuer l’initialisation de la configuration si c’est le premier lancement.

## Exemple d’appel (pseudo-code TypeScript)

```ts
const useCase = new FirstInitializationUseCase(configurationAdapter)

useCase.execute()
```

## Ce que fait ce use case

1. Vérifie si c’est la première initialisation.
2. Si oui, initialise la configuration.

## Résultat attendu

- La configuration est initialisée si ce n’était pas déjà fait.
