import { Download, Play, FolderOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'

interface MovieDetail {
  year: string
  director: string
  genre: string
  duration: string
  rating: string
  filename: string
  size: string
  description: string
}

interface MovieDetailsProps {
  title: string
  details: MovieDetail
}

export const MovieDetails = ({ title, details }: MovieDetailsProps) => {
  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Movie Header */}
      <div className="p-6 border-b border-border">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground text-lg mb-4">{details.year}</p>
        <div className="flex gap-3">
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Rechercher sur TMDB
          </Button>
          <Button variant="outline">
            <Play className="w-4 h-4 mr-2" />
            Lire le film
          </Button>
          <Button variant="outline">
            <FolderOpen className="w-4 h-4 mr-2" />
            Ouvrir le dossier
          </Button>
        </div>
      </div>

      {/* Movie Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex gap-6">
          {/* Poster */}
          <div className="w-48 h-72 bg-muted rounded-lg flex items-center justify-center text-6xl flex-shrink-0">
            🎬
          </div>

          {/* Details */}
          <div className="flex-1 space-y-6">
            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Synopsis</h2>
              <p className="text-foreground leading-relaxed">
                {details.description}
              </p>
            </div>

            {/* Metadata Grid */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Informations</h2>
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <Label className="text-muted-foreground text-sm">
                      Réalisateur
                    </Label>
                    <p className="font-medium">{details.director}</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <Label className="text-muted-foreground text-sm">
                      Genre
                    </Label>
                    <p className="font-medium">{details.genre}</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <Label className="text-muted-foreground text-sm">
                      Durée
                    </Label>
                    <p className="font-medium">{details.duration}</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <Label className="text-muted-foreground text-sm">
                      Note IMDB
                    </Label>
                    <p className="font-medium">{details.rating}</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <Label className="text-muted-foreground text-sm">
                      Fichier
                    </Label>
                    <p className="font-medium text-sm">{details.filename}</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <Label className="text-muted-foreground text-sm">
                      Taille
                    </Label>
                    <p className="font-medium">{details.size}</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
