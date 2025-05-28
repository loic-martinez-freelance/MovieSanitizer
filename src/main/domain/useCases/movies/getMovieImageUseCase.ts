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

    const relatedPosterPath =
      path.join(configuration.libraryPath, basePath, '/') +
      fileNameWithoutExtension +
      '-poster.jpg'

    const relatedLocalPosterExists =
      this.fileSystemAdapter.checkFileExists(relatedPosterPath)
    if (relatedLocalPosterExists) {
      const relatedLocalPosterContent =
        this.fileSystemAdapter.getFileContentAsBuffer(relatedPosterPath)
      return relatedLocalPosterContent
    }

    return undefined
  }
}
