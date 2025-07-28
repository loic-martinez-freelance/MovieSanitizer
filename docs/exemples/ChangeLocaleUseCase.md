# Exemple d'usage : ChangeLocaleUseCase

## Contexte métier

L'utilisateur souhaite changer la langue de l'interface utilisateur de l'application.

## Exemple d'appel (pseudo-code TypeScript)

```ts
const useCase = new ChangeLocaleUseCase(configurationAdapter)

useCase.execute('fr') // Change la langue vers le français
```

## Ce que fait ce use case

1. Sauvegarde la nouvelle locale dans la configuration.
2. La configuration est persistée et sera utilisée au prochain démarrage de l'application.

## Résultat attendu

- La configuration contient désormais la nouvelle locale.
- L'interface utilisateur sera affichée dans la langue sélectionnée au prochain démarrage.
