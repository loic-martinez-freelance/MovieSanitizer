# Documentation des Adapters et Ports

## IPCRouterAdapter (src/main/adapters/in/ComAdapter/IPCRouterAdapter.ts)

Cet adapter implémente l'interface `ComAdapterPort` et fait le lien entre le backend Electron (main process) et le renderer via IPC. Il expose plusieurs méthodes pour router les événements IPC vers les use cases appropriés.

### Méthodes principales :
- **startPingRouter()** : Écoute l'événement 'ping' et affiche l'argument reçu dans la console.
- **startSaveConfiguration(saveConfigurationUseCase)** : Écoute 'saveConfiguration' et exécute le use case correspondant avec les données reçues.
- **startGetConfiguration(getConfigurationUseCase)** : Gère 'getConfiguration' et retourne la configuration courante.
- **startSelectLibraryFolder(selectLibraryFolderUseCase)** : Gère 'selectLibraryFolder' et retourne le dossier sélectionné.
- **startGetMovieMetadata(getMovieMetadataUseCase)** : Gère 'getMovieMetadata' et retourne les métadonnées du film.
- **startGetMovieImage(getMovieImageUseCase)** : Gère 'getMovieImage' et retourne l'image du film.
- **startGetRelatedMoviesFromDB(listMoviesByTitleOnDBUseCase)** : Gère 'getRelatedMoviesFromDB' et retourne les films correspondants à un titre.
- **startCleanLocalMovie(cleanLocalMovieWithSelectedMovieUseCase)** : Gère 'cleanLocalMovie' pour nettoyer et organiser un film local avec les métadonnées sélectionnées.
- **startSearchNewMovies(searchNewMovies)** : Écoute 'searchNewMovies' et lance la recherche/ajout de nouveaux films.

---

## ComAdapterPort (src/main/domain/ports/ComAdapterPort.ts)

Interface définissant les méthodes qu'un adapter de communication doit implémenter pour interagir avec les use cases principaux liés à la configuration et aux films.

### Méthodes :
- startPingRouter()
- startSaveConfiguration(saveConfigurationUseCase)
- startGetConfiguration(getConfigurationUseCase)
- startSelectLibraryFolder(selectLibraryFolderUseCase)
- startGetMovieMetadata(getMovieMetadataUseCase)
- startGetMovieImage(getMovieImageUseCase)

---

## MovieDBAdapterPort (src/main/domain/ports/MovieDBAdapterPort.ts)

Interface pour l'adapter d'accès à une base de données de films (ex: TMDB, IMDB, etc).

### Méthodes :
- getMovieMetadata(movieId: string): Promise<MovieFullMetadata>
- searchMovies(query: string): Promise<{ id: string; title: string; year: string }[]>
- getMoviePosterUrl(movieId: string): Promise<string>

---

## HttpPort (src/main/domain/ports/HttpPort.ts)

Interface pour l'adapter HTTP, principalement pour le téléchargement de fichiers.

### Méthodes :
- downloadFile(url: string): Promise<Buffer>

---

## MetadataAdapterPort (src/main/domain/ports/MetadataAdapterPort.ts)

Interface pour parser et générer des fichiers de métadonnées (ex: NFO).

### Méthodes :
- parseContent(content: string): MovieFullMetadata
- toNFO(metadata: MovieFullMetadata): string

---

## FileSystemPort (src/main/domain/ports/FileSystemPort.ts)

Interface pour l'accès au système de fichiers.

### Méthodes :
- listFiles(path: string): string[]
- getFileContentAsString(filePath: string): string
- getFileContentAsBuffer(filePath: string): Buffer
- checkFileExists(filePath: string): boolean
- writeFile(filePath: string, content: string | Buffer): void
- mkdir(dirPath: string): void
- moveFile(srcPath: string, destPath: string): void

---

## ConfigurationPort (src/main/domain/ports/ConfigurationPort.ts)

Interface pour la gestion de la configuration de l'application.

### Méthodes :
- initializeConfiguration(): void
- isFirstInitialization(): boolean
- getConfiguration(): Configuration
- saveConfiguration(configuration: Partial<Configuration>): void 