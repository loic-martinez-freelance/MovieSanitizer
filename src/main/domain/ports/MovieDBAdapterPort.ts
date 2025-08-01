import { MovieFullMetadata } from './dtos/Movie'

export interface MovieDBAdapterPort {
  getMovieMetadata(movieId: string): Promise<MovieFullMetadata>
  searchMovies(
    query: string
  ): Promise<{ id: string; title: string; year: string }[]>
  getMoviePosterUrl(movieId: string): Promise<string>
}
