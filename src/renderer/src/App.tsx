import { useState } from 'react'
import { TopBar } from '@/components/TopBar'
import { MovieList } from '@/components/MovieList'
import { MovieDetails } from '@/components/MovieDetails'

const App = () => {
  const [selectedMovie, setSelectedMovie] = useState('Inception')
  const [searchQuery, setSearchQuery] = useState('')

  const movies = [
    {
      id: 1,
      title: 'Inception',
      year: '2010',
      genre: 'Sci-Fi',
      hasMetadata: true,
      poster: '🎬',
    },
    {
      id: 2,
      title: 'The Dark Knight',
      year: '2008',
      genre: 'Action',
      hasMetadata: true,
      poster: '🦇',
    },
    {
      id: 3,
      title: 'Interstellar',
      year: '2014',
      genre: 'Sci-Fi',
      hasMetadata: false,
      poster: '🌟',
    },
    {
      id: 4,
      title: 'Batman Begins',
      year: '2005',
      genre: 'Action',
      hasMetadata: true,
      poster: '🦇',
    },
    {
      id: 5,
      title: 'The Prestige',
      year: '2006',
      genre: 'Mystery',
      hasMetadata: false,
      poster: '🎪',
    },
  ]

  const movieDetails = {
    Inception: {
      year: '2010',
      director: 'Christopher Nolan',
      genre: 'Sci-Fi, Action, Thriller',
      duration: '148 minutes',
      rating: '8.8/10',
      filename: 'Inception.2010.1080p.mkv',
      size: '2.3 GB',
      description:
        "Dom Cobb est un voleur expérimenté dans l'art périlleux de l'extraction, voler les secrets les plus profonds du subconscient pendant que l'esprit est le plus vulnérable. Les capacités rares de Cobb en ont fait un joueur convoité dans le monde perfide de l'espionnage industriel.",
    },
    'The Dark Knight': {
      year: '2008',
      director: 'Christopher Nolan',
      genre: 'Action, Crime, Drama',
      duration: '152 minutes',
      rating: '9.0/10',
      filename: 'The.Dark.Knight.2008.1080p.mkv',
      size: '2.8 GB',
      description:
        "Batman affronte le Joker, un génie criminel qui veut plonger Gotham City dans l'anarchie. Avec l'aide du lieutenant Jim Gordon et du procureur Harvey Dent, Batman doit combattre l'une de ses plus grandes menaces.",
    },
  }

  const currentMovie = movieDetails[selectedMovie] || movieDetails['Inception']

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
        <MovieDetails title={selectedMovie} details={currentMovie} />
      </div>
    </div>
  )
}

export default App
