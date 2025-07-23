# Exemple d'usage : GetMovieUseCase

## Contexte métier

L’utilisateur souhaite obtenir les informations détaillées (métadonnées incluses) d’un film déjà présent dans la bibliothèque, à partir de son chemin relatif.

## Exemple d’appel (pseudo-code TypeScript)

```ts
const useCase = new GetMovieUseCase(
  getMovieMetadataUseCase,
  configurationAdapter
)

const movie = useCase.execute(
  'films/Le Grand Film (2020)/Le Grand Film (2020).mp4'
)
console.log(movie)
```

## Ce que fait ce use case

1. Récupère la configuration courante (liste des films).
2. Cherche le film correspondant au chemin relatif fourni.
3. Récupère les métadonnées associées à ce film.
4. Retourne un objet enrichi avec les métadonnées.

## Résultat attendu

- Un objet de type `MovieWithMetadata` contenant les infos du film et ses métadonnées, ou une erreur si le film n’existe pas dans la configuration.
