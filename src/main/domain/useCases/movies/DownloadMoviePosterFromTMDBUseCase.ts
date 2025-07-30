import { MovieDBAdapterPort } from '@domain/ports/MovieDBAdapterPort'
import { HttpPort } from '@domain/ports/HttpPort'

export class DownloadMoviePosterFromTMDBUseCase {
  constructor(
    private readonly movieDBAdapter: MovieDBAdapterPort,
    private readonly httpAdapter: HttpPort
  ) {}

  async execute(movieId: string): Promise<Buffer | undefined> {
    try {
      const posterUrl = await this.movieDBAdapter.getMoviePosterUrl(movieId)
      if (!posterUrl) {
        return undefined
      }

      const posterBuffer = await this.httpAdapter.downloadFile(posterUrl)
      return posterBuffer
    } catch (error) {
      console.error('Error downloading movie poster from TMDB:', error)
      return undefined
    }
  }
}
