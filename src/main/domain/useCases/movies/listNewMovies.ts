import { ConfigurationPort } from '@domain/ports/ConfigurationPort'
import { FileSystemPort } from '@domain/ports/FileSystemPort'

export class ListNewMoviesUseCase {
  constructor(
    private readonly fileSystemAdapter: FileSystemPort,
    private readonly configurationAdapter: ConfigurationPort
  ) {}

  execute() {
    const configuration = this.configurationAdapter.getConfiguration()
    const moviesInLibrary = configuration.movies.map((m) => m.relativePath)
    const files = this.fileSystemAdapter.listFiles(configuration.libraryPath)
    const videoExtensions = ['.mp4', '.mkv', '.avi']
    const moviesInFolder = files.filter((file) =>
      videoExtensions.some((ext) => file.toLowerCase().endsWith(ext))
    )
    const newMovies = moviesInFolder.filter((m) => !moviesInLibrary.includes(m))
    return newMovies
  }
}
