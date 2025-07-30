# Exemple d'usage : GetLocalMoviePosterUseCase

## Contexte métier

L'utilisateur souhaite récupérer l'affiche (poster) associée à un film local stocké sur le système de fichiers, si elle existe.

## Exemple d'appel (pseudo-code TypeScript)

```ts
const useCase = new GetLocalMoviePosterUseCase(
  configurationAdapter,
  fileSystemAdapter
)

const posterBuffer = useCase.execute(
  'films/Le Grand Film (2020)/Le Grand Film (2020).mp4'
)
if (posterBuffer) {
  // Afficher ou sauvegarder l'affiche
}
```

## Ce que fait ce use case

1. Cherche les fichiers d'affiche (jpg, png, webp, etc.) associés au film dans le dossier de la bibliothèque.
2. Retourne le contenu du fichier image sous forme de Buffer si trouvé, sinon `undefined`.

## Résultat attendu

- Un Buffer contenant l'affiche si elle existe, sinon `undefined`.
