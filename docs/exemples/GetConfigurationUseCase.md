# Exemple d'usage : GetConfigurationUseCase

## Contexte métier

L’utilisateur souhaite récupérer la configuration courante de l’application.

## Exemple d’appel (pseudo-code TypeScript)

```ts
const useCase = new GetConfigurationUseCase(configurationAdapter)

const config = useCase.execute()
console.log(config)
```

## Ce que fait ce use case

1. Retourne la configuration courante de l’application.

## Résultat attendu

- Un objet de type `Configuration` représentant la configuration actuelle.
