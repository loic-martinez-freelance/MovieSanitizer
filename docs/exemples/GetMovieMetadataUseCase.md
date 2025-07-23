# Exemple d'usage : GetMovieMetadataUseCase

## Contexte métier

L’utilisateur souhaite extraire les métadonnées d’un film local à partir de son fichier NFO associé.

## Exemple d’appel (pseudo-code TypeScript)

```ts
const useCase = new GetMovieMetadataUseCase(
  configurationAdapter,
  fileSystemAdapter,
  metadataAdapter
)

const metadata = useCase.execute(
  'films/Le Grand Film (2020)/Le Grand Film (2020).mp4'
)
console.log(metadata)
```

## Ce que fait ce use case

1. Cherche le fichier NFO associé au film (même nom que le fichier vidéo, extension `.nfo`).
2. Si le fichier existe, lit son contenu et le parse pour extraire les métadonnées.
3. Retourne les métadonnées ou `undefined` si le fichier NFO n’existe pas.

## Résultat attendu

- Un objet de type `MovieFullMetadata` si le fichier NFO existe et est valide, sinon `undefined`.
