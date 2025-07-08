import { MovieDBAdapterPort } from '@domain/ports/MovieDBAdapterPort'

export class ListMoviesByTitleOnDBUseCase {
  constructor(private readonly movieDBAdapter: MovieDBAdapterPort) {}

  async execute(title: string) {
    const result = await this.movieDBAdapter.searchMovies(title)
    return result
  }
}
