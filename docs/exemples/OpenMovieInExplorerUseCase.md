# OpenMovieInExplorerUseCase

## Description

Ce use case permet d'ouvrir un film directement dans l'explorateur de fichiers du système d'exploitation (Finder sur macOS, Explorateur de fichiers sur Windows, etc.).

## Fichier

`src/main/domain/useCases/movies/OpenMovieInExplorerUseCase.ts`

## Rôle

Ouvre le fichier vidéo d'un film dans l'explorateur de fichiers natif du système d'exploitation, permettant à l'utilisateur de localiser rapidement le fichier sur son disque.

## Dépendances

- **ConfigurationPort** : Pour récupérer le chemin de la bibliothèque de films
- **FileSystemPort** : Pour vérifier l'existence du fichier et l'ouvrir dans l'explorateur

## Fonctionnement

1. **Récupération du chemin complet** : Combine le chemin de la bibliothèque avec le chemin relatif du film
2. **Vérification d'existence** : S'assure que le fichier existe avant de tenter de l'ouvrir
3. **Ouverture dans l'explorateur** : Utilise la méthode `openFileInExplorer` du FileSystemPort pour ouvrir le fichier dans l'explorateur natif

## Utilisation

### Côté Main Process (Electron)

```typescript
const openMovieInExplorerUseCase = new OpenMovieInExplorerUseCase(
  configurationAdapter,
  fileSystemAdapter
)

// Ouvrir un film dans l'explorateur
openMovieInExplorerUseCase.execute('MonFilm.mp4')
```

### Côté Renderer (React)

```typescript
const { openMovieInExplorer } = useIPC()

const handleOpenInExplorer = async (movieRelativePath: string) => {
  try {
    await openMovieInExplorer(movieRelativePath)
  } catch (err) {
    console.error('Failed to open movie in explorer:', err)
  }
}
```

## Interface utilisateur

Le bouton d'ouverture dans l'explorateur est disponible à deux endroits :

1. **Dans la liste des films** (`MovieList.tsx`) : Un petit bouton avec une icône de dossier à côté de chaque titre de film
2. **Dans les détails du film** (`MovieDetails.tsx`) : Un bouton plus visible à côté du titre du film

## Implémentation technique

### FileSystemPort

```typescript
export interface FileSystemPort {
  // ... autres méthodes
  openFileInExplorer(filePath: string): void
}
```

### FSAdapter

```typescript
import { shell } from 'electron'

export class FSAdapter implements FileSystemPort {
  // ... autres méthodes

  openFileInExplorer(filePath: string): void {
    shell.showItemInFolder(filePath)
  }
}
```

### IPC Communication

- **Événement** : `openMovieInExplorer`
- **Paramètres** : `movieRelativePath` (string)
- **Retour** : Aucun (void)

## Avantages

- **Accessibilité** : Permet aux utilisateurs de localiser facilement les fichiers sur leur disque
- **Intégration native** : Utilise les fonctionnalités natives du système d'exploitation
- **Cohérence** : Comportement identique à celui d'autres applications
- **Simplicité** : Interface utilisateur intuitive avec des icônes reconnaissables

## Gestion d'erreurs

Le use case vérifie l'existence du fichier avant de tenter de l'ouvrir et lance une erreur si le fichier n'existe pas :

```typescript
if (!this.fileSystemAdapter.checkFileExists(fullPath)) {
  throw new Error(`Movie file not found: ${fullPath}`)
}
```
