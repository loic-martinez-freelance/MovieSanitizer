import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

interface Movie {
  id: number
  title: string
  year: string
  genre: string
  hasMetadata: boolean
  poster: string
}

interface MovieListProps {
  movies: Movie[]
  selectedMovie: string
  searchQuery: string
  onSearchChange: (query: string) => void
  onMovieSelect: (title: string) => void
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
    <div className="w-80 bg-card border-r border-border flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Rechercher un film..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-background border-input"
          />
        </div>
      </div>

      {/* Movies List */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredMovies.map((movie) => (
          <Card
            key={movie.id}
            className={`mb-2 cursor-pointer transition-colors ${
              selectedMovie === movie.title
                ? 'bg-primary text-primary-foreground'
                : 'bg-card border-border hover:bg-accent hover:text-accent-foreground'
            }`}
            onClick={() => onMovieSelect(movie.title)}
          >
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-12 bg-muted rounded flex items-center justify-center text-lg">
                  {movie.poster}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{movie.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {movie.year} • {movie.genre}
                  </p>
                </div>
                <div className="flex items-center">
                  {movie.hasMetadata ? (
                    <div className="w-2 h-2 bg-primary rounded-full" />
                  ) : (
                    <div className="w-2 h-2 bg-destructive rounded-full" />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
