import { useState, useEffect } from 'react'
import { TopBar } from '@/components/TopBar'
import { MovieList } from '@/components/MovieList'
import { MovieDetails } from '@/components/MovieDetails'
import { useIPC } from '@/hooks/useIPC'
import { MovieWithMetadata, type Movie } from '@domain/ports/dtos/Movie'
import MovieScraper from './components/MovieScraper'

const App = () => {
  const { getConfiguration, getMovieMetadata, getMovieImage, loading, error } =
    useIPC()
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie>()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedMovieWithDetails, setSelectedMovieWithDetails] =
    useState<MovieWithMetadata>()

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

  const refreshMovies = async () => {
    try {
      const config = await getConfiguration()
      if (config.movies && config.movies.length > 0) {
        setMovies(config.movies)
        setSelectedMovie(config.movies[0])
      }
    } catch (err) {
      console.error('Failed to load movies:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error.message}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground dark">
      <TopBar onRefresh={refreshMovies} />
      <div className="flex flex-1 overflow-hidden">
        <MovieList
          movies={movies}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onMovieSelect={setSelectedMovie}
          selectedMovie={selectedMovie}
        />
        {selectedMovieWithDetails && selectedMovieWithDetails.metadata ? (
          <MovieDetails movie={selectedMovieWithDetails} />
        ) : (
          selectedMovie && <MovieScraper movie={selectedMovie}></MovieScraper>
        )}
      </div>
    </div>
  )
}

export default App
