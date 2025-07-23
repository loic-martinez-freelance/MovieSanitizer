# Exemple d'usage : ListMoviesByTitleOnDBUseCase

## Contexte métier

L’utilisateur souhaite rechercher des films dans une base de données externe (ex : TMDB) à partir d’un titre.

## Exemple d’appel (pseudo-code TypeScript)

```ts
const useCase = new ListMoviesByTitleOnDBUseCase(movieDBAdapter)

const results = await useCase.execute('Inception')
console.log(results)
```

## Ce que fait ce use case

1. Utilise l’adapter MovieDB pour rechercher les films correspondant au titre fourni.
2. Retourne la liste des résultats (id, titre, année).

## Résultat attendu

- Un tableau d’objets `{ id, title, year }` correspondant aux films trouvés dans la base externe.
