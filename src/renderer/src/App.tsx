import { useState, useEffect } from 'react'
import { TopBar } from '@/components/TopBar'
import { MovieList } from '@/components/MovieList'
import { MovieDetails } from '@/components/MovieDetails'
import { useIPC } from '@/hooks/useIPC'
import type { Movie, MovieFullMetadata } from '@domain/ports/dtos/Movie'

const App = () => {
  const { getConfiguration, getMovieMetadata, getMovieImage, loading, error } =
    useIPC()
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')
  const [movieDetails, setMovieDetails] = useState<
    Record<string, MovieFullMetadata & { posterUrl?: string }>
  >({})

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const config = await getConfiguration()
        if (config.movies && config.movies.length > 0) {
          setMovies(config.movies)
          // Select the first movie by default
          setSelectedMovie(config.movies[0].relativePath)
        }
      } catch (err) {
        console.error('Failed to load movies:', err)
      }
    }
    loadMovies()
  }, [getConfiguration])

  useEffect(() => {
    const loadMovieDetails = async () => {
      if (!selectedMovie) return

      try {
        const metadata = await getMovieMetadata(selectedMovie)
        if (metadata) {
          const posterUrl = await getMovieImage(selectedMovie)
          setMovieDetails((prev) => ({
            ...prev,
            [selectedMovie]: { ...metadata, posterUrl },
          }))
        }
      } catch (err) {
        console.error('Failed to load movie details:', err)
      }
    }
    loadMovieDetails()
  }, [selectedMovie, getMovieMetadata, getMovieImage])

  const currentMovie = movieDetails[selectedMovie]

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
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <MovieList
          movies={movies}
          selectedMovie={selectedMovie}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onMovieSelect={setSelectedMovie}
        />
        {currentMovie && (
          <MovieDetails
            title={currentMovie.title}
            details={{
              year: currentMovie.year || '',
              genre: currentMovie.genres.join(', '),
              duration: currentMovie.runtime
                ? `${currentMovie.runtime} minutes`
                : '',
              filename: selectedMovie.split('/').pop() || '',
              size: currentMovie.fileInfo?.streamDetails?.video
                ?.durationInSeconds
                ? `${Math.round(currentMovie.fileInfo.streamDetails.video.durationInSeconds / 60)} minutes`
                : '',
              description: currentMovie.plot || '',
              poster: currentMovie.posterUrl || currentMovie.thumb || '🎬',
            }}
          />
        )}
      </div>
    </div>
  )
}

export default App
