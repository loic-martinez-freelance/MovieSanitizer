import { FileSystemPort } from '@domain/ports/FileSystemPort'
import { MovieDBAdapterPort } from '@domain/ports/MovieDBAdapterPort'
import { MetadataAdapterPort } from '@domain/ports/MetadataAdapterPort'
import { ConfigurationPort } from '@domain/ports/ConfigurationPort'
import path from 'path'
import { URL } from 'url'
import { HttpPort } from '@domain/ports/HttpPort'

// Helper to sanitize filenames (removes or replaces invalid characters)
function sanitizeFilename(name: string): string {
  return name.replace(/[\\/:*?"<>|]/g, '').trim()
}

export class CleanLocalMovieWithSelectedMovie {
  constructor(
    private readonly movieDBAdapter: MovieDBAdapterPort,
    private readonly fileSystemAdapter: FileSystemPort,
    private readonly metadataAdapter: MetadataAdapterPort,
    private readonly configurationAdapter: ConfigurationPort,
    private readonly httpAdapter: HttpPort
  ) {}

  async execute(movieRelativePath: string, selectedMovieId: string) {
    // 1. Get full metadata for the selected movie
    const fullMetadata =
      await this.movieDBAdapter.getMovieMetadata(selectedMovieId)
    if (!fullMetadata) throw new Error('Movie metadata not found')

    // 2. Get library folder path
    const configuration = this.configurationAdapter.getConfiguration()
    const libraryPath = configuration.libraryPath

    // 3. Prepare names (sanitize title)
    const movieTitle = sanitizeFilename(fullMetadata.title?.trim() || 'Unknown')
    const movieYear = fullMetadata.year?.trim() || 'Unknown'
    const folderName = `${movieTitle} (${movieYear})`

    // 4. Create the target folder
    const targetDir = path.join(libraryPath, folderName)
    this.fileSystemAdapter.mkdir(targetDir)

    // 5. Generate NFO content and write NFO file
    const nfoContent = this.metadataAdapter.toNFO(fullMetadata)
    const nfoFileName = `${folderName}.nfo`
    const nfoPath = path.join(targetDir, nfoFileName)
    this.fileSystemAdapter.writeFile(nfoPath, nfoContent)

    // 6. Move and rename the movie file
    const ext = path.extname(movieRelativePath)
    const srcMoviePath = path.join(libraryPath, movieRelativePath)
    const destMovieFileName = `${folderName}${ext}`
    const destMoviePath = path.join(targetDir, destMovieFileName)
    this.fileSystemAdapter.moveFile(srcMoviePath, destMoviePath)

    const posterUrl = await this.movieDBAdapter.getMoviePoster(selectedMovieId)

    // Download and save the poster file if posterUrl exists
    if (posterUrl) {
      // Try to get the extension from the URL, fallback to .jpg
      const posterExt = path.extname(new URL(posterUrl).pathname) || '.jpg'
      const posterFileName = `${folderName}${posterExt}`
      const posterPath = path.join(targetDir, posterFileName)
      const posterBuffer = await this.httpAdapter.downloadFile(posterUrl)
      this.fileSystemAdapter.writeFile(posterPath, posterBuffer)
    }

    // 7. Update the movie's path in the configuration
    const newRelativePath = path.relative(libraryPath, destMoviePath)
    const updatedMovies = configuration.movies.map((movie) =>
      movie.relativePath === movieRelativePath
        ? { ...movie, relativePath: newRelativePath, title: movieTitle }
        : movie
    )
    this.configurationAdapter.saveConfiguration({ movies: updatedMovies })
  }
}
