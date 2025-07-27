import { useState, useEffect } from 'react'
import { TopBar } from '@/components/TopBar'
import { MovieList } from '@/components/MovieList'
import { MovieDetails } from '@/components/MovieDetails'
import { useIPC } from '@/hooks/useIPC'
import { MovieWithMetadata, type Movie } from '@domain/ports/dtos/Movie'
import MovieScraper from './components/MovieScraper'

const App = () => {
  const {
    getConfiguration,
    getMovieMetadata,
    getMovieImage,
    searchAndAddNewMovies,
    openMovieInExplorer,
    error,
  } = useIPC()
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie>()
  const [selectedMovieWithDetails, setSelectedMovieWithDetails] =
    useState<MovieWithMetadata>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    refreshMovies()
  }, [getConfiguration])

  useEffect(() => {
    const loadMovieDetails = async () => {
      if (!selectedMovie) return

      try {
        const metadata = await getMovieMetadata(selectedMovie.relativePath)
        const posterUrl = await getMovieImage(selectedMovie.relativePath)
        setSelectedMovieWithDetails({
          relativePath: selectedMovie.relativePath,
          title: selectedMovie.title,
          metadata: metadata ? { ...metadata, thumb: posterUrl } : undefined,
        })
      } catch (err) {
        console.error('Failed to load movie details:', err)
      }
    }
    loadMovieDetails()
  }, [selectedMovie, getMovieMetadata, getMovieImage])

  const refreshAndAddNewMovies = async () => {
    setLoading(true)
    try {
      await searchAndAddNewMovies()
      await refreshMovies()
    } finally {
      setLoading(false)
    }
  }

  const refreshMovies = async () => {
    const prevSelectedPath = selectedMovie?.relativePath
    try {
      const config = await getConfiguration()
      if (config.movies && config.movies.length > 0) {
        setMovies(config.movies)
        const found = prevSelectedPath
          ? config.movies.find(
              (m: Movie) => m.relativePath === prevSelectedPath
            )
          : undefined
        setSelectedMovie(found || config.movies[0])
      }
    } catch (err) {
      console.error('Failed to load movies:', err)
    }
  }

  const handleOpenInExplorer = async (movie: Movie | MovieWithMetadata) => {
    try {
      await openMovieInExplorer(movie.relativePath)
    } catch (err) {
      console.error('Failed to open movie in explorer:', err)
    }
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error.message}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground dark">
        <div className="text-xl animate-pulse">Actualisation des films...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground dark">
      <TopBar onRefresh={refreshAndAddNewMovies} />
      <div className="flex flex-1 overflow-hidden">
        <MovieList
          movies={movies}
          onMovieSelect={setSelectedMovie}
          selectedMovie={selectedMovie}
        />
        {selectedMovieWithDetails && selectedMovieWithDetails.metadata ? (
          <MovieDetails
            movie={selectedMovieWithDetails}
            onOpenInExplorer={handleOpenInExplorer}
          />
        ) : (
          selectedMovie && (
            <MovieScraper
              movie={selectedMovie}
              onMovieUpdated={refreshMovies}
            />
          )
        )}
      </div>
    </div>
  )
}

export default App
