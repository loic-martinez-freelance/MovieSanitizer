import { Movie } from '@domain/ports/dtos/Movie'
import { ListNewMoviesUseCase } from './listNewMovies'
import { ConfigurationPort } from '@domain/ports/ConfigurationPort'
import { GetMovieMetadataUseCase } from './getMovieMetadataUseCase'
import path from 'path'
export class InitializeNewLibraryUseCase {
  constructor(
    private readonly getMovieMetadataUseCase: GetMovieMetadataUseCase,
    private readonly listNewMoviesUseCase: ListNewMoviesUseCase,
    private readonly configurationAdapter: ConfigurationPort
  ) {}

  execute() {
    const newMovies = this.listNewMoviesUseCase.execute()
    const movies: Movie[] = newMovies.map((m) => {
      const metadata = this.getMovieMetadataUseCase.execute(m)
      const fileNameWithoutExtension = path.basename(m, path.extname(m))
      const title = metadata?.title || fileNameWithoutExtension
      return { relativePath: m, title }
    })
    this.configurationAdapter.saveConfiguration({ movies })
    console.log(movies)
  }
}
