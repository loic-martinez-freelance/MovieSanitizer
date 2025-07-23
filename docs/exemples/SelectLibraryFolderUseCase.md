# Exemple d'usage : SelectLibraryFolderUseCase

## Contexte métier

L’utilisateur souhaite sélectionner un dossier pour la bibliothèque de films via une boîte de dialogue système.

## Exemple d’appel (pseudo-code TypeScript)

```ts
const useCase = new SelectLibraryFolderUseCase()

const folder = useCase.execute()
console.log(folder) // Affiche le chemin du dossier sélectionné ou undefined
```

## Ce que fait ce use case

1. Ouvre une boîte de dialogue pour choisir un dossier.
2. Retourne le chemin du dossier sélectionné ou `undefined` si l’utilisateur annule.

## Résultat attendu

- Le chemin du dossier sélectionné, ou `undefined` si aucun dossier n’a été choisi.
