import { ConfigurationPort } from '@domain/ports/ConfigurationPort'
import { FileSystemPort } from '@domain/ports/FileSystemPort'
import path from 'path'

export class OpenMovieInExplorerUseCase {
  constructor(
    private readonly configurationAdapter: ConfigurationPort,
    private readonly fileSystemAdapter: FileSystemPort
  ) {}

  execute(movieRelativePath: string): void {
    const configuration = this.configurationAdapter.getConfiguration()
    const fullPath = path.join(configuration.libraryPath, movieRelativePath)

    if (!this.fileSystemAdapter.checkFileExists(fullPath)) {
      throw new Error(`Movie file not found: ${fullPath}`)
    }

    this.fileSystemAdapter.openFileInExplorer(fullPath)
  }
}
