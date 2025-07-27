# Documentation des Use Cases

## Use Cases liés aux films

### SearchAndAddNewMoviesUseCase

- **Fichier** : src/main/domain/useCases/movies/SearchAndAddNewMoviesUseCase.ts
- **Rôle** : Recherche les nouveaux fichiers de films dans le dossier de la bibliothèque, extrait leur titre (via métadonnées ou nom de fichier), puis les ajoute à la configuration si non présents.
- **Dépendances** :
  - GetMovieMetadataUseCase
  - ListNewMoviesUseCase
  - ConfigurationPort
- **Fonctionnement** :
  1. Liste les nouveaux fichiers vidéo non encore présents dans la configuration.
  2. Pour chaque nouveau fichier, récupère les métadonnées et extrait le titre.
  3. Fusionne les nouveaux films avec ceux déjà présents dans la configuration.
  4. Sauvegarde la nouvelle configuration.

---

### GetMovieUseCase

- **Fichier** : src/main/domain/useCases/movies/GetMovieUseCase.ts
- **Rôle** : Récupère un film (et ses métadonnées) à partir de son chemin relatif.
- **Dépendances** :
  - GetMovieMetadataUseCase
  - ConfigurationPort
- **Fonctionnement** :
  1. Récupère la configuration courante.
  2. Cherche le film par son chemin relatif.
  3. Récupère les métadonnées associées.
  4. Retourne l'objet film enrichi des métadonnées.

---

### InitializeNewLibraryUseCase

- **Fichier** : src/main/domain/useCases/movies/InitializeNewLibraryUseCase.ts
- **Rôle** : Initialise la bibliothèque de films à partir des fichiers présents dans le dossier configuré.
- **Dépendances** :
  - GetMovieMetadataUseCase
  - ListNewMoviesUseCase
  - ConfigurationPort
- **Fonctionnement** :
  1. Liste tous les nouveaux fichiers vidéo.
  2. Pour chaque fichier, extrait le titre (via métadonnées ou nom de fichier).
  3. Sauvegarde la configuration avec la liste complète des films trouvés.

---

### ListMoviesByTitleOnDBUseCase

- **Fichier** : src/main/domain/useCases/movies/ListMoviesByTitleOnDBUseCase.ts
- **Rôle** : Recherche des films dans la base de données externe à partir d'un titre.
- **Dépendances** :
  - MovieDBAdapterPort
- **Fonctionnement** :
  1. Utilise l'adapter MovieDB pour rechercher les films correspondant au titre fourni.
  2. Retourne la liste des résultats.

---

### CleanLocalMovieWithSelectedMovieUseCase

- **Fichier** : src/main/domain/useCases/movies/CleanLocalMovieWithSelectedMovieUseCase.ts
- **Rôle** : Organise un film local en utilisant les métadonnées d'un film sélectionné depuis la base de données externe.
- **Dépendances** :
  - MovieDBAdapterPort
  - FileSystemPort
  - MetadataAdapterPort
  - ConfigurationPort
  - HttpPort
- **Fonctionnement** :
  1. Récupère les métadonnées complètes du film sélectionné.
  2. Crée un dossier dédié pour le film (nommé selon le titre et l'année).
  3. Génère et écrit le fichier NFO.
  4. Déplace et renomme le fichier vidéo.
  5. Télécharge et sauvegarde l'affiche du film.
  6. Met à jour le chemin du film dans la configuration.

---

### ListNewMoviesUseCase

- **Fichier** : src/main/domain/useCases/movies/ListNewMoviesUseCase.ts
- **Rôle** : Liste les nouveaux fichiers vidéo présents dans le dossier de la bibliothèque mais absents de la configuration.
- **Dépendances** :
  - FileSystemPort
  - ConfigurationPort
- **Fonctionnement** :
  1. Récupère la liste des films déjà connus (configuration).
  2. Liste les fichiers vidéo présents dans le dossier de la bibliothèque.
  3. Retourne ceux qui ne sont pas encore enregistrés.

---

### GetMovieImageUseCase

- **Fichier** : src/main/domain/useCases/movies/GetMovieImageUseCase.ts
- **Rôle** : Récupère l'image (affiche) associée à un film local.
- **Dépendances** :
  - ConfigurationPort
  - FileSystemPort
- **Fonctionnement** :
  1. Cherche les fichiers d'affiche (jpg, png, etc.) associés au film dans le dossier de la bibliothèque.
  2. Retourne le contenu du fichier image si trouvé.

---

### GetMovieMetadataUseCase

- **Fichier** : src/main/domain/useCases/movies/GetMovieMetadataUseCase.ts
- **Rôle** : Récupère les métadonnées d'un film local à partir de son fichier NFO.
- **Dépendances** :
  - ConfigurationPort
  - FileSystemPort
  - MetadataAdapterPort
- **Fonctionnement** :
  1. Cherche le fichier NFO associé au film.
  2. Si trouvé, lit et parse le contenu pour extraire les métadonnées.
  3. Retourne les métadonnées ou undefined si non trouvées.

---

### OpenMovieInExplorerUseCase

- **Fichier** : src/main/domain/useCases/movies/OpenMovieInExplorerUseCase.ts
- **Rôle** : Ouvre un film directement dans l'explorateur de fichiers du système d'exploitation (Finder sur macOS, Explorateur de fichiers sur Windows, etc.).
- **Dépendances** :
  - ConfigurationPort
  - FileSystemPort
- **Fonctionnement** :
  1. Récupère le chemin complet en combinant le chemin de la bibliothèque avec le chemin relatif du film.
  2. Vérifie l'existence du fichier avant de tenter de l'ouvrir.
  3. Utilise la méthode `openFileInExplorer` du FileSystemPort pour ouvrir le fichier dans l'explorateur natif.

---

## Use Cases liés à la configuration

### FirstInitializationUseCase

- **Fichier** : src/main/domain/useCases/settings/FirstInitializationUseCase.ts
- **Rôle** : Effectue l'initialisation de la configuration si c'est le premier lancement de l'application.
- **Dépendances** :
  - ConfigurationPort
- **Fonctionnement** :
  1. Vérifie si c'est la première initialisation.
  2. Si oui, initialise la configuration.

---

### SaveConfigurationUseCase

- **Fichier** : src/main/domain/useCases/settings/SaveConfigurationUseCase.ts
- **Rôle** : Sauvegarde la configuration et réinitialise la bibliothèque si le chemin a changé.
- **Dépendances** :
  - ConfigurationPort
  - InitializeNewLibraryUseCase
- **Fonctionnement** :
  1. Sauvegarde la configuration reçue.
  2. Si le chemin de la bibliothèque a changé, réinitialise la bibliothèque.

---

### GetConfigurationUseCase

- **Fichier** : src/main/domain/useCases/settings/GetConfigurationUseCase.ts
- **Rôle** : Récupère la configuration courante de l'application.
- **Dépendances** :
  - ConfigurationPort
- **Fonctionnement** :
  1. Retourne la configuration courante.

---

### SelectLibraryFolderUseCase

- **Fichier** : src/main/domain/useCases/settings/SelectLibraryFolderUseCase.ts
- **Rôle** : Ouvre une boîte de dialogue pour sélectionner le dossier de la bibliothèque.
- **Dépendances** :
  - Electron dialog
- **Fonctionnement** :
  1. Ouvre une boîte de dialogue pour choisir un dossier.
  2. Retourne le chemin du dossier sélectionné.
