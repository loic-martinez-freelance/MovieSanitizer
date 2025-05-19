import { MovieDBAdapterPort } from '@domain/ports/MovieDBAdapterPort'
import { MovieFullMetadata } from '@domain/ports/dtos/Movie'

export class TMDBAdapter implements MovieDBAdapterPort {
  private readonly accessToken: string
  private readonly baseUrl: string = 'https://api.themoviedb.org/3'
  private readonly imageBaseUrl: string = 'https://image.tmdb.org/t/p/original'

  constructor(token: string) {
    this.accessToken = token
  }

  private async fetchWithAuth(url: string): Promise<Response> {
    return fetch(url, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    })
  }

  async getMovieMetadata(movieId: string): Promise<MovieFullMetadata> {
    try {
      const response = await this.fetchWithAuth(
        `${this.baseUrl}/movie/${movieId}?append_to_response=credits,videos,keywords`
      )

      if (!response.ok) {
        throw new Error(
          `Failed to fetch movie metadata: ${response.statusText}`
        )
      }

      const data = await response.json()

      // Process cast and crew
      const actors =
        data.credits?.cast.map((actor: any) => ({
          name: actor.name || '',
          role: actor.character || '',
          thumb: actor.profile_path
            ? `${this.imageBaseUrl}${actor.profile_path}`
            : '',
        })) || []

      const directors =
        data.credits?.crew
          .filter((person: any) => person.job === 'Director')
          .map((person: any) => person.name) || []

      const writers =
        data.credits?.crew
          .filter((person: any) =>
            ['Screenplay', 'Writer', 'Author'].includes(person.job)
          )
          .map((person: any) => person.name) || []

      // Find trailer
      const trailer = data.videos?.results.find(
        (video: any) => video.type === 'Trailer' && video.site === 'YouTube'
      )

      const trailerUrl = trailer
        ? `https://www.youtube.com/watch?v=${trailer.key}`
        : ''

      // Map TMDB API response to MovieFullMetadata format
      return {
        title: data.title || '',
        sortTitle: data.title || '',
        originalTitle: data.original_title || '',
        year: data.release_date ? data.release_date.substring(0, 4) : '',
        rating: data.vote_average || 0,
        votes: data.vote_count || 0,
        top250: 0,
        plot: data.overview || '',
        outline: data.overview || '',
        tagline: data.tagline || '',
        runtime: data.runtime ? `${data.runtime}` : '',
        thumb: data.poster_path
          ? `${this.imageBaseUrl}${data.poster_path}`
          : '',
        fanart: data.backdrop_path
          ? `${this.imageBaseUrl}${data.backdrop_path}`
          : '',
        mpaa: data.adult ? 'R' : 'PG',
        certification: '',
        id: `${data.id}` || '',
        imdbId: data.imdb_id || '',
        tmdbId: `${data.id}` || '',
        trailer: trailerUrl,
        genres: data.genres?.map((genre: any) => genre.name) || [],
        tags:
          data.keywords?.keywords?.map((keyword: any) => keyword.name) || [],
        studios:
          data.production_companies?.map((company: any) => company.name) || [],
        countries:
          data.production_countries?.map((country: any) => country.name) || [],
        directors,
        writers,
        actors,
        dateAdded: new Date().toISOString(),
      }
    } catch (error) {
      console.error('Error fetching movie metadata:', error)
      throw error
    }
  }

  async searchMovies(
    query: string
  ): Promise<{ id: string; title: string; year: string }[]> {
    try {
      const response = await this.fetchWithAuth(
        `${this.baseUrl}/search/movie?query=${encodeURIComponent(
          query
        )}&include_adult=false&page=1`
      )

      if (!response.ok) {
        throw new Error(`Failed to search movies: ${response.statusText}`)
      }

      const data = await response.json()

      if (!data.results || !Array.isArray(data.results)) {
        return []
      }

      return data.results.map((movie: any) => ({
        id: `${movie.id}`,
        title: movie.title,
        year: movie.release_date ? movie.release_date.substring(0, 4) : '',
      }))
    } catch (error) {
      console.error('Error searching movies:', error)
      throw error
    }
  }

  async getMoviePoster(movieId: string): Promise<string> {
    try {
      const response = await this.fetchWithAuth(
        `${this.baseUrl}/movie/${movieId}/images`
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch movie poster: ${response.statusText}`)
      }

      const data = await response.json()

      if (!data.posters || data.posters.length === 0) {
        return ''
      }

      // Return the first poster
      return `${this.imageBaseUrl}${data.posters[0].file_path}`
    } catch (error) {
      console.error('Error fetching movie poster:', error)
      throw error
    }
  }
}
