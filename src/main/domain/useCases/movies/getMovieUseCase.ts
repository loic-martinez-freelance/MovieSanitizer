import { ConfigurationPort } from '@/domain/ports/ConfigurationPort'
import { MovieWithMetadata } from '@/domain/ports/dtos/Movie'
import { GetMovieMetadataUseCase } from './getMovieMetadataUseCase'

export class GetMovieUseCase {
  constructor(
    private readonly getMovieMetadataUseCase: GetMovieMetadataUseCase,
    private readonly configurationAdapter: ConfigurationPort
  ) {}

  execute(movieRelativePath: string): MovieWithMetadata {
    const configuration = this.configurationAdapter.getConfiguration()
    const metadata = this.getMovieMetadataUseCase.execute(movieRelativePath)
    const movie = configuration.movies.find(
      (m) => m.relativePath === movieRelativePath
    )
    if (!movie) {
      throw new Error('Movie not found')
    }
    return { ...movie, metadata }
  }
}
