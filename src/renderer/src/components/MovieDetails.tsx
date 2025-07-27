import { FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { MovieWithMetadata } from '@domain/ports/dtos/Movie'

const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (hours === 0) {
    return `${remainingMinutes}min`
  }
  return `${hours}h ${remainingMinutes}min`
}

interface MovieDetailsProps {
  movie: MovieWithMetadata
  onOpenInExplorer?: (movie: MovieWithMetadata) => void
}

export const MovieDetails = ({
  movie,
  onOpenInExplorer,
}: MovieDetailsProps) => {
  const metadata = movie.metadata

  if (!metadata) {
    return null
  }

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-8">
          <div className="w-64 flex-shrink-0">
            <div className="aspect-[2/3] bg-muted rounded-lg flex items-center justify-center text-6xl">
              <img src={metadata.thumb}></img>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-3xl font-bold">{metadata.title}</h1>
              {onOpenInExplorer && (
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  className="h-8 w-8"
                  onClick={() => onOpenInExplorer(movie)}
                  aria-label="Ouvrir dans l'explorateur"
                >
                  <FolderOpen className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-sm text-muted-foreground">Année</div>
                <div>{metadata.year}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Genre</div>
                <div>{metadata.genres.join(', ')}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Durée</div>
                <div>
                  {metadata.runtime
                    ? formatRuntime(parseInt(metadata.runtime, 10))
                    : 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Fichier</div>
                <div className="truncate">
                  {movie.relativePath.split('/').pop()}
                </div>
              </div>
              {metadata.fileInfo?.streamDetails?.video && (
                <div>
                  <div className="text-sm text-muted-foreground">
                    Résolution
                  </div>
                  <div>
                    {metadata.fileInfo.streamDetails.video.width}x
                    {metadata.fileInfo.streamDetails.video.height}
                  </div>
                </div>
              )}
            </div>
            {metadata.plot && (
              <div>
                <div className="text-sm text-muted-foreground mb-2">
                  Description
                </div>
                <div className="text-sm leading-relaxed">{metadata.plot}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
