import { Movie } from '@domain/ports/dtos/Movie'
import { useState, useEffect } from 'react'
import { useIPC } from '../hooks/useIPC'
import { useTranslation } from '../hooks/useTranslation'
import { Input } from './ui/input'
import { Card, CardContent } from './ui/card'
import { Search } from 'lucide-react'
import { Button } from './ui/button'

type SearchResult = {
  id: string
  title: string
  year: string
  posterBuffer?: string
}

type MovieScraperProps = {
  movie: Movie
  onMovieUpdated?: () => void
}

const MovieScraper = ({ movie, onMovieUpdated }: MovieScraperProps) => {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState(movie.title)
  const [relatedMovies, setRelatedMovies] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const {
    error,
    getRelatedMoviesFromDB,
    getMoviePosterBuffer,
    cleanLocalMovie,
  } = useIPC()

  const handleSelectMovie = async (selectedMovieId: string) => {
    setLoading(true)
    try {
      await cleanLocalMovie(movie.relativePath, selectedMovieId)
      if (onMovieUpdated) {
        onMovieUpdated()
      }
    } catch (err) {
      console.error('Error cleaning movie:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const searchMovies = async () => {
      if (searchQuery.trim()) {
        try {
          const movies = await getRelatedMoviesFromDB(searchQuery)
          // Récupérer les buffers des posters pour chaque film
          const moviesWithPosters = await Promise.all(
            movies.map(async (movie) => {
              try {
                const posterBuffer = await getMoviePosterBuffer(movie.id)
                return { ...movie, posterBuffer }
              } catch (err) {
                console.error(
                  `Error getting poster for movie ${movie.id}:`,
                  err
                )
                return { ...movie, posterBuffer: undefined }
              }
            })
          )
          setRelatedMovies(moviesWithPosters as SearchResult[])
        } catch (err) {
          console.error('Error searching movies:', err)
          setRelatedMovies([])
        }
      } else {
        setRelatedMovies([])
      }
    }

    const debounceTimer = setTimeout(searchMovies, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery, getRelatedMoviesFromDB, getMoviePosterBuffer])

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          {t('movieScraper.title')}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t('movieScraper.description', { title: movie.title })}
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('movieScraper.searchPlaceholder')}
          className="pl-9 h-10"
        />
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8 text-muted-foreground">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mr-2"></div>
          {t('common.loading')}
        </div>
      )}
      {error && (
        <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md">
          <p className="font-medium">{t('common.error')}</p>
          <p className="text-sm">{error.message}</p>
        </div>
      )}

      {!loading && (
        <div className="flex gap-4 overflow-y-auto flex-col">
          {relatedMovies.map((relatedMovie) => (
            <Card
              key={relatedMovie.id}
              className="transition-colors hover:bg-accent/50"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    {relatedMovie.posterBuffer && (
                      <img
                        src={relatedMovie.posterBuffer}
                        alt={`Poster de ${relatedMovie.title}`}
                        className="w-16 h-24 object-cover rounded-md shadow-sm"
                        onError={(e) => {
                          // Cacher l'image si elle ne charge pas
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">
                        {relatedMovie.title}
                      </h3>
                      {relatedMovie.year && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {relatedMovie.year}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleSelectMovie(relatedMovie.id)}
                    disabled={loading}
                  >
                    {loading
                      ? t('movieScraper.updating')
                      : t('movieScraper.selectMovie')}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default MovieScraper
