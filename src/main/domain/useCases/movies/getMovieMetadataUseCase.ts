import { ConfigurationPort } from '@domain/ports/ConfigurationPort'
import { MovieFullMetadata } from '@domain/ports/dtos/Movie'
import { FileSystemPort } from '@domain/ports/FileSystemPort'
import { MetadataAdapterPort } from '@domain/ports/MetadataAdapterPort'
import path from 'path'

export class GetMovieMetadataUseCase {
  constructor(
    private readonly configurationAdapter: ConfigurationPort,
    private readonly fileSystemAdapter: FileSystemPort,
    private readonly metadataAdapter: MetadataAdapterPort
  ) {}

  execute(movieRelativePath: string): MovieFullMetadata | undefined {
    const configuration = this.configurationAdapter.getConfiguration()
    const basePath = path.dirname(movieRelativePath)
    const fileNameWithoutExtension = path.basename(
      movieRelativePath,
      path.extname(movieRelativePath)
    )
    const relatedMetadataPath =
      path.join(configuration.libraryPath, basePath, '/') +
      fileNameWithoutExtension +
      '.nfo'

    const relatedMetadataExists =
      this.fileSystemAdapter.checkFileExists(relatedMetadataPath)
    if (!relatedMetadataExists) {
      return undefined
    }
    const relatedMetadataContent =
      this.fileSystemAdapter.getFileContent(relatedMetadataPath)
    const metadata = this.metadataAdapter.parseContent(relatedMetadataContent)
    return metadata
  }
}
