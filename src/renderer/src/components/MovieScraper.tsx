import { Movie } from '@domain/ports/dtos/Movie'
import { useState, useEffect } from 'react'
import { useIPC } from '../hooks/useIPC'
import { Input } from './ui/input'
import { Card, CardContent } from './ui/card'
import { Search } from 'lucide-react'
import { Button } from './ui/button'

type SearchResult = {
  id: string
  title: string
  year: string
}

const MovieScraper = ({ movie }: { movie: Movie }) => {
  const [searchQuery, setSearchQuery] = useState(movie.title)
  const [relatedMovies, setRelatedMovies] = useState<SearchResult[]>([])
  const { loading, error, getRelatedMoviesFromDB } = useIPC()

  useEffect(() => {
    const searchMovies = async () => {
      if (searchQuery.trim()) {
        try {
          const movies = await getRelatedMoviesFromDB(searchQuery)
          setRelatedMovies(movies as SearchResult[])
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
  }, [searchQuery, getRelatedMoviesFromDB])

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Rechercher des métadonnées
        </h2>
        <p className="text-sm text-muted-foreground">
          Recherchez des informations sur "{movie.title}" pour mettre à jour ses
          métadonnées
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher un film..."
          className="pl-9 h-10"
        />
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8 text-muted-foreground">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mr-2"></div>
          Chargement...
        </div>
      )}
      {error && (
        <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md">
          <p className="font-medium">Erreur</p>
          <p className="text-sm">{error.message}</p>
        </div>
      )}

      <div className="flex gap-4 overflow-y-auto flex-col">
        {relatedMovies.map((relatedMovie) => (
          <Card
            key={relatedMovie.id}
            className="transition-colors hover:bg-accent/50"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
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
                <Button>Choisir ce film</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MovieScraper
