import { MovieDBAdapterPort } from '@domain/ports/MovieDBAdapterPort'

export class ListMoviesByTitleOnDB {
  constructor(private readonly movieDBAdapter: MovieDBAdapterPort) {}

  async execute(title: string) {
    const result = await this.movieDBAdapter.searchMovies(title)
    console.log(result)
    return result
  }
}
