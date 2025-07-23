# Exemple d'usage : GetMovieImageUseCase

## Contexte métier

L’utilisateur souhaite récupérer l’image (affiche) associée à un film local, si elle existe.

## Exemple d’appel (pseudo-code TypeScript)

```ts
const useCase = new GetMovieImageUseCase(
  configurationAdapter,
  fileSystemAdapter
)

const imageBuffer = useCase.execute(
  'films/Le Grand Film (2020)/Le Grand Film (2020).mp4'
)
if (imageBuffer) {
  // Afficher ou sauvegarder l'image
}
```

## Ce que fait ce use case

1. Cherche les fichiers d’affiche (jpg, png, etc.) associés au film dans le dossier de la bibliothèque.
2. Retourne le contenu du fichier image sous forme de Buffer si trouvé, sinon `undefined`.

## Résultat attendu

- Un Buffer contenant l’image si elle existe, sinon `undefined`.
