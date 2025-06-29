import { ConfigurationPort } from '@domain/ports/ConfigurationPort'
import { FileSystemPort } from '@domain/ports/FileSystemPort'
import path from 'path'

export class GetMovieImageUseCase {
  constructor(
    private readonly configurationAdapter: ConfigurationPort,
    private readonly fileSystemAdapter: FileSystemPort
  ) {}

  execute(movieRelativePath: string): Buffer | undefined {
    const configuration = this.configurationAdapter.getConfiguration()
    const basePath = path.dirname(movieRelativePath)
    const fileNameWithoutExtension = path.basename(
      movieRelativePath,
      path.extname(movieRelativePath)
    )

    const possibleExtensions = ['.jpg', '.jpeg', '.png', '.webp']
    for (const ext of possibleExtensions) {
      const relatedPosterPath = path.join(
        configuration.libraryPath,
        basePath,
        fileNameWithoutExtension + '-poster' + ext
      )
      if (this.fileSystemAdapter.checkFileExists(relatedPosterPath)) {
        return this.fileSystemAdapter.getFileContentAsBuffer(relatedPosterPath)
      }
    }
    return undefined
  }
}
