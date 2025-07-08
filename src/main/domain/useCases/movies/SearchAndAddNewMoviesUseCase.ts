import { Movie } from '@domain/ports/dtos/Movie'
import { ListNewMoviesUseCase } from './ListNewMoviesUseCase'
import { ConfigurationPort } from '@domain/ports/ConfigurationPort'
import { GetMovieMetadataUseCase } from './GetMovieMetadataUseCase'
import path from 'path'

export class SearchAndAddNewMoviesUseCase {
  constructor(
    private readonly getMovieMetadataUseCase: GetMovieMetadataUseCase,
    private readonly listNewMoviesUseCase: ListNewMoviesUseCase,
    private readonly configurationAdapter: ConfigurationPort
  ) {}

  execute() {
    const newMovies = this.listNewMoviesUseCase.execute()
    const newMoviesParsed: Movie[] = newMovies.map((m) => {
      const metadata = this.getMovieMetadataUseCase.execute(m)
      const fileNameWithoutExtension = path.basename(m, path.extname(m))
      const title = metadata?.title || fileNameWithoutExtension
      return { relativePath: m, title }
    })
    const currentConfig = this.configurationAdapter.getConfiguration()
    const existingMovies = currentConfig.movies || []
    const mergedMovies = [
      ...existingMovies.filter(
        (em) =>
          !newMoviesParsed.some((nm) => nm.relativePath === em.relativePath)
      ),
      ...newMoviesParsed,
    ]
    this.configurationAdapter.saveConfiguration({ movies: mergedMovies })
  }
}
