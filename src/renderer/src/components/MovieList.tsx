import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import type { Movie } from '@domain/ports/dtos/Movie'

interface MovieListProps {
  movies: Movie[]
  selectedMovie?: Movie
  searchQuery: string
  onSearchChange: (query: string) => void
  onMovieSelect: (movie: Movie) => void
}

export const MovieList = ({
  movies,
  selectedMovie,
  searchQuery,
  onSearchChange,
  onMovieSelect,
}: MovieListProps) => {
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-80 border-r border-border flex flex-col">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher un film..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredMovies.map((movie) => (
          <Card
            key={movie.relativePath}
            className={`m-2 cursor-pointer transition-colors ${
              selectedMovie?.relativePath === movie.relativePath
                ? 'bg-accent'
                : 'hover:bg-accent/50'
            }`}
            onClick={() => onMovieSelect(movie)}
          >
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{movie.title}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
